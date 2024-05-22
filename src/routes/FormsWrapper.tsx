import React from "react";
import { Navigate, useParams } from "react-router-dom";
import FormTemplate from "./FormTemplate";

const FormsWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const templateIds: string[] = ['664c8b6cee4baadac60d5207', '664c8b3f9947d768b3ce7d6d'];

  if (id && templateIds.includes(id)) {
    return <Navigate to={`/forms/new/${id}`} replace />;
  }

  return <FormTemplate />;
};

export default FormsWrapper;
