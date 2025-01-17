import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCover, setCover } from "slicers/cover_slicer";
import { AppDispatch, RootState } from "store";
import "./index.css";
import option1cover1button from "assets/option1cover1button.png";
import option1cover2button from "assets/option1cover2button.png";
import option1cover3button from "assets/option1cover3button.png";
import option1cover4button from "assets/option1cover4button.png";
import option1cover5button from "assets/option1cover5button.png";
import option1cover6button from "assets/option1cover6button.png";
import option2cover1button from "assets/option2cover1button.png";
import option2cover2button from "assets/option2cover2button.png";
import option2cover3button from "assets/option2cover3button.png";
import option2cover4button from "assets/option2cover4button.png";
import option2cover5button from "assets/option2cover5button.png";
import option2cover6button from "assets/option2cover6button.png";
import option3cover1button from "assets/option3cover1button.png";
import option3cover2button from "assets/option3cover2button.png";
import option3cover3button from "assets/option3cover3button.png";
import option3cover4button from "assets/option3cover4button.png";
import option3cover5button from "assets/option3cover5button.png";
import option3cover6button from "assets/option3cover6button.png";
import option4cover1button from "assets/option4cover1button.png";
import option4cover2button from "assets/option4cover2button.png";
import option4cover3button from "assets/option4cover3button.png";
import option4cover4button from "assets/option4cover4button.png";
import option4cover5button from "assets/option4cover5button.png";
import option4cover6button from "assets/option4cover6button.png";
import { useNavigate, useParams } from "react-router-dom";
import { CoverEntityDto } from "generated";


type CoverInfo = {
  key: string;
  label: string;
  url: string;
  groupName: string;
};

interface CoverGroups {
  [groupName: string]: {
    groupName: string;
    coversNames: Omit<CoverInfo, "groupName">[];
  };
};

const coverGroups: CoverGroups = {
  coverOption1: {
    groupName: "coverOption1",
    coversNames: [
      { key: "cover1", label: option1cover1button, url: 'https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A38%3A22.907Zblack%20front%20%282%29.png' },
      { key: "cover2", label: option1cover2button, url: "https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A39%3A10.220Zblue%20front.png" },
      { key: "cover3", label: option1cover3button, url: "https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A39%3A45.178Zdark%20green%20front.png" },
      { key: "cover4", label: option1cover4button, url: "https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A40%3A05.664Zlight%20green%20front.png" },
      { key: "cover5", label: option1cover5button, url: "https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A40%3A30.732Zred%20front.png" },
      { key: "cover6", label: option1cover6button, url: "https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A42%3A15.635Zyellow%20front.png" },
    ],
  },
  coverOption2: {
    groupName: "coverOption2",
    coversNames: [
      { key: "cover1", label: option2cover1button, url: "https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A42%3A47.129Zblack%203.png" },
      { key: "cover2", label: option2cover2button, url: "https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A43%3A10.241Zblue%203.png" },
      { key: "cover3", label: option2cover3button, url: "https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A43%3A57.487Zgreen%203.png" },
      { key: "cover4", label: option2cover4button, url: "https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A44%3A17.214Zlight%20green%203.png" },
      { key: "cover5", label: option2cover5button, url: "https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A44%3A44.928Zred%203.png" },
      { key: "cover6", label: option2cover6button, url: "https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A44%3A58.892Zyellow%203.png" },
    ],
  },
  coverOption3: {
    groupName: "coverOption3",
    coversNames: [
      { key: "cover1", label: option3cover1button, url: "https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A45%3A28.386Zblack%202%20%281%29.png" },
      { key: "cover2", label: option3cover2button, url: "https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A46%3A24.654Zblue%202.png" },
      { key: "cover3", label: option3cover3button, url: "https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A47%3A11.448Zdark%20green%202.png" },
      { key: "cover4", label: option3cover4button, url: "https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A47%3A31.516Zgreen%202.png" },
      { key: "cover5", label: option3cover5button, url: "https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A47%3A49.430Zred%202.png" },
      { key: "cover6", label: option3cover6button, url: "https://comabooks.s3.eu-central-1.amazonaws.com/2025-01-17T19%3A48%3A33.214Zyellow%202.png" },
    ],
  },
  coverOption4: {
    groupName: "coverOption4",
    coversNames: [
      { key: "cover1", label: option4cover1button, url: "https://gtaxi.s3.eu-central-1.amazonaws.com/comabooks/black+fornt+(2).png" },
      { key: "cover2", label: option4cover2button, url: "https://gtaxi.s3.eu-central-1.amazonaws.com/comabooks/blue+front+(2).png" },
      { key: "cover3", label: option4cover3button, url: "https://gtaxi.s3.eu-central-1.amazonaws.com/comabooks/green+front+(2).png" },
      { key: "cover4", label: option4cover4button, url: "https://gtaxi.s3.eu-central-1.amazonaws.com/comabooks/light+green+front+(2).png" },
      { key: "cover5", label: option4cover5button, url: "https://gtaxi.s3.eu-central-1.amazonaws.com/comabooks/red+front+(3).png" },
      { key: "cover6", label: option4cover6button, url: "https://gtaxi.s3.eu-central-1.amazonaws.com/comabooks/yellow+front+1.png" },
    ],
  },
};

const allCovers: CoverInfo[] = Object.values(coverGroups).flatMap((group) =>
  group.coversNames.map((cover) => ({
    ...cover,
    groupName: group.groupName,
  }))
);


function Cover() {
  const { id: templateId } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const coverData = useSelector<RootState, CoverEntityDto | null>(
    (state) => state.cover.value
  );

  const [authorName, setAuthorName] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [displayPartnerName, setDisplayPartnerName] = useState(true);
  const [coverColor, setCoverColor] = useState<string>(coverGroups.coverOption1.coversNames[4].url);
  const [coverGroup, setCoverGroup] = useState<string>(coverGroups.coverOption1.coversNames[4].label);
  const [selectedCover, setSelectedCover] = useState<CoverInfo | null>(null);
  
  const [isEditable, setIsEditable] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (coverData != null) {
      setAuthorName(coverData.fullName);
      setBookTitle(coverData.bookName);
      setPartnerName(coverData.fullNamePartner);
      const foundCover = allCovers.find((c) => c.url === coverData.coverUrl);
      if (foundCover) {
        setSelectedCover(foundCover);
        setCoverColor(foundCover.url);
        setCoverGroup(foundCover.groupName);
      } else {
        setSelectedCover(null);
        setCoverColor(coverData.coverUrl);
        setCoverGroup("");
      }
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

  const handleCoverClick = (cover: CoverInfo) => {
    setSelectedCover(cover);
    setCoverColor(cover.url);
    setCoverGroup(cover.groupName);
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

          <div className={`cover-contains-${coverGroup}`}>
            <div className={`book-title-${coverGroup}`}>{bookTitle ? bookTitle : "\u00A0"}</div>
            <div className={`book-names-${coverGroup}`}>
              <div className={`author-name-${coverGroup}`}>
                {authorName ? authorName : "\u00A0"}
              </div>
              <div className={`partner-name-${coverGroup}`}>
                {displayPartnerName ? partnerName : "\u00A0"}
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

          <div className="input">
            <div className="input-title">Выберите обложку</div>
            <div className="cover-selector">
              {allCovers.map((cover) => (
                <button
                  key={cover.key}
                  type="button"
                  className={`cover-selector-button ${
                    selectedCover?.url === cover.url ? "selected" : ""
                  }`}
                  disabled={!isEditable}
                  onClick={() => handleCoverClick(cover)}
                  style={{
                    backgroundImage: `url(${cover.label})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "40px",
                    height: "40px",
                    border: isEditable
                      ? selectedCover?.url === cover.url ? "4px solid #363E50" : "1px solid transparent"
                      : "1px solid transparent",
                    cursor: isEditable ? "pointer" : "not-allowed",
                    marginRight: "8px",
                    borderRadius: "4px"
                  }}
                />
              ))}
            </div>
          </div>
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

        <div className={`cover-contains-${coverGroup}`}>
            <div className={`book-title-${coverGroup}`}>{bookTitle ? bookTitle : "\u00A0"}</div>
            <div className={`book-names-${coverGroup}`}>
              <div className={`author-name-${coverGroup}`}>
                {authorName ? authorName : "\u00A0"}
              </div>
              <div className={`partner-name-${coverGroup}`}>
                {displayPartnerName ? partnerName : "\u00A0"}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Cover;
