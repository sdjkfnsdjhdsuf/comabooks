import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import logo from "assets/comabooks-white.svg";
import { AnswerEntityDto, QuestionTemplateDto } from "generated";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "store";
import { thunkSetPage } from "slicers/page_slicer";
<Link to="/">
  <img src={logo} alt="Logo" className="logo" />
</Link>;

const NavbarLoginnedMobile = ({
  questions,
  pagesFilled,

  currentPage,
  onEditCover,
}: {
  questions: QuestionTemplateDto[];
  pagesFilled: number;

  currentPage: number;
  onEditCover: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const ansersSelector = useSelector(
    (state: {
      answers: {
        value: Record<string, AnswerEntityDto> | null;
        template: QuestionTemplateDto[];
      };
    }) => state.answers
  );

  const [isCoverButtonClicked, setIsCoverButtonClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
  const answers = getAnswerAsArray();

  const handleEditCoverClick = () => {
    onEditCover();
    setIsCoverButtonClicked(true);
    setIsOpen(false); // Optionally close the mobile sidebar upon clicking
  };

  // Wrap setCurrentPage to reset cover button clicked state
  const wrappedSetCurrentPage = (pageIndex: number) => {
    dispatch(thunkSetPage(pageIndex));
    setIsCoverButtonClicked(false);
    setIsOpen(false);
  };

  return (
    <aside className={`sidebar-mobile ${isOpen ? "open" : ""}`}>
      <button className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      {isOpen && (
        <>
          <div className="forms-info-container-mobile">
            <div className="forms-mobile">
              <Link to="/">
                <img src={logo} alt="Logo" className="logo" />
              </Link>
              <div className="forms-info">
                <progress value={pagesFilled} max={200} />
                <div className="page-numbers">
                  {pagesFilled}/200 страниц заполнено
                </div>
              </div>
            </div>
          </div>
          <ul className="questions-list-mobile">
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

          <div className="sidebar-bottom-fixed-mobile">
            <button
              className={`sidebar-bottom-fixed-cover ${
                isCoverButtonClicked ? "clicked" : ""
              }`}
              onClick={handleEditCoverClick}
            >
              Изменить обложку
            </button>
          </div>
        </>
      )}
    </aside>
  );
};

export default NavbarLoginnedMobile;
