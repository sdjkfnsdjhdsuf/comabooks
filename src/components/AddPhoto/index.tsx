import React, { useState, useRef, useEffect, ChangeEvent, MouseEvent } from 'react';
import './index.css';
import viewicon from "assets/viewicon.png";

const AddPhoto = () => {
  const [photoDate, setPhotoDate] = useState<string>('');
  const [photoDescription, setPhotoDescription] = useState<string>('');
  const [photoFile, setPhotoFile] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhotoDate(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPhotoDescription(e.target.value);
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPhotoFile(URL.createObjectURL(file));
    }
  };

  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isEditable) {
      console.log('Saving Photo:', { photoDate, photoDescription, photoFile });
    }
    setIsEditable(!isEditable);
  };

  return (
    <form className="add-photo-form" onSubmit={e => e.preventDefault()}>
      <div className="form-group-photo">
        <label htmlFor="photoFile">Фото</label>
        <input
          type="file"
          id="photoFile"
          ref={fileInputRef}
          accept="image/*"
          onChange={handlePhotoChange}
          disabled={!isEditable}
        />
        {photoFile && <img src={photoFile} alt="Preview" />}
      </div>  
      <div className="form-group">
        <label htmlFor="photoDate">Дата</label>
        <input
          type="date"
          id="photoDate"
          value={photoDate}
          onChange={handleDateChange}
          disabled={!isEditable}
        />
      </div>
      <div className="form-group">
        <label htmlFor="photoDescription">Описание</label>
        <textarea
          ref={textareaRef}
          id="photoDescription"
          value={photoDescription}
          onChange={handleDescriptionChange}
          disabled={!isEditable}
        />
      </div>
      <div className="add-photo-buttons">
        <button className="input-save-button-add" type="button" onClick={handleSave}>
          {isEditable ? "Сохранить" : "Изменить"}
        </button>

        <button
          className="preview-button"
          disabled={isEditable}
        >
          <img src={viewicon} alt="Viewicon" className="viewicon" />
        </button>
      </div>
    </form>
  );
};

export default AddPhoto;
