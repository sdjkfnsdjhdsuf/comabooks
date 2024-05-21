import React from "react";
import { Navigate, useParams } from "react-router-dom";
import FormTemplate from "./FormTemplate";

const FormsWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (id === '664c8b6cee4baadac60d5207') {
    return <Navigate to={`/forms/new/${id}`} replace />;
  }

  return <FormTemplate />;
};

export default FormsWrapper;