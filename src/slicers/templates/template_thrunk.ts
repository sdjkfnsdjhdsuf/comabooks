import { createAsyncThunk } from "@reduxjs/toolkit";
import { TemplateService } from "generated";

// TemaplteThrunl

export const fetchTemplates = createAsyncThunk("temapltes/fetch", async () => {
  const responseQuestions = await TemplateService.templateControllerGetTemplate(
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return responseQuestions;
});
