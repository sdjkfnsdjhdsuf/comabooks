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

  const isOddPageNumber = pageNumber % 2 !== 0;

  return (
    <div className="book-preview-backdrop" onClick={onClose}>
      <div className="book-preview-content" onClick={(e) => e.stopPropagation()}>
        <p className="preview-question">{question}</p>
        <p className="preview-answer">{answer}</p>
        <div className="preview-colon">
          {isOddPageNumber ? (
            <>
              <p>{pageNumber}</p>
              <p>Любовь к тебе бесконечна</p>
            </>
          ) : (
            <>
              <p>Аскар Абдрахманов</p>
              <p>{pageNumber}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
