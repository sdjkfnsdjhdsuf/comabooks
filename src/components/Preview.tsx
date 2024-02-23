import React from "react";
import "./Preview.css";

export const Preview = ({
  isOpen,
  onClose,
  question,
  answer,
  pageNumber,
}: {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  answer: string;
  pageNumber: number;
}) => {
  if (!isOpen) return null;

  return (
    <div className="book-preview-backdrop" onClick={onClose}>
      <div
        className="book-preview-content"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="preview-question">{question}</p>
        <p className="preview-answer">{answer}</p>
        <div className="preview-colon">
          <p>{pageNumber}</p>
          <p>You Own My Heart</p>
        </div>
      </div>
    </div>
  );
};

// export default Preview;
