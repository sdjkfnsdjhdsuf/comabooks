import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemplates } from "slicers/templates/template_thrunk";
import { AppDispatch, RootState } from "store";
import { TempalteResponceDto } from "generated";

import "./Forms.css";

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
  }, [dispatch, navigate]);

  const templateDto = useSelector<RootState, TempalteResponceDto[] | null>(
    (state) => {
      if (state.templates.loading) return null;
      return state.templates.templates;
    }
  );

  const templateIds: string[] = ['664c8b6cee4baadac60d5207', '664b85f9f88f1b24892d6716'];

  useEffect(() => {
    if (templateDto != null) {
      if (templateDto.length === 1) {
        const templateId = templateDto[0]._id;
        if (templateIds.includes(templateId)) {
          navigate(`new/${templateId}`);
        } else {
          navigate(templateId);
        }
      }
    }
  }, [templateDto, navigate, templateIds]);

  return <div></div>;
}

export default Forms;
