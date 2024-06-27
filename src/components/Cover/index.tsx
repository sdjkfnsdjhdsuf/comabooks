import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCover, setCover } from "slicers/cover_slicer";
import { CoverState } from "slicers/cover_slicer";
import { AppDispatch, RootState } from "store";
import axios from "axios";
import "./index.css";
import colorButton1 from "assets/red.png";
import colorButton2 from "assets/yellow.png";
import colorButton3 from "assets/black.png";
import colorButton4 from "assets/blue.png";
import colorButton5 from "assets/green.png";
import colorButton6 from "assets/light-green.png";
import { useNavigate, useParams } from "react-router-dom";
import { CoverEntityDto } from "generated";

function Cover() {
  const { id: templateId } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const coverData = useSelector<RootState, CoverEntityDto | null>(
    (state) => state.cover.value
  );

  const coverColors: Record<CoverKey, string> = {
    cover1: "https://gtaxi.s3.eu-central-1.amazonaws.com/comabooks/red+front+(3).png",
    cover2: "https://gtaxi.s3.eu-central-1.amazonaws.com/comabooks/yellow+front+1.png",
    cover3: "https://gtaxi.s3.eu-central-1.amazonaws.com/comabooks/black+fornt+(2).png",
    cover4: "https://gtaxi.s3.eu-central-1.amazonaws.com/comabooks/blue+front+(2).png",
    cover5: "https://gtaxi.s3.eu-central-1.amazonaws.com/comabooks/green+front+(2).png",
    cover6: "https://gtaxi.s3.eu-central-1.amazonaws.com/comabooks/light+green+front+(2).png",
  };

  const [authorName, setAuthorName] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [displayPartnerName, setDisplayPartnerName] = useState(true);
  const [coverColor, setCoverColor] = useState(coverColors.cover1);
  const [isEditable, setIsEditable] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (coverData != null) {
      setAuthorName(coverData.fullName);
      setBookTitle(coverData.bookName);
      setPartnerName(coverData.fullNamePartner);
      setCoverColor(coverData.coverUrl);
    }
  }, [coverData]);

  if (templateId == null) {
    console.log("WELL");
    navigate("/forms");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchCover(templateId!));
      } catch (error) {
        console.error("There was an error fetching the cover data:", error);
      }
    };

    fetchData();
  }, [dispatch, templateId]);

  const handleSave = async () => {
    if (isEditable) {
      try {
        await dispatch(
          setCover({
            templateId: templateId!,
            bookName: bookTitle,
            coverUrl: coverColor,
            fullName: authorName,
            fullNamePartner: partnerName
          })
        );
        console.log("Data saved");
      } catch (error) {
        console.error("There was an error saving the cover data:", error);
      }
    }
    setIsEditable(!isEditable);
  };

  type CoverKey = 'cover1' | 'cover2' | 'cover3' | 'cover4' | 'cover5' | 'cover6';

  type CoverSelectorColors = {
    [key: string]: string;
  };

  const coverSelectorColors: CoverSelectorColors = {
    colorButton1: colorButton1,
    colorButton2: colorButton2,
    colorButton3: colorButton3,
    colorButton4: colorButton4,
    colorButton5: colorButton5,
    colorButton6: colorButton6,
  };

  const handleColorSelect = (color: string) => {
    const coverKey = color as CoverKey;
    const coverImage = coverColors[coverKey];
    if (coverImage) {
      setCoverColor(coverImage);
    }
  };

  const receiverHolder = (templateId: string | undefined) => {
    if (templateId === '65fb40c5b63f0df17f6ce6ae') {
      return 'Полное имя мамы';
    } else if (templateId === '65fb7789f6d6c9118d3caead') {
      return 'Полное имя сестры';
    } else if (templateId === '661970fd80f5c5317e0882c3') {
      return 'Полное имя подруги';
    } else {
      return 'Полное имя партнера';
    }
  };

  const validateBookTitle = (title: string) => {
    // Emoji regex pattern
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

    // Check length and emoji presence
    return title.length <= 30 && !emojiRegex.test(title);
  };

  const handleBookTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (validateBookTitle(title)) {
      setBookTitle(title);
    } else {
      // Optionally provide feedback to the user
      alert("Название книги не может быть больше 30 символов и включать эмодзи");
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
            <div className="book-title">{bookTitle ? bookTitle : "\u00A0"}</div>
            <div className="book-names">
              <div className="author-name">
                {authorName ? authorName : "\u00A0"}
              </div>
              <div className="partner-name">
                {partnerName ? partnerName : "\u00A0"}
              </div>
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
            <div className="input-title">{receiverHolder(templateId)}</div>
            <input
              type="text"
              placeholder="Напишите сюда ответ..."
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              disabled={!isEditable}
            />
            <div className="nopartner">
              <label>
                <input
                  type="checkbox"
                  checked={!displayPartnerName}
                  onChange={() => setDisplayPartnerName(!displayPartnerName)}
                />
                Не отображать на обложке
              </label>
            </div>
          </div>

          <div className="input">
            <div className="input-title">Название книги</div>
            <input
              type="text"
              placeholder="Напишите сюда ответ..."
              value={bookTitle}
              onChange={handleBookTitleChange}
              disabled={!isEditable}
            />
          </div>
        </div>

        <div className="color-selector">
          {Object.keys(coverSelectorColors).map((colorKey) => {
            const color = colorKey.replace("colorButton", "cover");
            return (
              <button
                key={colorKey}
                style={{
                  backgroundColor: !isEditable ? "#DDDDDD" : "transparent",
                  backgroundImage: !isEditable
                    ? "none"
                    : `url(${coverSelectorColors[colorKey]})`,
                  border: !isEditable ? "none" : "1px solid black",
                  cursor: !isEditable ? "not-allowed" : "pointer",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "40px",
                  height: "40px",
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
          <div className="book-title">{bookTitle ? bookTitle : "\u00A0"}</div>
          <div className="book-names">
            <div className="author-name">
              {authorName ? authorName : "\u00A0"}
            </div>
            <div className="partner-name">
              {displayPartnerName ? partnerName : "\u00A0"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cover;
