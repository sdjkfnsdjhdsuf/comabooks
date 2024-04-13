import React, { useEffect, useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "assets/comabooks-white.svg";
import {
  AnswerEntityDto,
  PhotoEnityDto,
  TempalteResponceDto,
} from "generated";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { thunkSetPage } from "slicers/page_slicer";
import { fetchPhotos } from "slicers/photos_slicer";


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
  const calculatePagesFilled = () => {
    const charsPerPage = 250;
    const initialPages = 8; // Initial pages for chapters, etc.
    const pageCounts = Object.values(answerMap).reduce((total, val) => {
      const answerLength = val.answer.replaceAll(" ", "").length;
      return total + Math.ceil(answerLength / charsPerPage);
    }, 0);
    return initialPages + pageCounts;
  };
  const pageFilled = calculatePagesFilled();

  useEffect(() => {
    if (isViewingPhotos) {
        dispatch(fetchPhotos(templateId));
    }
}, [dispatch, isViewingPhotos, templateId]);

const photos = useSelector<RootState, PhotoEnityDto[]>(state => 
  Object.values(state.photos.photos)
);

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

  const addNewPhoto = () => {
    navigate(`/addphoto/${templateId}`)
  }

  const handlePhotoClick = (photoId: string) => {
    navigate(`/addphoto/${templateId}/${photoId}`);
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
                  {pageFilled} страниц заполнено
                </div>
              </div>
            </div>
          </div>
          {isViewingPhotos ? (
            <>
          <ul className="photo-list-mobile">
                        {photos.map((photo) => (
                            <li key={photo._id} onClick={() => handlePhotoClick(photo._id)}>
                                <div className="photo-list-one">{photo.description}</div>
                            </li>
                        ))}
                                      <div className="sidebar-bottom-add-photo-mobile">
                <button onClick={addNewPhoto}>+ Добавить фото </button>
              </div>
          </ul>
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
                  bgColor = "#A11C1D";
                }
                if (isAnswered && !isCurrent) {
                  bgColor = "#491D1E";
                }
                if (isAnswered && isCurrent) {
                  bgColor = "#A11C1D";
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
