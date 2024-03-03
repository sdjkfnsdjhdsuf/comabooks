import { useEffect } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchTemplates } from "slicers/templates/template_thrunk";
import { fetchAnswers } from "answers_slice";
import NavbarLoginned from "components/NavbarLoginned";
import NavbarLoginnedMobile from "components/NavbarLoginnedMobile";
import Cover from "components/Cover";
import AddPhoto from "components/AddPhoto";
import QuestionForm from "components/QuestionForm";
import nexticon from "assets/nexticon.png";
import backicon from "assets/backicon.png";
import { TempalteResponceDto } from "generated";
import { thunkSetPage } from "slicers/page_slicer";

function FormTemplate() {
  const { id: templateId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector<RootState, number>(
    (state) => state.page.value
  );
  const isLoading = useSelector<RootState, boolean>(
    (state) => state.activeAnswers.loading || state.templates.loading
  );
  const templateDto = useSelector<RootState, TempalteResponceDto | undefined>(
    (state) => {
      console.log("WEll");
      console.log(state.templates.templates);
      return state.templates.templates.find((val) => val._id == templateId);
    }
  );

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log("GO PAGE /");
      navigate("/", {
        replace: true,
      });
      return;
    }
    if (!templateId) navigate("/forms");
    dispatch(fetchTemplates());
    dispatch(fetchAnswers(templateId ?? ""));
  }, [dispatch]);
  if (templateId == null) return <></>;
  if (templateDto == null) return <></>;
  if (isLoading) return <></>;
  //   return <></>;
  console.log(currentPage);
  return (
    <div className="forms-page">
      <div className="navbarLoginned">
        <NavbarLoginned
          templateId={templateId!}
          onEditCover={() => {}}
          onToggleView={() => {}}
        />
      </div>
      {/* <div className="navbarLoginnedMobile">
        <NavbarLoginnedMobile
          setCurrentPage={handleSetCurrentPage}
          questions={questionTempalteDto}
          pagesFilled={getPageFilled(questionTempalteDto, answersDto)}
          currentPage={currentPage}
          onEditCover={() => setShowCoverEditor(true)}
        />
      </div> */}
      <div className="forms-container">
        {false ? (
          <Cover />
        ) : false ? (
          <AddPhoto />
        ) : (
          <>
            <QuestionForm
              key={templateDto.questions[currentPage]?._id ?? ""}
              question={templateDto.questions[currentPage]}
              pageNumber={currentPage}
            />

            <div className="pagination-controls">
              <button
                onClick={() =>
                  dispatch(thunkSetPage(Math.max(currentPage - 1, 0)))
                }
                disabled={currentPage === 1}
              >
                <img src={backicon} alt="Back" className="back-icon" />
              </button>
              <button
                onClick={() =>
                  dispatch(
                    thunkSetPage(
                      Math.max(
                        currentPage - 1,
                        templateDto.questions.length - 1
                      )
                    )
                  )
                }
                disabled={currentPage === templateDto.questions.length}
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

export default FormTemplate;
