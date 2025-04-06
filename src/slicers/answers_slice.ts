import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AnswerEntityDto, AnswerService, TemplateService } from "generated";

export interface AnswersSliceState {
  answers: Record<string, AnswerEntityDto>;
  loading: boolean;
}

export const answersSlice = createSlice({
  name: "activeAnswers",
  initialState: {
    answers: {},
    loading: false,
  } as AnswersSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        state.answers = action.payload.reduce(
          (prev, newVal) => ({
            ...prev,
            [newVal.questionId]: newVal,
          }),
          {}
        );
        state.loading = false;
      })
      .addCase(setAnswers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(setAnswers.fulfilled, (state, action) => {
        const payload = action.payload;

        state.answers[payload.questionId] = payload;
        state.loading = false;
      });
  },
});

export const fetchAnswers = createAsyncThunk(
  "answers/fetch",
  async (templateId: string) => {
    const responseAnswers =
      await AnswerService.answersControllerGetMyAnswersByTemplate(
        { id: templateId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    return responseAnswers;
  }
);

export const setAnswers = createAsyncThunk(
  "answers/set",
  async (payload: { questionId: string; text: string, clientQuestion: string }) => {
    const { questionId, text, clientQuestion } = payload;
    const newAnswer = await AnswerService.answersControllerEditAnswer(
      {
        id: questionId,
        body: {
          questionMessage: text,
          clientQuestion: clientQuestion
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return newAnswer;
  }
);
