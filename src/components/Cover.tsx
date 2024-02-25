import React from "react";
import { useState } from "react";
import './Cover.css';
import cover1 from "assets/red front.png";
import cover2 from 'assets/yellow front.png';
import cover3 from 'assets/black fornt.png';
import cover4 from 'assets/blue front.png';
import cover5 from 'assets/green front.png';
import cover6 from 'assets/light green front.png';

import colorButton1 from "assets/red.png";
import colorButton2 from 'assets/yellow.png';
import colorButton3 from 'assets/black.png';
import colorButton4 from 'assets/blue.png';
import colorButton5 from 'assets/green.png';
import colorButton6 from 'assets/light-green.png';

function Cover() {
    // add get inputs from mongodb
    const [authorName, setAuthorName] = useState("");
    const [bookTitle, setBookTitle] = useState("");
    const [partnerName, setPartnerName] = useState("");
    const [coverColor, setCoverColor] = useState(cover1);
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

    type CoverSelectorColors = {
        [key: string]: string;
      };


    const coverColors: CoverColors = {
        cover1: cover1,
        cover2: cover2,
        cover3: cover3,
        cover4: cover4,
        cover5: cover5,
        cover6: cover6
      };


      const coverSelectorColors: CoverSelectorColors = {
        colorButton1: colorButton1,
        colorButton2: colorButton2,
        colorButton3: colorButton3,
        colorButton4: colorButton4,
        colorButton5: colorButton5,
        colorButton6: colorButton6
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
            {Object.keys(coverSelectorColors).map((colorKey) => {
                const color = colorKey.replace('colorButton', 'cover');
                return (
                <button
                    key={colorKey}
                    style={{
                    backgroundColor: !isEditable ? '#DDDDDD' : 'transparent',
                    backgroundImage: !isEditable ? 'none' : `url(${coverSelectorColors[colorKey]})`,
                    border: !isEditable ? 'none' : '1px solid black',
                    cursor: !isEditable ? 'not-allowed' : 'pointer',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '40px',
                    height: '40px',
                    }}
                    onClick={() => handleColorSelect(color)}
                    disabled={!isEditable}
                />
                );
            })}
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