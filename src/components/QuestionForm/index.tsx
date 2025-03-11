import {
  useState,
  useEffect,
  useRef,
  SyntheticEvent,
  ChangeEvent,
  ChangeEventHandler,
} from "react";
import "./index.css";
import { Preview } from "../Preview";
import viewicon from "assets/viewicon.png";

import { AnswerEntityDto, AnswerService, QuestionTemplateDto } from "generated";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { switchPreview } from "slicers/preview_slicer";
import { setAnswers } from "slicers/answers_slice";
import { setEditing } from "slicers/editing_slicer";
// import { AppDispatchType, answerSlice } from "routes/Forms";

const QuestionForm = ({ question, templateId }: { question: QuestionTemplateDto; templateId: string }) => {
  const dispatch: AppDispatch = useDispatch();
  const previewShow = useSelector<RootState, boolean>(
    (state) => state.preview.value
  );
  const currentPage = useSelector<RootState, number>(
    (state) => state.page.value ?? 0
  );
  const answerSelector = useSelector<RootState, AnswerEntityDto | null>(
    (state) => {
      return state.activeAnswers.answers[question._id];
    }
  );

  const isLoading = useSelector<RootState, boolean>(
    (state) => state.activeAnswers.loading
  );
  const [newAnswer, setAnswer] = useState(answerSelector?.answer ?? "");
  const [isEditable, setIsEditable] = useState(
    !(answerSelector?.answer ?? "").replaceAll(" ", "")
  );
  const [saveAlert, setsaveAlert] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [newAnswer]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleSupport = () => {
    const message = `Здравствуйте! Уведомляю о своем заказе, не потеряйте его!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/77751716068?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
};

  return (
    <div className="question-form">
      {/* <div className="alarm-label">Для того чтобы получить книгу к 14 февраля, необходимо завершить заполнение до 27 января.

        <button onClick={handleSupport}>Уведомить о заказе</button>
      </div> */}
      <div className="question-form-question">
        <label className="question-number-title">Вопрос {currentPage + 1}</label>
        <label className="question">{question.question}</label>
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

      <Preview question={question.question} answer={newAnswer ? newAnswer : 'Ваш ответ будет здесь'} templateId={templateId} />

    </div>
  );
};

export default QuestionForm;
