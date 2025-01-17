import { useNavigate, useParams, Link } from "react-router-dom";
import "./index.css";
import arrow from "assets/arrow.png";
import Cover from "components/Cover";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { fetchTemplates } from "slicers/templates/template_thrunk";
import { fetchAnswers } from "slicers/answers_slice";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const CoverPage = () => {
  const { id: templateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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

  return (
    <div className="cover-main-page">
      <div className="cover-main-container">
        <Link to={`/forms/${templateId}`}>
          <ArrowBackIosNewIcon className="arrow-icon"/>
        </Link>
        <Cover />
      </div>
    </div>
  );
};
