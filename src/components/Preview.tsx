import React from "react";
import "./Preview.css";

interface PreviewProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  answer: string;
  pageNumber: number;
}

const MAX_CHARS_PER_PAGE = 380;

const splitAnswerIntoPages = (answer: string): string[] => {
  const words = answer.split(/\s+/);
  let currentPage = '';
  let pages: string[] = [];

  words.forEach(word => {

    if ((currentPage + word).length > MAX_CHARS_PER_PAGE) {
      pages.push(currentPage.trim());
      currentPage = word + ' ';
    } else {
      currentPage += word + ' ';
    }
  });


  if (currentPage.trim()) {
    pages.push(currentPage.trim());
  }

  return pages;
};

export const Preview: React.FC<PreviewProps> = ({
  isOpen,
  onClose,
  question,
  answer,
  pageNumber,
}) => {
  if (!isOpen) return null;

  const answerPages = splitAnswerIntoPages(answer);
  const isOddPageNumber = pageNumber % 2 !== 0;

  return (
    <div className="book-preview-backdrop" onClick={onClose}>
      {answerPages.map((pageContent, index) => (
        <div key={index} className="book-preview-content" onClick={(e) => e.stopPropagation()}>
          <p className="preview-question">{question}</p>
          <p className="preview-answer">{pageContent}</p>
          <div className="preview-colon">
            {isOddPageNumber ? (
              <>
                <p>{pageNumber + index}</p>
                <p>Любовь к тебе бесконечна</p>
              </>
            ) : (
              <>
                <p>Аскар Абдрахманов</p>
                <p>{pageNumber + index}</p>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Preview;
