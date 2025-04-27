import { create } from "zustand";

const useTodoStore = create(() => ({
  todos: [],
}));

export default useTodoStore;
