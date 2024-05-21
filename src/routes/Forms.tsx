import { useEffect } from "react";

import "./Forms.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemplates } from "slicers/templates/template_thrunk";
import { AppDispatch, RootState } from "store";
import { TempalteResponceDto } from "generated";

function Forms() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/", {
        replace: true,
      });
      return;
    }

    dispatch(fetchTemplates());
  }, [dispatch]);

  const templateDto = useSelector<RootState, TempalteResponceDto[] | null>(
    (state) => {
      if (state.templates.loading) return null;
      return state.templates.templates;
    }
  );
  if (templateDto != null) {
    if (templateDto.length == 1) {
      if (templateDto[0]._id === '664c8b6cee4baadac60d5207') {
        navigate(`new/${templateDto[0]._id}`);
      } else {
        navigate(templateDto[0]._id);
      }
    }
  }

  return <div></div>;
}

export default Forms;
