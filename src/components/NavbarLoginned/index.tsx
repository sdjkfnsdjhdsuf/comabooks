import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { calculateDeadline } from "./deadlineCounter";

const NavbarLoginned = ({
  templateId,
  isCover = false,
}: {
  templateId: string;
  isCover?: boolean;
}) => {
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
  const [isViewingPhotos, setIsViewingPhotos] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<"finishBook" | "learnMore" | "changeDate" | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [originalDeliveryDate, setOriginalDeliveryDate] = useState<Date | null>(null);
  const [originalAddress, setOriginalAddress] = useState<string | null>(null);
  const [minDate, setMinDate] = useState<string>("");
  const [coverExists, setCoverExists] = useState(false);

  useEffect(() => {
    const fetchCover = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`https://api.comabooks.org/cover/${templateId}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          // Check if cover data exists
          setCoverExists(data);
        } else {
          setCoverExists(false);
        }
      } catch (error) {
        console.error('Error fetching cover data:', error);
        setCoverExists(false);
      }
    };

    fetchCover();
  }, [templateId]);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 7); // Add 5 days to today's date
    const minDateStr = today.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
    setMinDate(minDateStr);
  }, []);

  const handleSupport = () => {
    const message = `Здравствуйте! Я хотел(-а) узнать на счет успеваемости сроков моей книги.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/77476738427?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const fetchDeliveryData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("https://api.comabooks.org/user_anal", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        const { address, deliveryTime } = data;
        const deliveryDateObj = new Date(deliveryTime);

        if (
          deliveryDateObj.getTime() !== new Date("1970-01-01T00:00:00.000Z").getTime() &&
          address
        ) {
          setOriginalAddress(address);
          setOriginalDeliveryDate(deliveryDateObj);
          setAddress(address);
          setDeliveryDate(deliveryDateObj);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDeliveryData();
  }, []);

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

  const photos = useSelector<RootState, PhotoEnityDto[]>((state) =>
    Object.values(state.photos.photos)
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
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
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("https://api.comabooks.org/user_anal", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      const { address, deliveryTime } = data;

      const isDefaultDate = new Date(deliveryTime).getTime() === new Date("1970-01-01T00:00:00.000Z").getTime();

      setOriginalAddress(address);
      setOriginalDeliveryDate(new Date(deliveryTime));
      setAddress(address);
      setDeliveryDate(isDefaultDate ? null : new Date(deliveryTime));

      setPopupType("finishBook");
      setShowPopup(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFinishBook = async ({
    token,
    address,
    deliveryTime,
  }: {
    token: string;
    address: string;
    deliveryTime: string;
  }) => {
    if (!coverExists) {
      alert('У вас не заполнена обложка книги!');
      return;
    }
    try {
      const updatedData = {
        address: address || originalAddress,
        deliveryTime: deliveryTime,
        status: "done",
      };

      if (address !== originalAddress) {
        updatedData.address = address;
      }

      if (deliveryDate && deliveryDate !== originalDeliveryDate) {
        updatedData.deliveryTime = deliveryDate.toISOString();
      }

      await fetch("https://api.comabooks.org/user_anal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      setShowPopup(false);
      navigate("/onhold");
      // Additional logic if needed after finishing the book
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLearnMoreClick = () => {
    setPopupType("learnMore");
    setShowPopup(true);
  };

  const handleChangeDateClick = () => {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    const minChangeDate = today.toISOString().split("T")[0];
    setMinDate(minChangeDate);
    setPopupType("changeDate");
    setShowPopup(true);
  };

  const handleChangeDate = async () => {
    const token = localStorage.getItem("token");
    if (!token || !deliveryDate) return;

    try {
      await fetch("https://api.comabooks.org/user_anal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          deliveryTime: deliveryDate.toISOString(),
          address: originalAddress,
          status: 'inProccess'
        }),
      });

      setShowPopup(false);
      setOriginalDeliveryDate(deliveryDate);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isFinishBookSaveDisabled = !address || !deliveryDate;

  if (templateDto == null) return <></>;

  return (
    <aside className="sidebar">
      <div className="forms-info-container">
        <div className="forms">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>

          <div className="forms-info">
            <progress value={pageFilled} max={templateDto.questions.length} />
            <div className="page-numbers">
              {pageFilled} страниц заполнено
            </div>
            {deliveryDate && address && (
              <div className="deadline">
                {calculateDeadline(deliveryDate, address, handleLearnMoreClick)}
              </div>
            )}
          </div>
        </div>
      </div>
      {isViewingPhotos ? (
        <>
          <ul className="photo-list">
            {photos.map((photo) => (
              <li key={photo._id} onClick={() => handlePhotoClick(photo._id)}>
                <div className="photo-list-one">{photo.description}</div>
              </li>
            ))}
            <div className="sidebar-bottom-fixed-add-photo">
              <button onClick={addNewPhoto}>+ Добавить фото </button>
            </div>
          </ul>
        </>
      ) : (
        <ul className="questions-list">
          {templateDto.questions.map((templateQuestion, index) => {
            const isCurrent = index === currentPage;
            const isAnswered =
              answerMap[templateQuestion._id]?.answer?.replaceAll(" ", "") ?? "";

            let bgColor = "transparent";
            if (isCurrent) {
              bgColor = "#3C4045";
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
      <div className="sidebar-bottom-fixed">
        <button
          className="sidebar-bottom-fixed-cover"
          onClick={handleTogglePhotos}
        >
          {isViewingPhotos ? "Перейти к вопросам" : "Перейти к фото"}
        </button>
        <button
          className={`sidebar-bottom-fixed-cover`}
          onClick={showCoverPage}
        >
          Изменить обложку
        </button>
        <button
          className={`sidebar-bottom-fixed-cover`}
          onClick={handleFinishBookClick}
        >
          Завершить книгу
        </button>
        <button
          className={`sidebar-bottom-fixed-cover`}
          onClick={handleLogout}
        >
          Выйти из аккаунта
        </button>
      </div>
      {showPopup && popupType === "finishBook" && (
        <div className="sidebar-popup">
          <div className="sidebar-popup-content">
            {!originalAddress || originalDeliveryDate?.getTime() === new Date("1970-01-01T00:00:00.000Z").getTime() ? (
              <div className="sidebar-popup-title">Заполните данные заказа</div>
            ) : (
              <div className="sidebar-popup-title">Отправляем книгу на редактуру?</div>
            )}
            <div className="sidebar-popup-text">Перепроверьте содержание, это действие нельзя вернуть!</div>
            {!originalAddress && (
              <div className="sidebar-popup-input">
                <label>Город доставки</label>
                <input
                  type="text"
                  value={address || ""}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            )}
            {originalDeliveryDate?.getTime() === new Date("1970-01-01T00:00:00.000Z").getTime() && (
              <div className="sidebar-popup-input">
                <label>Дата доставки</label>
                <input
                  type="date"
                  value={deliveryDate ? deliveryDate.toISOString().split("T")[0] : ""}
                  min={minDate}
                  onChange={(e) => setDeliveryDate(new Date(e.target.value))}
                />
              </div>
            )}
            <div className="sidebar-popup-buttons">
              <button
                className="sidebar-popup-button"
                disabled={isFinishBookSaveDisabled}
                onClick={() =>
                  handleFinishBook({
                    token: localStorage.getItem("token")!,
                    address: address || "",
                    deliveryTime: (deliveryDate || originalDeliveryDate)?.toISOString() as string,
                  })
                }
              >
                Завершить
              </button>
              <button className="sidebar-popup-button" onClick={() => setShowPopup(false)}>
                Отменить
              </button>
            </div>
          </div>
        </div>
      )}
      {showPopup && popupType === "learnMore" && (
        <div className="sidebar-popup">
          <div className="sidebar-popup-content">
            <div className="sidebar-popup-title">Вы чуть-чуть не успеваете</div>
            <div className="sidebar-popup-text2">Могут возникнуть трудности с редактурой или печатью. Вы можете перенести дату доставки или связаться с нашим менеджером для уточнения сроков.</div>
            <div className="sidebar-popup-buttons2">
              <button className="sidebar-popup-button" onClick={handleSupport}>
                Связаться с менеджером
              </button>
              <button className="sidebar-popup-button" onClick={handleChangeDateClick}>
                Cдвинуть дату доставки
              </button>
              <button className="sidebar-popup-button" onClick={() => setShowPopup(false)}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
      {showPopup && popupType === "changeDate" && (
        <div className="sidebar-popup">
          <div className="sidebar-popup-content">
            <div className="sidebar-popup-title">Изменить дату доставки</div>
            <div className="sidebar-popup-input">
              <label>Новая дата доставки</label>
              <input
                type="date"
                value={deliveryDate ? deliveryDate.toISOString().split("T")[0] : ""}
                min={minDate}
                onChange={(e) => setDeliveryDate(new Date(e.target.value))}
              />
            </div>
            <div className="sidebar-popup-buttons">
              <button className="sidebar-popup-button" onClick={handleChangeDate}>
                Сохранить
              </button>
              <button className="sidebar-popup-button" onClick={() => setShowPopup(false)}>
                Отменить
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default NavbarLoginned;
