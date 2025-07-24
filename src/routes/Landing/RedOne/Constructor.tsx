import React, { useState, memo, ChangeEvent } from "react";
import process11 from "./assets/proccess11.png";
import process13 from "./assets/proccess13.png";
import process15 from "./assets/proccess15.png";
import process12 from "./assets/proccess12.png";
import process14 from "./assets/proccess14.png";
import process16 from "./assets/proccess16.png";
import process2 from "./assets/proccess2.png";
import process3 from "./assets/proccess3.png";
import example from "./assets/example.jpg";
import "./Constructor.css";

export const globalPhoneNumber = '77788638419'

interface PreviewProps {
    currentStep: number;
    selectedCover: string;
    bookName: string;
    author: string;
    receiver: string;
    contentText: string;
    photoURL: string | null;
    process2: string;
    process3: string;
    photoText: string;
    selectedDate: string;
    handleNext: () => void;
    handleBack: () => void;
    handleOrder: () => void;
    formatDate: (dateStr: string) => string;
  }


  const Preview: React.FC<PreviewProps> = memo(({
    currentStep,
    selectedCover,
    bookName,
    author,
    receiver,
    contentText,
    photoURL,
    process2,
    process3,
    photoText,
    selectedDate,
    handleNext,
    handleBack,
    handleOrder,
    formatDate,
  }) => {
    if (currentStep === 1 || currentStep === 4) {
      return (
        <div className="preview-cover">
          <img src={selectedCover} alt="Selected Cover" />
          <div className="preview-bookname">{bookName}</div>
          <div className="preview-author">{author}</div>
          <div className="preview-receiver">{receiver}</div>
          <div className="navigation-buttons">
            {currentStep > 1 && (
              <button className="navigation-button back" onClick={handleBack}>
                Назад
              </button>
            )}
            {currentStep < 4 && (
              <button className="navigation-button next" onClick={handleNext}>
                Далее
              </button>
            )}
            {currentStep === 4 && (
              <button className="navigation-button order" onClick={handleOrder}>
                Дописать
              </button>
            )}
          </div>
        </div>
      );
    } else if (currentStep === 2) {
      return (
        <div className="preview-content" style={{ position: "relative" }}>
          <img src={process2} alt="Process 2" />
          <div className="preview-answer">{contentText}</div>
          <div className="navigation-buttons">
            {currentStep > 1 && (
              <button className="navigation-button back" onClick={handleBack}>
                Назад
              </button>
            )}
            {currentStep < 4 && (
              <button className="navigation-button next" onClick={handleNext}>
                Далее
              </button>
            )}
          </div>
        </div>
      );
    } else if (currentStep === 3) {
      return (
        <div className="preview-photo">
          <img className="preview-photo-main" src={process3} alt="Process 3" />
          {photoURL && (
            <img src={photoURL} alt="Uploaded" className="preview-photo-uploaded" />
          )}
          <div className="preview-description">
            {photoText} <br />
            <b>{formatDate(selectedDate)}</b>
          </div>
          <div className="navigation-buttons">
            {currentStep > 1 && (
              <button className="navigation-button back" onClick={handleBack}>
                Назад
              </button>
            )}
            {currentStep < 4 && (
              <button className="navigation-button next" onClick={handleNext}>
                Далее
              </button>
            )}
          </div>
        </div>
      );
    }
    return null;
  }
);

const BookConstructor: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [bookName, setBookName] = useState<string>("Навсегда в моем сердце");
  const [author, setAuthor] = useState<string>("Алия Маташева");
  const [receiver, setReceiver] = useState<string>("Моему любимому");
  const [selectedCover, setSelectedCover] = useState<string>(process11);
  const [contentText, setContentText] = useState<string>(
    "Меня зовут Алия, хотела посвятить книгу мужу.."
  );
  const [photoURL, setPhotoURL] = useState<string | null>(example);
  const [photoText, setPhotoText] = useState<string>("Подарок мужу на Новый Год :)");
  const [selectedDate, setSelectedDate] = useState<string>("2025-01-01");

  const handleNext = (): void => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = (): void => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setPhotoURL(URL.createObjectURL(file));
    }
  };

  const coverOptions = [
    process11,
    process12,
    process13,
    process14,
    process16,
  ];

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleOrder = () => {
    const message = `Здравствуйте! Я по поводу книги, можете проконсультировать ?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${globalPhoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="landing-upd-constructor">
      <div className="landing-upd-constructor-editor">
        <div className="landing-upd-constructor-editor-title">
          {currentStep === 1 && "Обложка"}
          {currentStep === 2 && "Заполнение книги"}
          {currentStep === 3 && "Фотографии"}
          {currentStep === 4 && "Допишите свою книгу"}
        </div>

        {currentStep === 1 && (
          <>
            <div className="landing-upd-constructor-editor-box">
              <div className="landing-upd-constructor-editor-box-title">
                Название книги
              </div>
              <input
                type="text"
                className="landing-upd-constructor-editor-box-input"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                maxLength={30}
              />
            </div>
            <div className="landing-upd-constructor-editor-box">
              <div className="landing-upd-constructor-editor-box-title">Автор</div>
              <input
                type="text"
                className="landing-upd-constructor-editor-box-input"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                maxLength={19}
              />
            </div>
            <div className="landing-upd-constructor-editor-box">
              <div className="landing-upd-constructor-editor-box-title">
                Получатель
              </div>
              <input
                type="text"
                className="landing-upd-constructor-editor-box-input"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                maxLength={23}
              />
            </div>
            <div className="landing-upd-constructor-editor-box">
              <div className="landing-upd-constructor-editor-box-title">
                Дизайн обложки
              </div>
              <div className="landing-upd-constructor-editor-box-selector">
                {coverOptions.map((cover, index) => (
                  <img
                    key={index}
                    src={cover}
                    alt={`Cover ${index + 1}`}
                    className="landing-upd-constructor-editor-box-item"
                    onClick={() => setSelectedCover(cover)}
                    style={{
                      border: selectedCover === cover ? "2px solid white" : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <div className="landing-upd-constructor-editor-box">
            <div className="landing-upd-constructor-editor-box-title">
              Содержание
            </div>
            <textarea
              className="landing-upd-constructor-editor-box-textarea"
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              maxLength={370}
            />
          </div>
        )}

        {currentStep === 3 && (
          <>
            <div className="landing-upd-constructor-editor-box">
              <div className="landing-upd-constructor-editor-box-title">
                Фото
              </div>
              <label htmlFor="handlePhotoUpload">Загрузить фото</label>
              <input style={{display: 'none'}} id="handlePhotoUpload" type="file" onChange={handlePhotoUpload} />
            </div>
            <div className="landing-upd-constructor-editor-box">
              <div className="landing-upd-constructor-editor-box-title">
                Текст
              </div>
              <input
                type="text"
                className="landing-upd-constructor-editor-box-input"
                value={photoText}
                onChange={(e) => setPhotoText(e.target.value)}
                maxLength={45}
              />
            </div>
            <div className="landing-upd-constructor-editor-box">
              <div className="landing-upd-constructor-editor-box-title">Дата</div>
              <input
                type="date"
                className="landing-upd-constructor-editor-box-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="navigation-buttons-mobile">
          {currentStep > 1 && (
            <button className="navigation-button back" onClick={handleBack}>
              Назад
            </button>
          )}
          {currentStep < 4 && (
            <button className="navigation-button next" onClick={handleNext}>
              Далее
            </button>
          )}
          {currentStep === 4 && (
            <button className="navigation-button order" onClick={handleOrder}>
              Дописать
            </button>
          )}
        </div>
      </div>

      {/* Memoized Preview Component */}
      <div className="landing-upd-constructor-preview">
        <Preview
          currentStep={currentStep}
          selectedCover={selectedCover}
          bookName={bookName}
          author={author}
          receiver={receiver}
          contentText={contentText}
          photoURL={photoURL}
          process2={process2}
          process3={process3}
          photoText={photoText}
          selectedDate={selectedDate}
          handleNext={handleNext}
          handleBack={handleBack}
          handleOrder={handleOrder}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
};

export default BookConstructor;
