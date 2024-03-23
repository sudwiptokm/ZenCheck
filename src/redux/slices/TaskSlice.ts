import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TaskDTO } from "../../models/task/TaskSchema";
import { DummyTaskData } from "../../utils/data";
import { RootState } from "../store";

const initialState: TaskDTO[] = DummyTaskData;

export const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskDTO>) => {
      state.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<TaskDTO>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      state[index] = action.payload;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter((task) => task.id !== action.payload);
    },
    addSubTask: (state, action: PayloadAction<TaskDTO>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index].subTasks!.push(action.payload);
      }
    },
    deleteSubTask: (
      state,
      action: PayloadAction<{ taskId: string; subTaskId: string }>,
    ) => {
      const taskIndex = state.findIndex(
        (task) => task.id === action.payload.taskId,
      );
      if (taskIndex !== -1) {
        state[taskIndex].subTasks = state[taskIndex].subTasks!.filter(
          (subTask) => subTask.id !== action.payload.subTaskId,
        );
      }
    },
    deleteNote: (
      state,
      action: PayloadAction<{ taskId: string; noteId: number }>,
    ) => {
      const taskIndex = state.findIndex(
        (task) => task.id === action.payload.taskId,
      );
      if (taskIndex !== -1) {
        state[taskIndex].notes = state[taskIndex].notes!.filter(
          (note, idx) => idx !== action.payload.noteId,
        );
      }
    },

    addNote: (
      state,
      action: PayloadAction<{ taskId: string; note: string }>,
    ) => {
      const taskIndex = state.findIndex(
        (task) => task.id === action.payload.taskId,
      );
      if (taskIndex !== -1) {
        state[taskIndex].notes!.push(action.payload.note);
      }
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  addSubTask,
  deleteSubTask,
  addNote,
  deleteNote,
} = TaskSlice.actions;

export default TaskSlice.reducer;

export const selectAllTasks = (state: RootState) => state.tasks;
export const selectSingleTask = (state: RootState, id: string) =>
  state.tasks.find((task) => task.id === id);
