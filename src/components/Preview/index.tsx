import React, { useEffect } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { switchPreview } from "slicers/preview_slicer";
import { CoverEntityDto } from "generated";

// interface PreviewProps {

//   onClose: () => void;
//   question: string;
//   answer: string;
//   pageNumber: number;
// }

const MAX_CHARS_PER_PAGE = 280;

const splitAnswerIntoPages = (answer: string): string[] => {
  const words = answer.split(/\s+/);
  let currentPage = "";
  let pages: string[] = [];

  words.forEach((word) => {
    if ((currentPage + word).length > MAX_CHARS_PER_PAGE) {
      pages.push(currentPage.trim());
      currentPage = word + " ";
    } else {
      currentPage += word + " ";
    }
  });

  if (currentPage.trim()) {
    pages.push(currentPage.trim());
  }

  return pages;
};

export const Preview = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const answerPages = splitAnswerIntoPages(answer);
  const pageNumber = useSelector<RootState, number>(
    (state) => state.page.value ?? 0
  );
  const coverData = useSelector<RootState, CoverEntityDto | null>(
    (state) => state.cover.value
  );
  const isOddPageNumber = pageNumber % 2 !== 0;

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dispatch(switchPreview(false));
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  

  return (
    <div
      className="book-preview-backdrop"
      onClick={() => dispatch(switchPreview(false))}
    >
      {answerPages.map((pageContent, index) => (
        <div
          key={index}
          className="book-preview-content"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="preview-question">{question}</p>
          <p className="preview-answer">{pageContent}</p>
          <div className="preview-colon">
            {isOddPageNumber ? (
              <>
                <p>{pageNumber + index + 1}</p>
                <p>{coverData?.bookName || "\u00A0"}</p>
              </>
            ) : (
              <>
                <p>{coverData?.fullName || "\u00A0"}</p>
                <p>{pageNumber + index + 1}</p>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Preview;
