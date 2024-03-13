import React, { useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "assets/comabooks-white.svg";
import {
  AnswerEntityDto,
  TempalteResponceDto,
} from "generated";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { thunkSetPage } from "slicers/page_slicer";

// Assuming mockPhotos is available globally or imported
const mockPhotos = [
  { id: "photo1", title: "Sunset at the beach", date: "2021-07-01" },
  { id: "photo2", title: "A day in the mountains", date: "2021-08-15" },
  { id: "photo3", title: "Family picnic", date: "2021-09-05" },
  { id: "photo4", title: "Sunset at the beach", date: "2021-07-01" },
  { id: "photo5", title: "A day in the mountains", date: "2021-08-15" },
  { id: "photo6", title: "Family picnic", date: "2021-09-05" },
  { id: "photo7", title: "Sunset at the beach", date: "2021-07-01" },
  { id: "photo8", title: "A day in the mountains", date: "2021-08-15" },
  { id: "photo9", title: "Family picnic", date: "2021-09-05" },
  { id: "photo10", title: "Sunset at the beach", date: "2021-07-01" },
  { id: "photo11", title: "A day in the mountains", date: "2021-08-15" },
  { id: "photo12", title: "Family picnic", date: "2021-09-05" },
  // add the rest of your photos here
];

const NavbarLoginnedMobile = ({ templateId }: { templateId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const templateDto = useSelector<RootState, TempalteResponceDto | undefined>(
    (state) => state.templates.templates.find((val) => val._id === templateId)
  );
  const answerMap = useSelector<RootState, Record<string, AnswerEntityDto>>(
    (state) => state.activeAnswers.answers
  );
  const currentPage = useSelector<RootState, number | null>(
    (state) => state.page.value
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isViewingPhotos, setIsViewingPhotos] = useState(false);
  const pageFilled = Object.values(answerMap).filter((val) =>
    val.answer.replaceAll(" ", "")
  ).length;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate(`/`);
  };

  const showCoverPage = () => {
    navigate(`/cover/${templateId}`);
  };

  const wrappedSetCurrentPage = (pageIndex: number) => {
    dispatch(thunkSetPage(pageIndex));
  };

  const handleTogglePhotos = () => {
    setIsViewingPhotos(!isViewingPhotos);
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
                  {pageFilled}/{templateDto.questions.length} вопросов отвечено
                </div>
              </div>
            </div>
          </div>
          {isViewingPhotos ? (
            <>
              {/* <ul className="photo-list-mobile">
                {mockPhotos.map((photo) => (
                  <li key={photo.id}>
                    <div className="photo-list-one-mobile">{photo.title}</div>
                  </li>
                ))}
              </ul> */}
              <div className="photo-list-one-mobile-test">Данная функция добавится в ближайшее время, пока пишите редактору, он поможет добавить воспоминания с фото!</div>
              <div className="sidebar-bottom-fixed-add-photo-mobile">
                <button>+ Добавить фото </button>
              </div>
            </>
          ) : (
            <ul className="questions-list-mobile">
              {templateDto.questions.map((templateQuestion, index) => {
                const isCurrent = index === currentPage;
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
          )}

          <div className="sidebar-bottom-fixed-mobile">
            <button
              className="sidebar-bottom-fixed-cover"
              onClick={handleTogglePhotos}
            >
              {isViewingPhotos ? "Перейти к вопросам" : "Перейти к фото"}
            </button>
            <button
              className="sidebar-bottom-fixed-cover"
              onClick={showCoverPage}
            >
              Изменить обложку
            </button>
            <button
              className={`sidebar-bottom-fixed-cover`}
              onClick={handleLogout}
            >
              Выйти из аккаунта
            </button>
          </div>
        </>
      )}
    </aside>
  );
};

export default NavbarLoginnedMobile;
