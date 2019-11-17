import { ActionTypes, IUser, Action } from "../actions";

const initialState: IUser[] = [];

export const userReducer = (state = initialState, action: Action) => {
  // Switch statements acts as type guard which determines unique action union
  switch (action.type) {
    case ActionTypes.registerUser:
      return action.payload;
    default:
      return state;
  }
};
