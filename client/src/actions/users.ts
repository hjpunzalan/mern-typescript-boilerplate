import { ActionTypes } from "./types";
import axios from "axios";
import { Dispatch } from "redux";

export interface IUser {
  id: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  email: string;
}

export interface IRegisterUser {
  type: ActionTypes.registerUser;
  payload: IUser;
}

export const registerUser = () => async (dispatch: Dispatch) => {
  const res = await axios.get<IUser>("/api/users/api");
  dispatch<IRegisterUser>({
    type: ActionTypes.registerUser,
    payload: res.data
  });
};
