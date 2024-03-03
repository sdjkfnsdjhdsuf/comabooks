import React from 'react';
import './index.css';

interface PhotoPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  photoTitle: string;
  photoDate: string;
  photoDescription: string;
  photoUrl: string;
}

export const PhotoPreview: React.FC<PhotoPreviewProps> = ({
  isOpen,
  onClose,
  photoTitle,
  photoDate,
  photoDescription,
  photoUrl,
}) => {
  if (!isOpen) return null;

  return (
    <div className="book-preview-backdrop" onClick={onClose}>
      <div className="book-preview-content" onClick={(e) => e.stopPropagation()}>
        <div className="preview-photo-section">
          {photoUrl && <img src={photoUrl} alt="Preview" className="preview-photo" />}
          <div className="preview-photo-info">
            <h3>{photoTitle}</h3>
            <p>{photoDate}</p>
            <p>{photoDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoPreview;
