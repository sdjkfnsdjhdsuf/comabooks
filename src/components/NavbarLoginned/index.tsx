import "./index.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "assets/comabooks-white.svg";
import { AnswerEntityDto, QuestionTemplateDto } from "generated";
import { useSelector } from "react-redux";

const NavbarLoginned = ({
  setCurrentPage,
  questions,
  pagesFilled,
  // answers,
  currentPage,
  onEditCover,
}: {
  setCurrentPage: (val: number) => void;
  questions: QuestionTemplateDto[];
  pagesFilled: number;
  // answers: AnswerEntityDto[];
  currentPage: number;
  onEditCover: () => void;
}) => {
  const [isCoverButtonClicked, setIsCoverButtonClicked] = useState(false);

  const ansersSelector = useSelector(
    (state: {
      answers: {
        value: Record<string, AnswerEntityDto> | null;
        template: QuestionTemplateDto[];
      };
    }) => state.answers
  );

  const getAnswerAsArray = (): AnswerEntityDto[] => {
    return ansersSelector.template.map(
      (val) =>
        ansersSelector.value![val._id] ?? {
          _id: "",
          questionId: val._id,
          answer: "",
          templateId: "",
          userId: "",
        }
    );
  };
  const answers = getAnswerAsArray()

  const handleEditCoverClick = () => {
    onEditCover(); 
    setIsCoverButtonClicked(true); 
  };

  const wrappedSetCurrentPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    setIsCoverButtonClicked(false);
  };

  return (
    <aside className="sidebar">
      <div className="forms-info-container">
        <div className="forms">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <div className="forms-info">
            <progress value={pagesFilled} max={200} />
            <div className="page-numbers">
              {pagesFilled}
              {pagesFilled <= 200
                ? "/200 страниц заполнено"
                : " страниц заполнено"}
            </div>
          </div>
        </div>
      </div>
      <ul className="questions-list">
        {questions.map((question, index) => {
          const isCurrent = index + 1 === currentPage;
          const isAnswered = answers[index].answer.replaceAll(" ", "");

          let bgColor = "transparent";
          if (isCurrent) {
            bgColor = "#845B99";
          }
          if (isAnswered && !isCurrent) {
            bgColor = "#45334E";
          }
          if (isAnswered && isCurrent) {
            bgColor = "#845B99";
          }

          return (
            <li key={index}>
              <button
                onClick={() => wrappedSetCurrentPage(index + 1)}
                style={{
                  backgroundColor: bgColor,
                  borderRadius: "4px",
                }}
              >
                {index + 1}. {question.question}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="sidebar-bottom-fixed">
        <button
            className={`sidebar-bottom-fixed-cover ${isCoverButtonClicked ? "clicked" : ""}`}
            onClick={handleEditCoverClick}
        >Изменить обложку
        </button>

        <button className="sidebar-bottom-fixed-finish">Завершить книгу</button>
      </div>
    </aside>
  );
};

export default NavbarLoginned;
