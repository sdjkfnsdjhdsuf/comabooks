import React, { useEffect, useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "assets/comabooks-white.svg";
import hamburger from "assets/hamburger-icon.png";
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
  const [showPopup, setShowPopup] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [originalDeliveryDate, setOriginalDeliveryDate] = useState<string | null>(null);
  const [originalAddress, setOriginalAddress] = useState<string | null>(null);

  const calculatePagesFilled = () => {
    const charsPerPage = 250;
    const initialPages = 8;
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
    navigate(`/addphoto/${templateId}`);
  };

  const handlePhotoClick = (photoId: string) => {
    navigate(`/addphoto/${templateId}/${photoId}`);
  };

  const handleFinishBookClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('https://api.comabooks.org/user_anal', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();

      const { address, deliveryTime } = data;

      const isDefaultDate = new Date(deliveryTime).getTime() === new Date('1970-01-01T00:00:00.000Z').getTime();

      setOriginalAddress(address);
      setOriginalDeliveryDate(deliveryTime);
      setAddress(address);
      setDeliveryDate(isDefaultDate ? null : deliveryTime);

      setShowPopup(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFinishBook = async ({ token, address, deliveryTime }: { token: string, address: string, deliveryTime: string }) => {
    try {
      const updatedData = {
        address: address || originalAddress,
        deliveryTime: deliveryTime,
        status: 'done',
      };

      if (address !== originalAddress) {
        updatedData.address = address;
      }

      if (deliveryDate && deliveryDate !== originalDeliveryDate) {
        updatedData.deliveryTime = deliveryDate;
      }

      await fetch('https://api.comabooks.org/user_anal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      setShowPopup(false);
      navigate('/onhold')
      // Additional logic if needed after finishing the book
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (templateDto == null) return <></>;

  return (
    <aside className={`sidebar-mobile ${isOpen ? "open" : ""}`}>
      <button className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>
        <img src={hamburger} style={{ width: '20px', height: '20px', objectFit: 'cover' }} />
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
                  bgColor = "#4F545B";
                }
                if (isAnswered && !isCurrent) {
                  bgColor = "#4F545B";
                }
                if (isAnswered && isCurrent) {
                  bgColor = "#3C4045";
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
              className="sidebar-bottom-fixed-cover"
              onClick={handleFinishBookClick}
            >
              Завершить книгу
            </button>
            <button
              className="sidebar-bottom-fixed-cover"
              onClick={handleLogout}
            >
              Выйти из аккаунта
            </button>
          </div>
        </>
      )}
      {showPopup && (
        <div className="sidebar-popup">
          <div className="sidebar-popup-content">
          {!originalAddress || originalDeliveryDate === '1970-01-01T00:00:00.000Z' ? 
              <div className="sidebar-popup-title">Заполните данные заказа</div> :
              <div className="sidebar-popup-title">Отправляем книгу на редактуру?</div>
            }
            <div className="sidebar-popup-text">Перепроверьте содержание, это действие нельзя вернуть!</div>
            {!originalAddress && (
              <div className="sidebar-popup-input">
                <label>Город доставки</label>
                <input
                  type="text"
                  value={address || ''}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            )}
            {originalDeliveryDate === '1970-01-01T00:00:00.000Z' && (
              <div className="sidebar-popup-input">
                <label>Дата доставки</label>
                <input
                  type="date"
                  value={deliveryDate || ''}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </div>
            )}
            <div className="sidebar-popup-buttons">
            <button className="sidebar-popup-button"
              onClick={() => handleFinishBook({
                token: localStorage.getItem('token')!,
                address: address || '',
                deliveryTime: originalDeliveryDate as string,
              })}
            >
              Завершить
            </button>
            <button className="sidebar-popup-button"
              onClick={() => setShowPopup(false)}
            >
              Отменить
            </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default NavbarLoginnedMobile;
