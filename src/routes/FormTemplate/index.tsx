import { useEffect } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchTemplates } from "slicers/templates/template_thrunk";
import { fetchAnswers } from "slicers/answers_slice";
import NavbarLoginned from "components/NavbarLoginned";
import NavbarLoginnedMobile from "components/NavbarLoginned/mobile/NavbarLoginnedMobile";
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
  const currentPage = useSelector<RootState, number | null>((state) => {
    return state.page.value;
  });

  if (currentPage == null) {
    dispatch(thunkSetPage(0));
  }
  
  const templateDto = useSelector<RootState, TempalteResponceDto | undefined>(
    (state) => {
      return state.templates.templates.find((val) => val._id == templateId);
    }
  );

  useEffect(() => {
    if (!localStorage.getItem("token")) {
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
  // if (isLoading) return <></>;

  return (
    <div className="forms-page">
      <div className="navbarLoginned">
        <NavbarLoginned templateId={templateId!} />
      </div>
      <div className="navbarLoginnedMobile">
        <NavbarLoginnedMobile templateId={templateId!} />
      </div>
      <div className="forms-container">
        {false ? (
          <Cover />
        ) : false ? (
          <AddPhoto />
        ) : (
          <>
            <QuestionForm
              key={templateDto.questions[currentPage ?? 0]?._id ?? ""}
              question={templateDto.questions[currentPage ?? 0]}
            />

            <div className="pagination-controls">
              <button
                onClick={() =>
                  dispatch(thunkSetPage(Math.max((currentPage ?? 0) - 1, 0)))
                }
                disabled={currentPage == 0}
              >
                <img src={backicon} alt="Back" className="back-icon" />
              </button>
              <button
                onClick={() =>
                  dispatch(
                    thunkSetPage(
                      Math.min(
                        (currentPage ?? 0) + 1,
                        templateDto.questions.length - 1
                      )
                    )
                  )
                }
                disabled={currentPage === templateDto.questions.length - 1}
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
