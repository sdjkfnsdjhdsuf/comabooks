import React from "react";
import { useState } from "react";
import './Cover.css';
import defaultCover from "assets/defaultcover.png";
import cover1 from 'assets/cover1.png';
import cover2 from 'assets/cover3.png';
import cover3 from 'assets/cover4.png';

function Cover() {
    // add get inputs from mongodb
    const [authorName, setAuthorName] = useState("");
    const [bookTitle, setBookTitle] = useState("");
    const [partnerName, setPartnerName] = useState("");
    const [coverColor, setCoverColor] = useState(defaultCover);
    const [isEditable, setIsEditable] = useState(true);

    const handleSave = () => {
        if (isEditable) {
            // For post axios, add function for color string
            console.log("Saving data:", { authorName, bookTitle, partnerName, coverColor });
        }
        setIsEditable(!isEditable);
    };


    type CoverColors = {
        [key: string]: string;
      };

    const coverColors: CoverColors = {
        cover1: defaultCover,
        cover2: cover1,
        cover3: cover2,
        cover4: cover3,
      };
    
      const handleColorSelect = (color: string) => {
        const coverImage = coverColors[color];
        if (coverImage) {
          setCoverColor(coverImage);
        }
      };

  return (
    <div className="cover-page">
        
        <div className="cover-info">

            <div className="cover-preview-mobile">
                <div className="cover">
                    <img src={coverColor} alt="Cover" className="cover-itself" />
                </div>

                <div className="cover-contains">
                    <div className="book-title">{bookTitle ? bookTitle : '\u00A0'}</div>
                    <div className="book-names">
                    <div className="author-name">{authorName ? authorName : '\u00A0'}</div>
                    <div className="partner-name">{partnerName ? partnerName : '\u00A0'}</div>
                    </div>
                </div>
            </div>

            <div className="cover-inputs">
                <div className="input">
                <div className="input-title">Ваше полное имя</div>
                <input
                type="text"
                placeholder="Напишите сюда ответ..."
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                disabled={!isEditable}
                />
                </div>

                <div className="input">
                <div className="input-title">Полное имя партнера</div>
                <input
                type="text"
                placeholder="Напишите сюда ответ..."
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                disabled={!isEditable}
                />
                </div>

                <div className="input">
                <div className="input-title">Название книги</div>
                <input
                type="text"
                placeholder="Напишите сюда ответ..."
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                disabled={!isEditable}
                />
                </div>
            </div>


            <div className="color-selector">
                {Object.keys(coverColors).map((color) => (
                <button
                    key={color}
                    style={{
                        backgroundColor: !isEditable ? '#DDDDDD' : 'transparent',
                        backgroundImage: !isEditable ? 'none' : `url(${coverColors[color]})`,
                        border: !isEditable ? 'none' : '1px solid black',
                        cursor: !isEditable ? 'not-allowed' : 'pointer',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    onClick={() => handleColorSelect(color)}
                    disabled={!isEditable}
                />
                ))}
            </div>

            <div className="input-save-button">
                <button onClick={handleSave}>
                    {isEditable ? "Сохранить" : "Изменить"}
                </button>
            </div>


        </div>

        <div className="cover-preview">
            <div className="cover">
                <img src={coverColor} alt="Cover" className="cover-itself" />
            </div>

            <div className="cover-contains">
                <div className="book-title">{bookTitle ? bookTitle : '\u00A0'}</div>
                <div className="book-names">
                <div className="author-name">{authorName ? authorName : '\u00A0'}</div>
                <div className="partner-name">{partnerName ? partnerName : '\u00A0'}</div>
                </div>
            </div>
        </div>

    </div>
  );
}

export default Cover;