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
// import { TextChangeRange } from "typescript";

const QuestionForm = ({
  answer,
  question,
  pageNumber,
}: {
  answer: AnswerEntityDto;
  question: QuestionTemplateDto;
  pageNumber: number;
}) => {
  const [newAnswer, setAnswer] = useState(answer.answer);
  const [isEditable, setIsEditable] = useState(
    !answer.answer.replaceAll(" ", "")
  );
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<any>();

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.overflow = "hidden";
      textarea.style.height = `${Math.max(textarea.scrollHeight, 200)}px`;
      textarea.style.overflow = "";
    }
  }, [answer]);

  const saveAnswerToDatabase = async (
    questionId: string,
    answerText: string
  ) => {
    try {
      const response = await AnswerService.answersControllerEditAnswer(
        {
          id: questionId,
          body: {
            questionMessage: answerText,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error saving answer", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleToggleEdit = () => {
    if (isEditable) {
      if (newAnswer.trim().replaceAll(" ", "") != "") {
        setIsEditable(false);

        saveAnswerToDatabase(question._id, newAnswer);
      }
    } else {
      setIsEditable(true);
    }
  };

  return (
    <div className="question-form">
      <label className="question-number-title">Вопрос {pageNumber}</label>
      <label className="question">{question.question}</label>
      <textarea
        ref={textareaRef}
        className="answer-area"
        defaultValue={answer.answer}
        onChange={handleInputChange}
        placeholder="Напишите сюда ответ..."
        disabled={!isEditable}
      />
      <div className="edit-buttons">
        <button
          className={isEditable ? "confirm-button" : "edit-button"}
          onClick={handleToggleEdit}
        >
          {isEditable ? "Сохранить" : "Изменить"}
        </button>

        <button
          className="preview-button"
          onClick={handlePreview}
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
