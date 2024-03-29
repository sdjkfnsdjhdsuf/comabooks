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
  
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhotoDate(new Date(e.target.value));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPhotoDescription(e.target.value);
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
    if (photoDate && photoDescription && photoFile && templateId) {
      const photoData = {
        date: photoDate,
        description: photoDescription,
        photoUrl: photoFile,
        templateId: templateId,
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
          {photoFile && <img className="photo-preview-media" src={photoFile} alt="Preview" />}
          {photoDate && <div className="photo-preview-date">{formattedDate}</div>}
          {photoDescription && <div className="photo-preview-description">{photoDescription}</div>}
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
