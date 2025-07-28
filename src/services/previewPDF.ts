import { jsPDF } from "jspdf";
import { heicTo, isHeic } from "heic-to";
import horizontal from "../assets/previewAssets/pdfhorizontal.png";
import vertical from "../assets/previewAssets/pdfvertical.png";
import square from "../assets/previewAssets/pdfsquare.png";
import { font } from "../assets/previewAssets/inter";
import { font2 } from "../assets/previewAssets/playfair.js";
import { font3 } from "../assets/previewAssets/playfairitalic.js";
import { font4 } from "../assets/previewAssets/interbold.js";

export interface PdfResult {
  doc: jsPDF;
  pagesMap: Record<string /* questionId */, number /* page */>;
}
export interface QuestionTemplate {
  id: string;
  name: string;
}

export interface Blank {
  photoUrl?: string;
  text?: string;
  questionToPrecede: string;
}

export interface Photo {
  imgData: any;
  photoUrl: string;
  date: string;
  description: string;
  questionToPrecede: string;
  hideDate: boolean;
  hideDescription: boolean;
  questionTxt: string;
  status: string;
}

export interface User {
  questionAnswerPairs: QuestionAnswerPair[];
  questionTemplates: QuestionTemplate[];
  bookName: string;
  authorName: string;
  partnerName: string;
  coverUrl: string;
  photos: Photo[];
  blanks: Blank[];
}

export interface QuestionAnswerPair {
  isRemoved: boolean;
  chapter: any;
  question: string;
  answer: string;
  clientQuestion: string;
  isQuestionHidden: boolean;
}

export type Status =
  | "top"
  | "center"
  | "bottom"
  | "horizontal"
  | "square"
  | "vertical";

const templatesWithChapter = [
  "65dda647dc778d94d0928969",
  "660e02b2ce933929f288c10c",
  "65ec32bffc68f8ec35c47182",
  "66163e630f78aa6b9f522b09",
  "660e255e4d408cc2c1155322",
  "66137cae18ab6072f1cea1df",
];

export const generatePDF = async (
  user: User,
  change: number = 11.34
): Promise<PdfResult> => {
  const pagesMap: Record<string, number> = {};
  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: [1068 + change * 2, 1603 + change * 2],
  });

  let predislovieChecker;
  if (
    user.questionTemplates[0].id === "65dda647dc778d94d0928969" ||
    user.questionTemplates[0].id === "660e255e4d408cc2c1155322"
  ) {
    predislovieChecker =
      "Приветствуем вас!\n\nЕсли вы читаете эти строки, значит, ваш близкий\nчеловек решился на неожиданный шаг, посвятив\nвам собственную книгу. Этот труд посвящен вам,\n" +
      user.partnerName.split(" ")[0] +
      ".\n\n" +
      user.authorName.split(" ")[0] +
      " вложил в эту книгу свое сердце, время\nи душу, тщательно отбирая каждое слово, чтобы\nпередать всю глубину своих чувств к вам.\n\nЭта книга - это больше чем просто набор слов.\nВ ней вы найдете эпизоды смеха, радости,\nиспытаний и побед, сплетенные воедино, как\nвечное напоминание о любви, которая не знает\nграниц. Приятного чтения!\n\nС любовью,\nComabooks Publishing House";
  } else if (
    user.questionTemplates[0].id === "660e02b2ce933929f288c10c" ||
    user.questionTemplates[0].id === "65ec32bffc68f8ec35c47182"
  ) {
    predislovieChecker =
      "Приветствуем вас!\n\nЕсли вы читаете эти строки, значит, ваш близкий\nчеловек решился на неожиданный шаг, посвятив\nвам собственную книгу. Этот труд посвящен вам,\n" +
      user.partnerName.split(" ")[0] +
      ".\n\n" +
      user.authorName.split(" ")[0] +
      " вложила в эту книгу свое сердце, время\nи душу, тщательно отбирая каждое слово, чтобы\nпередать всю глубину своих чувств к вам.\n\nЭта книга - это больше чем просто набор слов.\nВ ней вы найдете эпизоды смеха, радости,\nиспытаний и побед, сплетенные воедино, как\nвечное напоминание о любви, которая не знает\nграниц. Приятного чтения!\n\nС любовью,\nComabooks Publishing House";
  } else if (user.questionTemplates[0].id === "66163e630f78aa6b9f522b09") {
    predislovieChecker =
      "Сәлеметсіз бе!\n\nЕгер сіз бұл кітапті оқитын болсаңыз, онда сіздің\nжақын адамыңыз күтпеген қадамға барып, өз\nқолымен кітап жазып шықты деген сөз. " +
      user.partnerName.split(" ")[0] +
      ",\nбұл туынды толықтай сізге арналған.\n\n" +
      user.authorName.split(" ")[0] +
      " бұл кітапқа өзінің жүрегін, уақыты мен\nжан дүниесін салып, сізге деген сезімінің\nтереңдігін жеткізу үшін әрбір сөзді мұқият таңдаған.\n\nБұл кітап жай сөздер жиынтығы емес. Мұнда сіз\nараңыздағы шексіз махаббаты дәлелдегіш күлкі,\nқуаныш, қиындықтар мен жеңіс сәттерін\nтаба аласыз. Оқудан ләззат алыңыз!\n\nМахаббатпен,\nComabooks Publishing House";
  } else {
    predislovieChecker =
      "Приветствуем вас!\n\nЕсли вы читаете эти строки, значит, ваш близкий\nчеловек решился на неожиданный шаг, посвятив\nвам собственную книгу. Этот труд посвящен вам,\n" +
      user.partnerName.split(" ")[0] +
      ".\n\n" +
      user.authorName.split(" ")[0] +
      " вложил в эту книгу свое сердце, время\nи душу, тщательно отбирая каждое слово, чтобы\nпередать всю глубину своих чувств к вам.\n\nЭта книга - это больше чем просто набор слов.\nВ ней вы найдете эпизоды смеха, радости,\nиспытаний и побед, сплетенные воедино, как\nвечное напоминание о любви, которая не знает\nграниц. Приятного чтения!\n\nС любовью,\nComabooks Publishing House";
  }

  const photosToPdf = user.photos.filter((photo) => photo.questionToPrecede);
  user.photos = await preloadImages(photosToPdf, change);

  let pageNumber = 1;

  const Inter = font;
  doc.addFileToVFS("Inter.ttf", Inter);
  doc.addFont("Inter.ttf", "Inter", "normal");
  doc.setFont("Inter");
  const Playfair = font2;
  doc.addFileToVFS("Playfair.ttf", Playfair);
  doc.addFont("Playfair.ttf", "Playfair", "normal");
  doc.setFont("Playfair");
  const PlayfairItalic = font3;
  doc.addFileToVFS("PlayfairItalic.ttf", PlayfairItalic);
  doc.addFont("PlayfairItalic.ttf", "PlayfairItalic", "normal");
  const InterBold = font4;
  doc.addFileToVFS("InterBold.ttf", InterBold);
  doc.addFont("InterBold.ttf", "InterBold", "normal");

  // Add title page
  doc.setFontSize(38);
  doc.text(user.authorName, 534 + change, 170 + change, { align: "center" });
  doc.setFontSize(60);
  const paddingLeft = 90;
  const paddingRight = 90;
  const textWidth = 1068 - paddingLeft - paddingRight;
  doc.text(user.bookName, 534 + change, 801 + change, {
    align: "center",
    maxWidth: textWidth,
  });
  doc.setFontSize(38);
  doc.text("Comabooks Publishing House", 534 + change, 1390 + change, {
    align: "center",
  });
  doc.text("2025", 534 + change, 1450 + change, { align: "center" });
  doc.addPage();
  pageNumber++;

  if (templatesWithChapter.includes(user.questionTemplates[0].id)) {
    doc.addPage();
    pageNumber++;

    doc.setFont("Playfair");
    doc.setFontSize(38);
    if (user.questionTemplates[0].id === "66163e630f78aa6b9f522b09") {
      doc.text("Мазмұны", 534 + change, 170 + change, { align: "center" });
    } else if (user.questionTemplates[0].id === "66137cae18ab6072f1cea1df") {
      doc.text("Content", 534 + change, 170 + change, { align: "center" });
    } else {
      doc.text("Cодержание", 534 + change, 170 + change, { align: "center" });
    }
    doc.setFont("Playfair");
    doc.setFontSize(38);

    doc.addPage();
    pageNumber++;
  }

  doc.addPage();
  pageNumber++;

  // Add another title page
  doc.setFont("Playfair");
  doc.setFontSize(32);
  if (user.questionTemplates[0].id === "66163e630f78aa6b9f522b09") {
    doc.text("Алғы сөз", 534 + change, 731 + change, { align: "center" });
  } else if (user.questionTemplates[0].id === "66137cae18ab6072f1cea1df") {
    doc.text("Introduction", 534 + change, 731 + change, { align: "center" });
  } else {
    doc.text("Предисловие", 534 + change, 731 + change, { align: "center" });
  }

  doc.setFontSize(110);
  if (user.questionTemplates[0].id === "66163e630f78aa6b9f522b09") {
    doc.text("Баспадан", 534 + change, 831 + change, { align: "center" });
  } else if (user.questionTemplates[0].id === "66137cae18ab6072f1cea1df") {
    doc.text("Publisher", 534 + change, 831 + change, { align: "center" });
  } else {
    doc.text("От издательства", 534 + change, 831 + change, {
      align: "center",
    });
  }
  doc.addPage();
  pageNumber++;

  // Add the last blank page
  doc.addPage();
  pageNumber++;

  // Start adding content from here

  console.log(user.questionTemplates[0].id);
  if (predislovieChecker) {
    doc.setFont("Playfair");
    doc.setFontSize(38);
    doc.text(predislovieChecker, 150 + change, 412 + change, {
      maxWidth: 868,
    });

    addFooter(doc, pageNumber, user.authorName, user.bookName, change);
    doc.addPage();
    pageNumber++;
  }

  // Add another blank page
  doc.addPage();
  pageNumber++;

  let currentChapter = null;
  let currentChapterNumber = 1;

  const addChapterPage = (chapter: string | string[]) => {
    // doc.addPage();
    doc.setFont("Playfair");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(40);
    if (user.questionTemplates[0].id == "66163e630f78aa6b9f522b09") {
      doc.text(`${currentChapterNumber} Бөлім`, 534 + change, 741 + change, {
        align: "center",
      });
    } else if (user.questionTemplates[0].id == "66137cae18ab6072f1cea1df") {
      doc.text(`Chapter ${currentChapterNumber}`, 534 + change, 741 + change, {
        align: "center",
      });
    } else {
      doc.text(`Глава ${currentChapterNumber}`, 534 + change, 741 + change, {
        align: "center",
      });
    }
    doc.setFontSize(110);
    doc.text(chapter, 534 + change, 831 + change, { align: "center" });
    pageNumber++;
    currentChapterNumber++;
    doc.addPage();
    console.log(chapter);
  };

  const updateTOC = (chapter: string | string[]) => {
    if (templatesWithChapter.includes(user.questionTemplates[0].id)) {
      doc.setPage(3);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(38);
      doc.setFont("Playfair");
      if (chapter === "Мы") {
        doc.text(
          `Глава 1: ${chapter}......................................................................${pageNumber}`,
          150 + change,
          300 + change
        );
      } else if (chapter === "Она" || chapter === "Он") {
        doc.text(
          `Глава 2: ${chapter}..................................................................${pageNumber}`,
          150 + change,
          340 + change
        );
      } else if (chapter === "Біз") {
        doc.text(
          `1 Бөлім: ${chapter}....................................................................${pageNumber}`,
          150 + change,
          300 + change
        );
      } else if (chapter === "Ол") {
        doc.text(
          `2 Бөлім: ${chapter}..................................................................${pageNumber}`,
          150 + change,
          340 + change
        );
      } else if (chapter === "Егер де..") {
        doc.text(
          `3 Бөлім: ${chapter}......................................................${pageNumber}`,
          150 + change,
          380 + change
        );
      } else if (chapter === "We") {
        doc.text(
          `Chapter 1 ${chapter}..................................................................${pageNumber}`,
          150 + change,
          300 + change
        );
      } else if (chapter === "He" || chapter === "She") {
        doc.text(
          `Chapter 3: ${chapter}..................................................................${pageNumber}`,
          150 + change,
          340 + change
        );
      } else if (chapter === "What if..") {
        doc.text(
          `Chapter 3: ${chapter}..................................................................${pageNumber}`,
          150 + change,
          380 + change
        );
      } else {
        doc.text(
          `Глава 3: ${chapter}......................................................${pageNumber}`,
          150 + change,
          380 + change
        );
      }

      doc.setPage(pageNumber);
    }
  };

  for (
    let index = 0;
    index < user.questionAnswerPairs.filter((pair) => !pair.isRemoved).length;
    ++index
  ) {
    const pair = user.questionAnswerPairs.filter((pair) => !pair.isRemoved)[
      index
    ];

    if (index > 0) {
      doc.addPage();
      pageNumber++;
    }

    if (
      user.questionTemplates[0].id === "65dda647dc778d94d0928969" ||
      user.questionTemplates[0].id === "660e02b2ce933929f288c10c" ||
      user.questionTemplates[0].id === "66163e630f78aa6b9f522b09" ||
      user.questionTemplates[0].id === "660e255e4d408cc2c1155322" ||
      user.questionTemplates[0].id === "65ec32bffc68f8ec35c47182" ||
      user.questionTemplates[0].id === "66137cae18ab6072f1cea1df"
    ) {
      if (pair.chapter !== currentChapter) {
        updateTOC(pair.chapter);
        addChapterPage(pair.chapter);
        currentChapter = pair.chapter;
      }
    }

    pagesMap[pair.question] = pageNumber;

    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.setTextColor(0, 0, 0);
    doc.rect(140, 155, 1068 - 140 * 2, 1603 - 155 * 2, "F");
    addFooter(doc, pageNumber, user.authorName, user.bookName, change);

    doc.setFont("Playfair");
    doc.setFontSize(36);
    const questionX = 140 + 20 + change;
    let questionY = 195 + change;

    const answerX = questionX;
    let answerY = questionY + 100;

    if (pair.isQuestionHidden) {
      answerY = 195;
    } else {
      answerY = questionY + 100;
    }

    {
      !pair.isQuestionHidden &&
        doc.text(
          pair.clientQuestion != "" && pair.clientQuestion != "-"
            ? pair.clientQuestion
            : pair.question,
          questionX,
          questionY,
          {
            maxWidth: 1068 - 140 * 2 - 20,
          }
        );
    }

    const estimatedLines = Math.ceil(
      doc.getTextWidth(pair.question) / (1068 - 140 * 2 - 20)
    );
    answerY += estimatedLines * 24;

    doc.setFont("Playfair");
    doc.setFontSize(80);
    const lineHeight = 48 * 1.6;
    const pageHeight = 1603 - 205;
    const contentWidth = 1068 - 140 * 2 - 20;
    const bottomMargin = 100;

    const answerLines = doc.splitTextToSize(pair.answer, contentWidth);
    for (let i = 0; i < answerLines.length; i++) {
      let line = answerLines[i];
      if (Array.isArray(line)) {
        line = line.join(" ");
      }

      if (answerY + lineHeight > pageHeight - bottomMargin) {
        // Check if the remaining lines are 1 or 2 and can fit on the current page
        if (answerLines.length - i <= 2) {
          // Print all remaining lines on the current page
          for (; i < answerLines.length; i++) {
            line = answerLines[i];
            if (Array.isArray(line)) {
              line = line.join(" ");
            }
            if (hasEmoji(line)) {
              const canvas = drawTextOnCanvas(line, 200, "Playfair");
              if (canvas) {
                const imgData = canvas.toDataURL("image/png");
                doc.addImage(imgData, "PNG", answerX, answerY - 55, 724, 77);
              }
            } else {
              doc.setFont("Playfair");
              doc.setFontSize(80);
              doc.text(line, answerX, answerY);
            }
            answerY += lineHeight;
          }
          break;
        } else {
          doc.addPage();
          answerY = 155 + 40 + change;
          pageNumber++;
          addFooter(doc, pageNumber, user.authorName, user.bookName, change);
        }
      }

      if (hasEmoji(line)) {
        const canvas = drawTextOnCanvas(line, 200, "Playfair");
        if (canvas) {
          const imgData = canvas.toDataURL("image/png");
          doc.addImage(imgData, "PNG", answerX, answerY - 55, 724, 77);
        }
      } else {
        doc.setFont("Playfair");
        doc.setFontSize(80);
        doc.text(line, answerX, answerY);
      }
      answerY += lineHeight;
    }

    const photosToPlace = user.photos.filter(
      (photo) => photo.questionToPrecede === pair.question
    );

    for (const photo of photosToPlace) {
      const imgData = photo.imgData;
      doc.addPage();
      if (photo.status === "center") {
        if (photo.hideDescription && !photo.hideDate) {
          doc.addImage(
            imgData,
            "JPEG",
            0,
            0,
            1068 + change * 2,
            1603 + change * 2,
            undefined,
            "FAST"
          );
          doc.setFont("Playfair");
          doc.setFontSize(42);
          const formattedDate = formatDate(photo.date);
          doc.setTextColor(255, 255, 255);
          doc.text(formattedDate, 534 + change, 851 + change, {
            align: "center",
          });
          doc.setTextColor(0, 0, 0);
        } else if (!photo.hideDescription && photo.hideDate) {
          doc.addImage(
            imgData,
            "JPEG",
            0,
            0,
            1068 + change * 2,
            1603 + change * 2,
            undefined,
            "FAST"
          );
          const paddingLeft = 200;
          const paddingRight = 200;
          const textWidth = 1068 - paddingLeft - paddingRight;
          doc.setFont("PlayfairItalic");
          doc.setFontSize(42);
          doc.setTextColor(255, 255, 255);
          doc.text(photo.description, 534 + change, 851 + change, {
            align: "center",
            maxWidth: textWidth,
          });
          doc.setTextColor(0, 0, 0);
        } else if (photo.hideDescription && photo.hideDate) {
          doc.addImage(
            imgData,
            "JPEG",
            0,
            0,
            1068 + change * 2,
            1603 + change * 2,
            undefined,
            "FAST"
          );
        } else if (!photo.hideDescription && !photo.hideDate) {
          doc.addImage(
            imgData,
            "JPEG",
            0,
            0,
            1068 + change * 2,
            1603 + change * 2,
            undefined,
            "FAST"
          );
          doc.setFont("Playfair");
          doc.setFontSize(42);
          const formattedDate = formatDate(photo.date);
          doc.setTextColor(255, 255, 255);
          doc.text(formattedDate, 534 + change, 851 + change, {
            align: "center",
          });
          doc.setTextColor(0, 0, 0);
          const paddingLeft = 200;
          const paddingRight = 200;
          const textWidth = 1068 - paddingLeft - paddingRight;
          doc.setFont("PlayfairItalic");
          doc.setFontSize(42);
          doc.setTextColor(255, 255, 255);
          doc.text(photo.description, 534 + change, 931 + change, {
            align: "center",
            maxWidth: textWidth,
          });
          doc.setTextColor(0, 0, 0);
        }
      } else if (photo.status === "top") {
        if (photo.hideDescription && !photo.hideDate) {
          doc.addImage(
            imgData,
            "JPEG",
            0,
            0,
            1068 + change * 2,
            1603 + change * 2,
            undefined,
            "FAST"
          );
          doc.setFont("Playfair");
          doc.setFontSize(42);
          const formattedDate = formatDate(photo.date);
          doc.setTextColor(255, 255, 255);
          doc.text(formattedDate, 534 + change, 200 + change, {
            align: "center",
          });
          doc.setTextColor(0, 0, 0);
        } else if (!photo.hideDescription && photo.hideDate) {
          doc.addImage(
            imgData,
            "JPEG",
            0,
            0,
            1068 + change * 2,
            1603 + change * 2,
            undefined,
            "FAST"
          );
          const paddingLeft = 200;
          const paddingRight = 200;
          const textWidth = 1068 - paddingLeft - paddingRight;
          doc.setFont("PlayfairItalic");
          doc.setFontSize(42);
          doc.setTextColor(255, 255, 255);
          doc.text(photo.description, 534 + change, 200 + change, {
            align: "center",
            maxWidth: textWidth,
          });
          doc.setTextColor(0, 0, 0);
        } else if (photo.hideDescription && photo.hideDate) {
          doc.addImage(
            imgData,
            "JPEG",
            0,
            0,
            1068 + change * 2,
            1603 + change * 2,
            undefined,
            "FAST"
          );
        } else if (!photo.hideDescription && !photo.hideDate) {
          doc.addImage(
            imgData,
            "JPEG",
            0,
            0,
            1068 + change * 2,
            1603 + change * 2,
            undefined,
            "FAST"
          );
          doc.setFont("Playfair");
          doc.setFontSize(42);
          const formattedDate = formatDate(photo.date);
          doc.setTextColor(255, 255, 255);
          doc.text(formattedDate, 534 + change, 200 + change, {
            align: "center",
          });
          doc.setTextColor(0, 0, 0);
          const paddingLeft = 200;
          const paddingRight = 200;
          const textWidth = 1068 - paddingLeft - paddingRight;
          doc.setFont("PlayfairItalic");
          doc.setFontSize(42);
          doc.setTextColor(255, 255, 255);
          doc.text(photo.description, 534 + change, 280 + change, {
            align: "center",
            maxWidth: textWidth,
          });
          doc.setTextColor(0, 0, 0);
        }
      } else if (photo.status === "bottom") {
        if (photo.hideDescription && !photo.hideDate) {
          doc.addImage(
            imgData,
            "JPEG",
            0,
            0,
            1068 + change * 2,
            1603 + change * 2,
            undefined,
            "FAST"
          );
          doc.setFont("Playfair");
          doc.setFontSize(42);
          const formattedDate = formatDate(photo.date);
          doc.setTextColor(255, 255, 255);
          doc.text(formattedDate, 534 + change, 1100 + change, {
            align: "center",
          });
          doc.setTextColor(0, 0, 0);
        } else if (!photo.hideDescription && photo.hideDate) {
          doc.addImage(
            imgData,
            "JPEG",
            0,
            0,
            1068 + change * 2,
            1603 + change * 2,
            undefined,
            "FAST"
          );
          const paddingLeft = 200;
          const paddingRight = 200;
          const textWidth = 1068 - paddingLeft - paddingRight;
          doc.setFont("PlayfairItalic");
          doc.setFontSize(42);
          doc.setTextColor(255, 255, 255);
          doc.text(photo.description, 534 + change, 1100 + change, {
            align: "center",
            maxWidth: textWidth,
          });
          doc.setTextColor(0, 0, 0);
        } else if (photo.hideDescription && photo.hideDate) {
          doc.addImage(
            imgData,
            "JPEG",
            0,
            0,
            1068 + change * 2,
            1603 + change * 2,
            undefined,
            "FAST"
          );
        } else if (!photo.hideDescription && !photo.hideDate) {
          doc.addImage(
            imgData,
            "JPEG",
            0,
            0,
            1068 + change * 2,
            1603 + change * 2,
            undefined,
            "FAST"
          );
          doc.setFont("Playfair");
          doc.setFontSize(42);
          const formattedDate = formatDate(photo.date);
          doc.setTextColor(255, 255, 255);
          doc.text(formattedDate, 534 + change, 1100 + change, {
            align: "center",
          });
          doc.setTextColor(0, 0, 0);
          const paddingLeft = 200;
          const paddingRight = 200;
          const textWidth = 1068 - paddingLeft - paddingRight;
          doc.setFont("PlayfairItalic");
          doc.setFontSize(42);
          doc.setTextColor(255, 255, 255);
          doc.text(photo.description, 534 + change, 1180 + change, {
            align: "center",
            maxWidth: textWidth,
          });
          doc.setTextColor(0, 0, 0);
        }
      } else if (
        photo.status === "vertical" ||
        photo.status === "square" ||
        photo.status === "horizontal"
      ) {
        if (photo.hideDescription && !photo.hideDate) {
          doc.addImage(
            imgData,
            "JPEG",
            0,
            0,
            1068 + change * 2,
            1603 + change * 2,
            undefined,
            "FAST"
          );
          doc.setFont("Playfair");
          doc.setFontSize(42);
          const formattedDate = formatDate(photo.date);

          doc.text(formattedDate, 534 + change, 130 + change, {
            align: "center",
          });
          doc.setTextColor(0, 0, 0);
        } else if (!photo.hideDescription && photo.hideDate) {
          doc.addImage(
            imgData,
            "JPEG",
            0,
            0,
            1068 + change * 2,
            1603 + change * 2,
            undefined,
            "FAST"
          );
          const paddingLeft = 200;
          const paddingRight = 200;
          const textWidth = 1068 - paddingLeft - paddingRight;

          doc.setFontSize(42);

          doc.text(photo.description, 534 + change, 130 + change, {
            align: "center",
            maxWidth: textWidth,
          });
          doc.setTextColor(0, 0, 0);
        } else if (photo.hideDescription && photo.hideDate) {
          doc.addImage(
            imgData,
            "JPEG",
            0,
            0,
            1068 + change * 2,
            1603 + change * 2,
            undefined,
            "FAST"
          );
        } else if (!photo.hideDescription && !photo.hideDate) {
          doc.addImage(
            imgData,
            "JPEG",
            0,
            0,
            1068 + change * 2,
            1603 + change * 2,
            undefined,
            "FAST"
          );
          doc.setFont("Playfair");
          doc.setFontSize(42);
          const formattedDate = formatDate(photo.date);

          doc.text(formattedDate, 534 + change, 130 + change, {
            align: "center",
          });
          doc.setTextColor(0, 0, 0);
          const paddingLeft = 200;
          const paddingRight = 200;
          const textWidth = 1068 - paddingLeft - paddingRight;

          doc.setFontSize(42);

          doc.text(photo.description, 534 + change, 170 + change, {
            align: "center",
            maxWidth: textWidth,
          });
          doc.setTextColor(0, 0, 0);
        }
      }
      pageNumber++;
      if (
        photo.status === "vertical" ||
        photo.status === "square" ||
        photo.status === "horizontal"
      ) {
        doc.setTextColor(0, 0, 0);
      } else {
        doc.setTextColor(255, 255, 255);
      }
      addFooter(doc, pageNumber, user.authorName, user.bookName, change);
    }

    const blanksToPlace = user.blanks.filter(
      (blank) => blank.questionToPrecede === pair.question
    );
    for (const blank of blanksToPlace) {
      doc.addPage();
      if (blank.photoUrl) {
        const imgData = await getBlankImage(blank.photoUrl, change);
        doc.addImage(
          imgData,
          "JPEG",
          0,
          0,
          1068 + change * 2,
          1603 + change * 2,
          undefined,
          "FAST"
        );
      }
      pageNumber++;
    }
    addFooter(doc, pageNumber, user.authorName, user.bookName, change);
  }

  doc.addPage();
  doc.setFont("Playfair");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(100);
  if (user.questionTemplates[0].id === "66163e630f78aa6b9f522b09") {
    doc.text("Соңы", 534 + change, 801 + change, { align: "center" });
  } else {
    doc.text("Конец", 534 + change, 801 + change, {
      align: "center",
      maxWidth: 844,
    });
  }
  pageNumber++;

  doc.addPage();
  pageNumber++;

  return { doc, pagesMap };
};

function addFooter(
  doc: jsPDF,
  pageNumber: number,
  authorName: string,
  bookName: string,
  change: number
) {
  doc.setFont("Playfair");
  doc.setFontSize(36);
  const pageWidth = doc.internal.pageSize.width;
  const leftMargin = 160 + change;
  const rightMargin = 160 + change;
  const bottomY = 1450 + change;

  const isEvenPage = pageNumber % 2 === 0;
  const authorOrBookName = isEvenPage ? authorName : bookName;
  let footerSize;
  if (authorName.length > 25) {
    footerSize = isEvenPage ? 36 : 30;
  } else {
    footerSize = isEvenPage ? 36 : 36;
  }

  const authorOrBookNameWidth = doc.getTextWidth(authorOrBookName);
  const pageNumberWidth = doc.getTextWidth(`${pageNumber}`);

  const authorOrBookNameX = isEvenPage
    ? pageWidth - rightMargin - authorOrBookNameWidth
    : leftMargin;
  const pageNumberX = isEvenPage
    ? leftMargin
    : pageWidth - rightMargin - pageNumberWidth;

  doc.setFontSize(footerSize);
  doc.text(authorOrBookName, authorOrBookNameX, bottomY);
  doc.setFontSize(36);
  doc.text(`${pageNumber}`, pageNumberX, bottomY);
}

function hasEmoji(str: string) {
  const emojiRegex =
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  return emojiRegex.test(str);
}

function drawTextOnCanvas(
  text: string,
  fontSize: number,
  fontFamily: string
): HTMLCanvasElement | undefined {
  const canvas = document.createElement("canvas");
  canvas.width = 2392;
  canvas.height = 231;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillText(text, 0, 170);
    return canvas;
  }
  return undefined;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString;
  }
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function formatDate2(dateString: string | number | Date) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  const mins = date.getMinutes().toString().padStart(2, "0");
  return `${day}.${month}.${year} ${hour}:${mins}`;
}

const preloadImages = async (photos: any[], change: number) => {
  const imagePromises = photos.map(async (photo) => {
    const imgData = await getImageBase64(photo.photoUrl, photo.status, change);
    return {
      ...photo,
      imgData,
    };
  });
  const photosWithImages = await Promise.all(imagePromises);

  return photosWithImages;
};

  async function getImageBase64(
    url: string,
    status: Status,
    change: number
  ): Promise<string> {
    const response = await fetch(url, {
      headers: { "Cache-Control": "no-cache" },
    });
    const blob = await response.blob();

    const compose = (src: string) =>
      ["vertical", "square", "horizontal"].includes(status)
        ? prepareAssetImage(src, status as any, change)
        : prepareFullScreenImage(src, change);

    const heicFile = new File([blob], "upload.heic", {
      type: blob.type || "image/heic",
      lastModified: Date.now(),
    });

    if (await isHeic(heicFile)) {
      try {
        const converted = await heicTo({
          blob,
          type: "image/jpeg",
          quality: 0.9,
        });

        return compose(URL.createObjectURL(converted));
      } catch (error: any) {
        if (error?.message?.includes("unsupported")) {
          return compose(URL.createObjectURL(blob));
        }
        const r = await fetch(
          "https://us-central1-analytics-f26ac.cloudfunctions.net/convertHeic",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl: url }),
          }
        );
        if (!r.ok) throw new Error("Server‑side HEIC conversion failed");

        const data = await r.json();
        if (!data?.base64) throw new Error("No base64 returned from server");

        return compose("data:image/jpeg;base64," + data.base64);
      }
    }

    return compose(URL.createObjectURL(blob));
  }

async function getBlankImage(url: string, change: number): Promise<string> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx === null) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      // Set fixed dimensions:
      const targetWidth = 1068 + change * 2;
      const targetHeight = 1603 + change * 2;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Calculate scaling factors to maintain aspect ratio:
      const scaleX = targetWidth / img.width;
      const scaleY = targetHeight / img.height;
      const scale = Math.min(scaleX, scaleY); // Use the smaller scale factor to ensure the entire image fits

      // Calculate centered positions:
      const x = (targetWidth - img.width * scale) / 2;
      const y = (targetHeight - img.height * scale) / 2;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      resolve(canvas.toDataURL());
    };
    img.onerror = () => reject(new Error("Image loading error"));
    img.src = URL.createObjectURL(blob);
  });
}

async function prepareAssetImage(
  clientUrl: string,
  status: "horizontal" | "square" | "vertical",
  change = 0
): Promise<string> {
  /* full-page PNG is 1090.68 × 1625.68 → keep old page size */
  const PAGE_W = 1068 + change * 2;
  const PAGE_H = 1603 + change * 2;

  /* 70 % of that page = the transparent window width = 762 px  */
  const FRAME_W = 762; // ← fixed

  /*     H = W × ratio  (values taken from the table above)     */
  const RATIOS = {
    horizontal: 0.5263, // 401 ÷ 762
    square: 0.8896, // 678 ÷ 762
    vertical: 1.4627, // 1114 ÷ 762
  } as const;
  const FRAME_H = FRAME_W * RATIOS[status];

  const FRAME_X = (PAGE_W - FRAME_W) / 2;
  const FRAME_Y = (PAGE_H - FRAME_H) / 2;

  /* ------- load images ------------------------------------------- */
  const ASSETS: Record<typeof status, string> = {
    horizontal,
    square,
    vertical,
  };
  const [photo, frame] = await Promise.all([
    urlToImage(clientUrl),
    urlToImage(ASSETS[status]),
  ]);

  /* ------- canvas ------------------------------------------------ */
  const cvs = document.createElement("canvas");
  cvs.width = PAGE_W;
  cvs.height = PAGE_H;
  const ctx = cvs.getContext("2d")!;

  /* cover-fit, rounded up so it never falls short                   */
  const s = Math.max(FRAME_W / photo.width, FRAME_H / photo.height);
  const w = Math.ceil(photo.width * s);
  const h = Math.ceil(photo.height * s);
  const x = Math.round(FRAME_X - (w - FRAME_W) / 2);
  const y = Math.round(FRAME_Y - (h - FRAME_H) / 2);

  ctx.drawImage(photo, x, y, w, h); // client image
  ctx.drawImage(frame, 0, 0, PAGE_W, PAGE_H); // full-page PNG

  return cvs.toDataURL("image/jpeg", 0.8);
}

/* helper unchanged -------------------------------------------------- */
function urlToImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = () => rej(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

function prepareFullScreenImage(url: string, change: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const targetWidth = 1024 + change * 2;
      const targetHeight = 1603 + change * 2;
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const x = canvas.width / 2 - (img.width / 2) * scale;
      const y = canvas.height / 2 - (img.height / 2) * scale;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      resolve(canvas.toDataURL("image/jpeg", 0.6));
    };
    img.onerror = () => reject(new Error(`Image error: ${url}`));
    img.src = url;
  });
}

export const getChapter = (index: number, templateId: string) => {
  switch (templateId) {
    case "65dda647dc778d94d0928969": // RU ♀
      return index <= 83 ? "Мы" : index <= 129 ? "Она" : "Что если..";

    case "660e02b2ce933929f288c10c": // RU ♂
    case "65ec32bffc68f8ec35c47182": // RU ♂ (ещё одна)
    case "660e255e4d408cc2c1155322": // RU ♂ (ещё одна)
      return index <= 82 ? "Мы" : index <= 128 ? "Он" : "Что если..";

    case "66163e630f78aa6b9f522b09": // KZ
      return index <= 89 ? "Біз" : index <= 137 ? "Ол" : "Егер де..";

    case "66137cae18ab6072f1cea1df": // EN
      return index <= 82 ? "We" : index <= 128 ? "He" : "What if..";

    default:
      return "";
  }
};
