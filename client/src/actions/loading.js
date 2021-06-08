import { SET_LOADING, UNSET_LOADING } from "./types";

export const setLoading = (bool) => (dispatch) => {
    dispatch({
        type: bool ? SET_LOADING : UNSET_LOADING,
    });
};
