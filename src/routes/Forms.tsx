import React, { useEffect, useState } from "react";
import NavbarLoginned from "../components/NavbarLoginned";
import NavbarLoginnedMobile from "../components/NavbarLoginnedMobile";
import Cover from "../components/Cover";

import "./Forms.css";
import nexticon from "assets/nexticon.png";
import backicon from "assets/backicon.png";
import QuestionForm from "../components/QuestionForm";
import axios from "axios";
import {
  AnswerEntityDto,
  AnswerService,
  QuestionTemplateDto,
  TempalteResponceDto,
  TemplateService,
} from "generated";

const getPageFilled = (
  questionTemplateDto: QuestionTemplateDto[],
  answersDto: Record<string, AnswerEntityDto>
) => {
  return questionTemplateDto.reduce((totalPages, val) => {
    const wordCount = (answersDto[val._id]?.answer ?? "")
      .split(/\s+/)
      .filter(Boolean).length;
    return totalPages + (wordCount > 0 ? Math.ceil(wordCount / 60) : 0);
  }, 0);
};
const questionsPerPage = 1;

function Forms() {
  const [currentPage, setCurrentPage] = useState(1);
  const [answersDto, setAnswersDTO] = useState<Record<string, AnswerEntityDto>>(
    {}
  );
  const [questionTempalteDto, setQuestionTempalteDto] = useState<
    QuestionTemplateDto[]
  >([]);

  const getAnswerAsArray = (): AnswerEntityDto[] => {
    return questionTempalteDto.map(
      (val) =>
        answersDto[val._id] ?? {
          _id: "",
          questionId: val._id,
          answer: "",
          templateId: "",
          userId: "",
        }
    );
  };
  const [showCoverEditor, setShowCoverEditor] = useState(false);

  const totalPages = Math.ceil(questionTempalteDto.length / questionsPerPage);

  const handleSetCurrentPage = (page: number) => {
    setCurrentPage(page);
    setShowCoverEditor(false);
  };

  const fetchData = async () => {
    try {
      const responseQuestions =
        await TemplateService.templateControllerGetTemplate({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      const responseAnswers =
        await AnswerService.answersControllerGetMyAnswersByTemplate(
          {
            id: responseQuestions[0]._id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

      setQuestionTempalteDto(responseQuestions[0].questions);
      setAnswersDTO(
        responseAnswers.reduce<Record<string, AnswerEntityDto>>((prev, val) => {
          prev[val.questionId] = val;
          return prev;
        }, {})
      );
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (questionTempalteDto.length == 0) return <></>;
  return (
    <div className="forms-page">
      <div className="navbarLoginned">
        <NavbarLoginned
          setCurrentPage={handleSetCurrentPage}
          questions={questionTempalteDto}
          pagesFilled={getPageFilled(questionTempalteDto, answersDto)}
          answers={getAnswerAsArray()}
          currentPage={currentPage}
          onEditCover={() => setShowCoverEditor(true)}
        />
      </div>
      <div className="navbarLoginnedMobile">
        <NavbarLoginnedMobile
          setCurrentPage={handleSetCurrentPage}
          questions={questionTempalteDto}
          pagesFilled={getPageFilled(questionTempalteDto, answersDto)}
          answers={getAnswerAsArray()}
          currentPage={currentPage}
          onEditCover={() => setShowCoverEditor(true)}
        />
      </div>
      <div className="forms-container">
        {showCoverEditor ? (
          <Cover />
        ) : (
          <>
            <QuestionForm
              key={questionTempalteDto[currentPage - 1]._id}
              question={questionTempalteDto[currentPage - 1]}
              answer={getAnswerAsArray()[currentPage - 1]}
              pageNumber={currentPage}
            />

            <div className="pagination-controls">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <img src={backicon} alt="Back" className="back-icon" />
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <img src={nexticon} alt="Next" className="next-icon" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Forms;
