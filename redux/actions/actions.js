import { createAction } from "redux-actions";

export const ACTION = "ACTION";
export const action = createAction(ACTION);


export const SAGA_ACTION = "SAGA_ACTION";
export const sagaAction = createAction(SAGA_ACTION);

export const SET_LOCALE = "SET_LOCALE";
export const setLocale = createAction(SET_LOCALE);

