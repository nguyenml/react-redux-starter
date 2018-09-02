import { COLOR_CHANGE } from "../actions/types";

const initialState = {
  colorChange: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COLOR_CHANGE:
      return { ...state, colorChange: !state.colorChange };

    default:
      return state;
  }
}
