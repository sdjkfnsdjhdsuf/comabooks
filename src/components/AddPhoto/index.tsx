import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  MouseEvent,
} from "react";
import "./index.css";
import viewicon from "assets/viewicon.png";
import { useDispatch, useSelector } from "react-redux";
import { addPhoto, deletePhoto, fetchPhotos, updatePhoto } from "slicers/photos_slicer";
import { AppDispatch, RootState } from "store";
import { CoverEntityDto, PhotoService, UplaodService } from "generated";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import arrow from "assets/arrow.png";
import uploadicon from "assets/upload-icon.png"

const AddPhoto = () => {
  const { templateId, photoId } = useParams();
  const [photoDate, setPhotoDate] = useState<Date | null>(null);
  const [photoDescription, setPhotoDescription] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const coverData = useSelector<RootState, CoverEntityDto | null>(
    (state) => state.cover.value
  );

  const [hideDate, setHideDate] = useState<boolean>(false);
  const [hideDescription, setHideDescription] = useState<boolean>(false);
  const [questionTxt, setQuestionTxt] = useState<string>("");
  const [questions, setQuestions] = useState<{ number: number; question: string }[]>([]);

  const [notify, setNotify] = useState(false)
  
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    if (templateId) {
      const fetchQuestionsAndAnswers = async () => {
        try {
          const [questionsResponse, answersResponse] = await Promise.all([
            fetch(`https://api.comabooks.org/questions/${templateId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
              },
            }).then(res => res.json()),
            fetch(`https://api.comabooks.org/answers/my/${templateId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
              },
            }).then(res => res.json()),
          ]);

          const filteredAnswers = answersResponse.filter((answer: any) => answer.answer !== "-" && answer.answer.trim() !== "");

          const questionsWithAnswers = questionsResponse.map((question: any, index: number) => {
            const answer = filteredAnswers.find((ans: any) => ans.questionId === question._id);
            return answer ? { number: index + 1, question: question.question } : null;
          }).filter((question: any) => question !== null);

          setQuestions(questionsWithAnswers);
        } catch (error) {
          console.error('Error fetching questions and answers:', error);
        }
      };

      fetchQuestionsAndAnswers();
    }
  }, [templateId]);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhotoDate(new Date(e.target.value));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    if (description.length <= 200) {
      setPhotoDescription(description);
    }
  };

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      console.log(`Fetching details for photoId: ${photoId}`);
      if (templateId && photoId) {
        try {
          const photos = await PhotoService.photoControllerGetPhotos({ templateId }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const photoDetails = photos.find(photo => photo._id === photoId); 
          console.log(photoDetails);
          if (photoDetails) {
            setPhotoDate(new Date(photoDetails.date));
            setPhotoDescription(photoDetails.description);
            setPhotoFile(photoDetails.photoUrl);
            setHideDate(photoDetails.hideDate);
            setHideDescription(photoDetails.hideDescription);
            setQuestionTxt(photoDetails.questionTxt);
            setIsEditable(false);
          }
        } catch (error) {
          console.error("Failed to fetch photo details:", error);
        }
      }
    };
  
    fetchPhotoDetails();
  }, [photoId, templateId]);
  
  const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append("file", file);
      const uploadedFile = await axios.post(
        "https://api.comabooks.org/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPhotoFile(uploadedFile.data);
    }
  };

  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (photoDate && photoDescription && photoFile && templateId && questionTxt) {
      const photoData = {
        date: photoDate,
        description: photoDescription,
        photoUrl: photoFile,
        templateId: templateId,
        hideDate: hideDate,
        hideDescription: hideDescription,
        questionTxt: questionTxt,
      };

      if (isEditable) {
        if (photoId) {
          dispatch(updatePhoto({
            ...photoData, photoId,
            userId: ""
          })); 
        } else {
          dispatch(addPhoto(photoData));
        }
      }

      setIsEditable(!isEditable);
    } else {
      setNotify(true)
      setTimeout(() => {
        setNotify(false)
      }, 2000)
    }
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (photoId) {
      try {
        await dispatch(deletePhoto(photoId));
        navigate('/forms');
      } catch (error) {
        console.error('Failed to delete photo:', error);
      }
    }
  };

  function parseDate(dateString: string) {

    const months = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
      Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };

    const parts = dateString.split(' ');

    const day = parts[2];
    const monthName = parts[1];
    const year = parts[3];
  
    const month = months[monthName as keyof typeof months];
  
    return `${day}.${month}.${year}`;
  }

  const formattedDate = parseDate(photoDate ? photoDate.toString() : " ");

  

  return (
    <>
    <div className="add-photo-container">
      {notify && 
      <div className="notify-popup">
        <div className="notify-popup-content">
        Для сохранения заполните все поля!
        </div>
      </div>}
    <form className="add-photo-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-group-photo">
        <label htmlFor="photoFile">Фото</label>
        <input
          type="file"
          id="photoFile"
          ref={fileInputRef}
          accept="image/*"
          onChange={handlePhotoChange}
          disabled={!isEditable}
          style={{ display: "none" }}/>
          <label htmlFor="photoFile" className="upload-icon-label"
          style={{ backgroundColor: isEditable ? 'white' : '#DDDDDD' }}>
          <img src={uploadicon} alt="Upload" className="upload-icon"/>
          </label>
      </div>
      <div className="form-group">
        <label htmlFor="photoDate">Дата</label>
        <input
          type="date"
          id="photoDate"
          value={photoDate?.toISOString().substring(0, 10)}
          onChange={handleDateChange}
          disabled={!isEditable}
          style={{ backgroundColor: isEditable ? 'white' : '#DDDDDD' }}/>
      </div>
      <div className="hidephoto">
            <label>
              <input
                type="checkbox"
                checked={hideDate}
                onChange={() => setHideDate(!hideDate)}
                disabled={!isEditable}
              />
              Скрыть дату
            </label>
      </div>
      <div className="form-group">
        <label htmlFor="photoDescription">Описание</label>
        <textarea
          ref={textareaRef}
          id="photoDescription"
          value={photoDescription}
          onChange={handleDescriptionChange}
          disabled={!isEditable}
          style={{ backgroundColor: isEditable ? 'white' : '#DDDDDD' }}/>
      </div>
      <div className="hidephoto">
            <label>
              <input
                type="checkbox"
                checked={hideDescription}
                onChange={() => setHideDescription(!hideDescription)}
                disabled={!isEditable}
              />
              Скрыть описание
            </label>
      </div>
      <div className="form-group">
      <label htmlFor="questionTxt">После какого вопроса поставить фото</label>
      <select
            id="questionTxt"
            value={questionTxt || ''}
            onChange={(e) => setQuestionTxt(e.target.value)}
            disabled={!isEditable}
          >
            <option value="">Выбрать вопрос</option>
            {questions.map((pair, idx) => (
              <option key={idx} value={pair.question}>{pair.number}. {pair.question}</option>
            ))}
      </select>
      </div>
      <div className="add-photo-buttons">
        <button
          className="input-save-button-add"
          type="button"
          onClick={handleSave}
        >
          {isEditable ? "Сохранить" : "Изменить"}
        </button>
        <button
          className="input-save-button-add"
          type="button"
          onClick={handleDelete}
        >
          Удалить
        </button>
      </div>
    </form>

    <div className="photo-preview-container">
        <div className="photo-preview">
          {photoFile && (
              <img
                className='photo-preview-media'
                src={photoFile}
                alt="Preview"
              />
          )}
          <div className="photo-preview-details">
          {photoDate && !hideDate && <div className="photo-preview-date">{formattedDate}</div>}
          {photoDescription && !hideDescription && <div className="photo-preview-description">{photoDescription}</div>}
          </div>
          <div className="preview-photo-colon">
            <p>{coverData?.bookName || "\u00A0"}</p>
            <p>95</p>
          </div>
        </div>
    </div>
    </div>
    
    <Link to={`/forms/${templateId}`}>
        <img src={arrow} className="arrow-icon" />
    </Link></>
  );
};

export default AddPhoto;