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
        text: `Already ${pages} pages?! Are you sure you’re not a seasoned writer? Your recipient is one lucky person!`,
      };
    if (pages >= 141)
      return {
        icon: icons140,
        text: `Final push — ${pages} pages done! Your book will be ready very soon <33`,
      };
    if (pages >= 81)
      return {
        icon: icons80,
        text: `${pages} pages behind you! More than halfway there. Grab a cup of tea and add a few more stories!`,
      };
    if (pages >= 41)
      return {
        icon: icons40,
        text: `Great pace — ${pages} pages! Let’s fill your book with more warm memories :)`,
      };
    return {
      icon: icons20,
      text: `${pages} completed pages — the journey has begun! Just imagine how happy your special someone will be to see these first stories :3`,
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
          Question {currentPage + 1}
        </label>
        <label className="question">{question.question}</label>


        
      </div>

      <div className="question-form-answer">
        <label className="question-answer-label">
          Display question in book
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
          Hide question in the book
        </div>
      </div>

      <div className="question-form-answer">
        <label className="question-answer-label">Your answer</label>
        <textarea
          ref={textareaRef}
          className="answer-area"
          defaultValue={answerSelector?.answer ?? ""}
          onChange={handleInputChange}
          placeholder="Enter your answer..."
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
            {isEditable ? "Save" : "Edit"}
          </button>
        </div>
      </div>

      <Preview questionKey={question.question} />
    </div>
  );
};

export default QuestionForm;
