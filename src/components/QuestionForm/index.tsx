import { useState, useEffect, useRef, ChangeEvent } from "react";
import "./index.css";
import { Preview } from "../Preview";

import {
  AnswerEntityDto,
  AnswerService,
  PhotoEnityDto,
  QuestionTemplateDto,
} from "generated";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { setAnswers } from "slicers/answers_slice";

import icons20 from "../../assets/gamefyicons/icon20.png";
import icons40 from "../../assets/gamefyicons/icon40.png";
import icons80 from "../../assets/gamefyicons/icon80.png";
import icons140 from "../../assets/gamefyicons/icon140.png";
import icons200 from "../../assets/gamefyicons/icon200.png";

const QuestionForm = ({
  question,
  templateId,
}: {
  question: QuestionTemplateDto;
  templateId: string;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const currentPage = useSelector<RootState, number>(
    (state) => state.page.value ?? 0
  );
  const answerSelector = useSelector<RootState, AnswerEntityDto | null>(
    (state) => {
      return state.activeAnswers.answers[question._id];
    }
  );

  const answerMap = useSelector<RootState, Record<string, AnswerEntityDto>>(
    (state) => state.activeAnswers.answers
  );

  const photos = useSelector<RootState, PhotoEnityDto[]>((state) =>
    Object.values(state.photos.photos)
  );

  const [newAnswer, setAnswer] = useState(answerSelector?.answer ?? "");
  const [newClientQuestion, setClientQuestion] = useState(
    answerSelector?.clientQuestion ?? ""
  );
  const [isEditable, setIsEditable] = useState(
    !(answerSelector?.answer ?? "").replaceAll(" ", "")
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const clientTextareaRef = useRef<HTMLTextAreaElement>(null);

  const [clientQuestionDisabled, setClientQuestionDisabled] = useState(
    newClientQuestion === "-" ? true : false
  );

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [newAnswer]);

  useEffect(() => {
    if (clientTextareaRef.current) {
      const textarea = clientTextareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [newClientQuestion]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleClientQuestionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setClientQuestion(e.target.value);
  };

  const handleClientQuestionCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = e.target.checked;
    setClientQuestionDisabled(isChecked);
    if (isChecked) {
      setClientQuestion("-");
    }
    if (!isChecked) {
      setClientQuestion(question.question);
    }
  };

  const calculatePagesFilled = () => {
    const charsPerPage = 250;
    const initialPages = 8;
    const pageCounts = Object.values(answerMap).reduce((total, val) => {
      const answerLength = val.answer.replaceAll(" ", "").length;
      return total + Math.ceil(answerLength / charsPerPage);
    }, 0);
    const photoPages = photos.length;
    return initialPages + pageCounts + photoPages;
  };
  const pageFilled = calculatePagesFilled();

  const getMotivation = (pages: number) => {
    if (pages >= 200)
      return {
        icon: icons200,
        text: `Уже ${pages} страниц?! Ты точно не бывалый писатель? Твоему получателю можно лишь позавидовать..`,
      };
    if (pages >= 141)
      return {
        icon: icons140,
        text: `Финальный рывок - ${pages} страниц на месте! Совсем скоро книга будет готова <33`,
      };
    if (pages >= 81)
      return {
        icon: icons80,
        text: `${pages} страниц позади! Больше половины пути. Налей чай и добавь ещё пару историй!`,
      };
    if (pages >= 41)
      return {
        icon: icons40,
        text: `Отличный темп - ${pages} страниц! Давай дополним книгу новыми тёплыми воспоминаниями :)`,
      };
    return {
      icon: icons20,
      text: `${pages} заполненных страниц - начало положено! Представь, как обрадуется твой человек, увидев первые истории :3`,
    };
  };

  const { icon, text } = getMotivation(pageFilled);

  return (
    <div className="question-form">
      {/* <div className="alarm-label">Печать не будет работать 19-25 числа включительно. Если хотите получить книгу до конца этой недели, вам нужно завершить ее сегодня до 21.00 по казахстанскому времени.

        <button onClick={handleSupport}>Уведомить о заказе</button>
      </div> */}
      <div className="question-form-motivation">
        <img src={icon} alt="" className="motivation-icon" />
        {text}
        
      </div>

      <div className="question-form-question">
        <label className="question-number-title">
          Вопрос {currentPage + 1}
        </label>
        <label className="question">{question.question}</label>
      </div>

      <div className="question-form-answer">
        <label className="question-answer-label">
          Отображение вопроса в книге
        </label>
        <textarea
          ref={clientTextareaRef}
          className="client-question-area"
          value={newClientQuestion || question.question}
          onChange={handleClientQuestionChange}
          placeholder="Напишите сюда вопрос..."
          disabled={!isEditable || clientQuestionDisabled}
          maxLength={150}
        />

        <div className="client-question-checkbox">
          <input
            type="checkbox"
            checked={clientQuestionDisabled}
            onChange={handleClientQuestionCheckboxChange}
            disabled={!isEditable}
          />
          Не показывать вопрос в книге
        </div>
      </div>

      <div className="question-form-answer">
        <label className="question-answer-label">Ответ</label>
        <textarea
          ref={textareaRef}
          className="answer-area"
          defaultValue={answerSelector?.answer ?? ""}
          onChange={handleInputChange}
          placeholder="Напишите сюда ответ..."
          disabled={!isEditable}
        />
        <div className="edit-buttons">
          <button
            className={isEditable ? "confirm-button" : "edit-button"}
            onClick={async () => {
              if (isEditable) {
                setIsEditable(false);
                await dispatch(
                  setAnswers({
                    text: textareaRef.current?.value ?? "",
                    questionId: question._id,
                    clientQuestion: newClientQuestion ?? "",
                  })
                );
              } else {
                setIsEditable(true);
              }
            }}
          >
            {isEditable ? "Сохранить" : "Изменить"}
          </button>
        </div>
      </div>

      <Preview questionKey={question.question} />
    </div>
  );
};

export default QuestionForm;
