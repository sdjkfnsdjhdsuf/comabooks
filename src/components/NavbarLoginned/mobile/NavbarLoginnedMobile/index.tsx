import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import logo from "assets/comabooks-white.svg";
import {
  AnswerEntityDto,
  QuestionTemplateDto,
  TempalteResponceDto,
} from "generated";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { thunkSetPage } from "slicers/page_slicer";
<Link to="/">
  <img src={logo} alt="Logo" className="logo" />
</Link>;

const NavbarLoginnedMobile = ({ templateId }: { templateId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const templateDto = useSelector<RootState, TempalteResponceDto | undefined>(
    (state) => state.templates.templates.find((val) => val._id == templateId)
  );
  const answerMap = useSelector<RootState, Record<string, AnswerEntityDto>>(
    (state) => state.activeAnswers.answers
  );
  const currentPage = useSelector<RootState, number>(
    (state) => state.page.value
  );
  const [isOpen, setIsOpen] = useState(false);
  const pageFilled = Object.values(answerMap).filter((val) =>
    val.answer.replaceAll(" ", "")
  ).length;

  const handleEditCoverClick = () => {};
  const wrappedSetCurrentPage = (pageIndex: number) => {
    dispatch(thunkSetPage(pageIndex));
  };
  if (templateDto == null) return <></>;

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
                <progress
                  value={pageFilled}
                  max={templateDto.questions.length}
                />
                <div className="page-numbers">
                  {pageFilled}/{templateDto.questions.length} страниц заполнено
                </div>
              </div>
            </div>
          </div>
          <ul className="questions-list-mobile">
            {templateDto.questions.map((templateQuestion, index) => {
              const isCurrent = index == currentPage;
              const isAnswered =
                answerMap[templateQuestion._id]?.answer?.replaceAll(" ", "") ??
                "";

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
                    onClick={() => wrappedSetCurrentPage(index)}
                    style={{
                      backgroundColor: bgColor,
                      borderRadius: "4px",
                    }}
                  >
                    {index + 1}. {templateQuestion.question}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="sidebar-bottom-fixed-mobile">
            <button
              className={`sidebar-bottom-fixed-cover`}
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
