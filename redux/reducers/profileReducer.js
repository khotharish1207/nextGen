import { SET_PROFILE } from "../actions/actions";

const INITIAL_STATE = {};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {

        case SET_PROFILE:
            return { ...state, [payload.userId]: payload };

        default:
            return state;
    }
};

export default reducer;
