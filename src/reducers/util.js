import { OPEN_YES_NO_DIALOG, CLOSE_YES_NO_DIALOG } from "../actions";

const intialState = {
  openYesNoDialog: false,
  yesNoTitle: "",
  yesNoAction: null
};

const util = (state = intialState, action) => {
  switch (action.type) {
    case OPEN_YES_NO_DIALOG:
      return {
        ...state,
        openYesNoDialog: true,
        yesNoTitle: action.title,
        yesNoAction: action.action
      };

    case CLOSE_YES_NO_DIALOG:
      return {
        ...state,
        openYesNoDialog: false,
        yesNoTitle: "",
        yesNoAction: null
      };

    default:
      return state;
  }
};

export default util;
