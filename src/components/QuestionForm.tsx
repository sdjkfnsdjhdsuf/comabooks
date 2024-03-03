import {
  useState,
  useEffect,
  useRef,
  SyntheticEvent,
  ChangeEvent,
  ChangeEventHandler,
} from "react";
import "./QuestionForm.css";
import { Preview } from "./Preview";
import viewicon from "assets/viewicon.png";

import { AnswerEntityDto, AnswerService, QuestionTemplateDto } from "generated";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
// import { AppDispatchType, answerSlice } from "routes/Forms";

const QuestionForm = ({
  question,
  pageNumber,
}: {
  question: QuestionTemplateDto;
  pageNumber: number;
}) => {
  // return <></>;
  const dispatch: AppDispatch = useDispatch();
  const answerSelector = useSelector<RootState, AnswerEntityDto | null>(
    (state) => {
      return state.activeAnswers.answers[question._id];
    }
  );

  // return <></>;
  // const answer: AnswerEntityDto = (ansersSelector.value ?? {})[
  //   question._id
  // ] ?? {
  //   _id: "",
  //   questionId: question._id,
  //   answer: "",
  //   templateId: "",
  //   userId: "",
  // };

  const [newAnswer, setAnswer] = useState(answerSelector?.answer ?? "");
  const [isEditable, setIsEditable] = useState(
    !(answerSelector?.answer ?? "").replaceAll(" ", "")
  );
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [newAnswer]);

  // const saveAnswerToDatabase = async (
  //   questionId: string,
  //   answerText: string
  // ) => {
  //   try {
  //     const response = await AnswerService.answersControllerEditAnswer(
  //       {
  //         id: questionId,
  //         body: {
  //           questionMessage: answerText,
  //         },
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     const newValue = { ...ansersSelector.value };
  //     newValue[response.questionId] = response;

  //   } catch (error) {
  //     console.error("Error saving answer", error);
  //   }
  // };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  // const handleToggleEdit = () => {
  //   if (isEditable) {
  //     if (newAnswer.trim().replaceAll(" ", "") != "") {
  //       setIsEditable(false);

  //       saveAnswerToDatabase(question._id, newAnswer);
  //     }
  //   } else {
  //     setIsEditable(true);
  //   }
  // };

  return (
    <div className="question-form">
      <label className="question-number-title">Вопрос {pageNumber}</label>
      <label className="question">{question.question}</label>
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
          onClick={() => {}}
        >
          {isEditable ? "Сохранить" : "Изменить"}
        </button>

        <button
          className="preview-button"
          onClick={() => {}}
          disabled={isEditable}
        >
          <img src={viewicon} alt="Viewicon" className="viewicon" />
        </button>
      </div>
      {showPreview && (
        <Preview
          isOpen={showPreview}
          question={question.question}
          answer={newAnswer}
          pageNumber={pageNumber}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
};

export default QuestionForm;
