import "./index.css";
import { Link } from "react-router-dom";
import logo from "assets/comabooks-white.svg";
import { AnswerEntityDto, QuestionTemplateDto } from "generated";

const NavbarLoginned = ({
  setCurrentPage,
  questions,
  pagesFilled,
  answers,
  currentPage,
  onEditCover,
}: {
  setCurrentPage: (val: number) => void;
  questions: QuestionTemplateDto[];
  pagesFilled: number;
  answers: AnswerEntityDto[];
  currentPage: number;
  onEditCover: () => void;
}) => {
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
                onClick={() => setCurrentPage(index + 1)}
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
        <button className="sidebar-bottom-fixed-cover" onClick={onEditCover}>
          Изменить обложку
        </button>

        <button className="sidebar-bottom-fixed-finish">Завершить книгу</button>
      </div>
    </aside>
  );
};

export default NavbarLoginned;
