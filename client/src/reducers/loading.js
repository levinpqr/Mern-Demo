import { SET_LOADING, UNSET_LOADING } from "../actions/types";

export default function loading (state = { flag: false }, action) {
    const { type } = action;
    switch (type) {
        case SET_LOADING:
            return { ...state, flag: true };
        case UNSET_LOADING:
            return { ...state, flag: false };
        default:
            return { ...state, flag: false };
    }
}
