import { action, makeAutoObservable } from "mobx";

interface ErrorData {
  status?: number;
  text?: string;
}

export class ErrorStore {
  error: ErrorData = {};

  constructor() {
    makeAutoObservable(this);
  }

  setError = action((data: ErrorData) => {
    this.error = data;
  });
}
