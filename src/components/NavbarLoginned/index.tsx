import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
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
import { calculateNewDeadline } from "./calculateNewDeadline";

export const globalPhoneNumber = "77024759835";

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
  const [popupType, setPopupType] = useState<"finishBook" | "learnMore" | "changeDate" | "changeDateAndFinish" | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [street, setStreet] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [originalDeliveryDate, setOriginalDeliveryDate] = useState<Date | null>(null);
  const [originalAddress, setOriginalAddress] = useState<string | null>(null);
  const [minDate, setMinDate] = useState<Date>(new Date());
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 7); 
    setMinDate(today);
  }, []);

  const handleSupport = () => {
    const message = `Здравствуйте! Я хотел(-а) узнать на счет успеваемости сроков моей книги.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${globalPhoneNumber}?text=${encodedMessage}`;
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

        const { address, deliveryTime, street, phone } = data;
        const deliveryDateObj = new Date(deliveryTime);

        if (
          deliveryDateObj.getTime() !== new Date("1970-01-01T00:00:00.000Z").getTime() &&
          address
        ) {
          setOriginalAddress(address);
          setOriginalDeliveryDate(deliveryDateObj);
          setAddress(address);
          setDeliveryDate(deliveryDateObj);
          setStreet(street);
          setPhone(phone);
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

  const deadlineRef = useRef<HTMLDivElement | null>(null);

  const handleFinishBookClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const response2 = await fetch(`https://api.comabooks.org/cover/${templateId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data2 = await response2.json();
      if (!data2.value) {
        alert('У вас не заполнена обложка книги!');
        return;
      }
  
      const response = await fetch("https://api.comabooks.org/user_anal", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
  
      const { address, deliveryTime, street, phone } = data;
  
      const isDefaultDate = new Date(deliveryTime).getTime() === new Date("1970-01-01T00:00:00.000Z").getTime();
  
      setOriginalAddress(address);
      setOriginalDeliveryDate(new Date(deliveryTime));
      setAddress(address);
      setDeliveryDate(isDefaultDate ? null : new Date(deliveryTime));
      setStreet(street);
      setPhone(phone);
  
      if ((deadlineRef.current && deadlineRef.current.innerHTML.includes("Узнать больше")) || isDefaultDate) {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let validDateFound = false;
        
        while (!validDateFound) {
          if(originalAddress) {
            console.log(originalAddress)
            today.setDate(today.getDate() + 1);
            validDateFound = calculateNewDeadline(today, originalAddress);
            console.log(`valid ${validDateFound}`)
          } else {
            today.setDate(today.getDate() + 8);
            validDateFound = true;
          }
        }
      
        setMinDate(today);
        setPopupType("changeDateAndFinish");
      } else {
        setPopupType("finishBook");
      }
      setShowPopup(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const handleFinishBook = async ({
    token,
    address,
    deliveryTime,
    street,
    phone
  }: {
    token: string;
    address: string;
    deliveryTime: string;
    street: string;
    phone: string;
  }) => {
  
    try {
      const updatedData = {
        address: address || originalAddress,
        deliveryTime: deliveryTime,
        street: street || originalAddress,
        phone: phone,
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
    today.setDate(today.getDate() + 7);
    setMinDate(today);
    setPopupType("changeDate");
    setShowPopup(true);
  };
  

  const handleChangeDate = async () => {
    // if (!day || !month || !year) return;

    // const newDateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    // const newDate = new Date(newDateStr);
    // console.log(newDate)
    // if (isNaN(newDate.getTime())) return;
    // console.log('2')

    // setDeliveryDate(newDate);
    // console.log('3')

    const token = localStorage.getItem("token");
    console.log('4')
    if (!token) return;
    if (!deliveryDate) return;
    console.log('5')

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
          street: street || "",
          phone: phone || "",
          status: 'inProccess'
        }),
      });
      console.log('6')

      setShowPopup(false);
      setOriginalDeliveryDate(deliveryDate);
      alert('Дата доставки обновилась, теперь можете завершать книгу')
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeDateAndFinish = async () => {

    // const newDateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    // const newDate = new Date(newDateStr);
    // if (isNaN(newDate.getTime())) {
       
    //   return;
    // }

    // setDeliveryDate(newDate);

    const token = localStorage.getItem("token");
    if (!token) return;
    if (!deliveryDate) return;

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
          street: street || "",
          phone: phone || "",
          status: 'inProccess'
        }),
      });

      setShowPopup(false);
      setOriginalDeliveryDate(deliveryDate);
      setPopupType("finishBook");
      setShowPopup(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isFinishBookSaveDisabled = !address || !deliveryDate || !street || !phone;
  const isChangeDateDisabled = !day || !month || !year;

  const renderDayOptions = (startDay: number) => {
    const daysInMonth = new Date(
      deliveryDate ? deliveryDate.getFullYear() : minDate.getFullYear(),
      deliveryDate ? deliveryDate.getMonth() + 1 : minDate.getMonth() + 1,
      0
    ).getDate();
    const days = [<option key="" value="">Day</option>];
    for (let i = startDay; i <= daysInMonth; i++) {
      days.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return days;
  };

  const renderMonthOptions = (startMonth: number) => {
    const months = [<option key="" value="">Month</option>];
    for (let i = startMonth; i < 12; i++) {
      months.push(
        <option key={i} value={i + 1}>
          {new Date(0, i).toLocaleString("en", { month: "long" })}
        </option>
      );
    }
    return months;
  };

  const renderYearOptions = (startYear: number) => {
    const currentYear = new Date().getFullYear();
    const years = [<option key="" value="">Year</option>];
    for (let i = startYear; i <= currentYear + 5; i++) {
      years.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return years;
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDay(e.target.value);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
  };

  const closePopup = () => {
    setShowPopup(false);
    setDay("");
    setMonth("");
    setYear("");
  }

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
            {deliveryDate && address && (originalDeliveryDate?.getTime() !== new Date("1970-01-01T00:00:00.000Z").getTime()) && (
              <div className="deadline" ref={deadlineRef}>
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
                <div className="date-selects">
                  <select value={day} onChange={handleDayChange}>
                    {renderDayOptions(minDate.getDate())}
                  </select>
                  <select value={month} onChange={handleMonthChange}>
                    {renderMonthOptions(minDate.getMonth())}
                  </select>
                  <select value={year} onChange={handleYearChange}>
                    {renderYearOptions(minDate.getFullYear())}
                  </select>
                </div>
              </div>
            )}
            <div className="sidebar-popup-input">
              <label>Улица доставки</label>
              <input
                type="text"
                value={street || ""}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="sidebar-popup-input">
              <label>Телефон</label>
              <input
                type="text"
                value={phone || ""}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="sidebar-popup-buttons">
              <button
                className="sidebar-popup-button"
                disabled={isFinishBookSaveDisabled}
                onClick={() =>
                  handleFinishBook({
                    token: localStorage.getItem("token")!,
                    address: address || "",
                    deliveryTime: (deliveryDate || originalDeliveryDate)?.toISOString() as string,
                    street: street || "",
                    phone: phone || ""
                  })
                }
              >
                Завершить
              </button>
              <button className="sidebar-popup-button" onClick={closePopup}>
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
              <button className="sidebar-popup-button" onClick={closePopup}>
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
              {/* <div className="date-selects">
                <select value={day} onChange={handleDayChange}>
                  {renderDayOptions(minDate.getDate())}
                </select>
                <select value={month} onChange={handleMonthChange}>
                  {renderMonthOptions(minDate.getMonth())}
                </select>
                <select value={year} onChange={handleYearChange}>
                  {renderYearOptions(minDate.getFullYear())}
                </select>
              </div> */}
              <input
                  type="date"
                  value={deliveryDate ? deliveryDate.toISOString().split("T")[0] : ""}
                  min={minDate.toISOString().split("T")[0]}
                  onChange={(e) => setDeliveryDate(new Date(e.target.value))}
                />
            </div>
            <div className="sidebar-popup-buttons">
              <button disabled={!deliveryDate || new Date(deliveryDate.getTime() + 86400000) < minDate}  className="sidebar-popup-button" onClick={handleChangeDate}>
                Изменить
              </button>
              <button className="sidebar-popup-button" onClick={closePopup}>
                Отменить
              </button>
            </div>
          </div>
        </div>
      )}
              {showPopup && popupType === "changeDateAndFinish" && (
          <div className="sidebar-popup">
            <div className="sidebar-popup-content">
              <div className="sidebar-popup-title">Изменить дату доставки</div>
              <div className="sidebar-popup-input">
                <label>Новая дата доставки</label>
                {/* <div className="date-selects">
                  <select value={day} onChange={handleDayChange}>
                    {renderDayOptions(minDate.getDate())}
                  </select>
                  <select value={month} onChange={handleMonthChange}>
                    {renderMonthOptions(minDate.getMonth())}
                  </select>
                  <select value={year} onChange={handleYearChange}>
                    {renderYearOptions(minDate.getFullYear())}
                  </select>
                </div> */}
                <input
                  type="date"
                  value={deliveryDate ? deliveryDate.toISOString().split("T")[0] : ""}
                  min={minDate.toISOString().split("T")[0]}
                  onChange={(e) => setDeliveryDate(new Date(e.target.value))}
                />

              </div>
              <div className="sidebar-popup-buttons">
                <button disabled={!deliveryDate || new Date(deliveryDate.getTime() + 86400000) < minDate} className="sidebar-popup-button" onClick={handleChangeDateAndFinish}>
                  Изменить
                </button>
                <button className="sidebar-popup-button" onClick={closePopup}>
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
