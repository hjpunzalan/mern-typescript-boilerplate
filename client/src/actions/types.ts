import { IRegisterUser } from "./users";

export enum ActionTypes {
  // unique val
  // KEY[0] = 0,
  // KEY[1] = 1
  registerUser
}

export type Action = IRegisterUser;
