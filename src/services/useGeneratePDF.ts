// hooks/useGeneratePdf.ts
import { AppDispatch, RootState } from "../store";
import { generatePDF, User, Status } from "../services/previewPDF";
import { AnswerEntityDto } from "generated";
import { getChapter } from "../services/previewPDF";
import { fetchCover } from "slicers/cover_slicer";
import { fetchPhotos } from "slicers/photos_slicer";

const selectAnswers = (s: RootState) => Object.values(s.activeAnswers.answers);
const selectCover = (s: RootState) => s.cover.value;
const selectPhotos = (s: RootState) => Object.values(s.photos.photos);
const selectTemplates = (s: RootState) => s.templates.templates;

/* THUNK */
export const generatePdfForCurrentUser =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();

    /* шаблон */
    const templates = selectTemplates(state);
    if (!templates.length) {
      console.error("Templates not loaded");
      return;
    }
    const tpl = templates[0];

    /* ответы → словарь id → dto --------------------------------------- */
    const answersById: Record<string, AnswerEntityDto> = {};
    selectAnswers(state).forEach((a) => {
      answersById[a.questionId] = a;
    });

    /* строим questionAnswerPairs строго по порядку tpl.questions ------- */

    const questionAnswerPairs = tpl.questions.map((q, idx) => {
      const ans = answersById[q._id]; // undefined, если ответа нет

      const answerText = ans?.answer ?? ""; // пустая строка ‑ если нет ответа
      const clientQ = ans?.clientQuestion ?? "";

      return {
        isRemoved: !answerText, // скрыть пустые
        chapter: getChapter(idx, tpl._id),
        question: q.question, // сам текст вопроса
        answer: answerText,
        clientQuestion: clientQ,
        number: String(idx + 1),
        isQuestionHidden: false, // пока без скрытия
      };
    });

    /* обложка */
    let cover = state.cover.value;
    if (!cover || cover.templateId !== tpl._id) {
      // <- свойство зависит от DTO
      const r = await dispatch(fetchCover(tpl._id)); // ждём загрузку
      if (fetchCover.fulfilled.match(r)) cover = r.payload;
      else return console.error("Cover fetch failed");
    }

    /* фото */
    let rawPhotos = selectPhotos(state);

    if (!rawPhotos.length) {
      const r = await dispatch(fetchPhotos(tpl._id)); // <- грузим с сервера
      if (fetchPhotos.fulfilled.match(r)) {
        rawPhotos = r.payload; // payload — массив DTO фото
      } else {
        console.warn("Photos fetch failed");
        rawPhotos = []; // оставляем пустым, но не падаем
      }
    }

    const photos = rawPhotos.map((p) => ({
      imgData: undefined as any,
      photoUrl: p.photoUrl,
      date:
        typeof p.date === "string" ? p.date : new Date(p.date).toISOString(),
      description: p.description,
      questionToPrecede: p.questionTxt,
      hideDate: p.hideDate,
      hideDescription: p.hideDescription,
      questionTxt: p.questionTxt,
      status: p.status as Status,
    }));

    /* User */
    const user: User = {
      questionAnswerPairs,
      questionTemplates: [{ id: tpl._id, name: tpl.name }],
      bookName: cover ? cover.bookName : "Название книги",
      authorName: cover ? cover.fullName : "Инициалы автора",
      partnerName: cover ? cover.fullNamePartner : "",
      coverUrl: cover ? cover.coverUrl : "",
      photos,
      blanks: [],
    };

    try {
      const { doc, pagesMap } = await generatePDF(user);
      const blob = doc.output("blob");
      return { blob, pagesMap };
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
  };
