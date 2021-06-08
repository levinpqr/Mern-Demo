import { setAlert } from "./alert";
import {
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    GET_REPOS,
} from "./types";
import {
    getMyProfile,
    createOrEditProfile,
    addProfileExperience,
    addProfileEducation,
    removeEducation,
    removeExperience,
    removeAccount,
    getProfiles,
    getProfileByUserId,
    getGithubRepos,
} from "../API/Profile";
import { setLoading } from "./loading";
import get from "lodash/get";

export const getCurrentProfile = () => async (dispatch) => {
    dispatch(setLoading(true));
    await getMyProfile()
        .then(({ data }) => {
            Object.assign(data, {
                user_details: data.user_id,
                user_id: undefined,
            });
            dispatch({
                type: GET_PROFILE,
                payload: data,
            });
        })
        .catch((e) => {
            console.log(e);
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: e.response.statusText,
                    status: e.response.status,
                },
            });
            dispatch({
                type: CLEAR_PROFILE,
            });
        });
    dispatch(setLoading(false));
};

export const createUpdateProfile = (formData, history, edit = false) => async (
    dispatch
) => {
    dispatch(setLoading(true));

    await createOrEditProfile(formData)
        .then((res) => {
            const msg = edit ? "Profile Updated" : "Profile Created";
            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            });
            dispatch(setAlert(msg, "success"));
            if (!edit) history.push("/dashboard");
        })
        .catch((e) => {
            const errors = get(e, "response.data.errors", []);
            if (Array.isArray(errors) && errors.length) {
                errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: get(e, "response.statusText"),
                    status: get(e, "response.status"),
                },
            });
        });

    dispatch(setLoading(false));
};

export const addExperience = (formData, history) => async (dispatch) => {
    dispatch(setLoading(true));
    await addProfileExperience(formData)
        .then(({ data }) => {
            dispatch({
                type: UPDATE_PROFILE,
                payload: data,
            });
            dispatch(setAlert("Experience Added", "success"));
            history.push("/dashboard");
        })
        .catch((e) => {
            const errors = get(e, "response.data.errors", []);
            if (Array.isArray(errors) && errors.length) {
                errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: get(e, "response.statusText"),
                    status: get(e, "response.status"),
                },
            });
        });

    dispatch(setLoading(false));
};

export const addEducation = (formData, history) => async (dispatch) => {
    dispatch(setLoading(true));
    await addProfileEducation(formData)
        .then(({ data }) => {
            dispatch({
                type: UPDATE_PROFILE,
                payload: data,
            });
            dispatch(setAlert("Education Added", "success"));
            history.push("/dashboard");
        })
        .catch((e) => {
            const errors = get(e, "response.data.errors", []);
            if (Array.isArray(errors) && errors.length) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
                errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: get(e, "response.statusText"),
                    status: get(e, "response.status"),
                },
            });
        });

    dispatch(setLoading(false));
};

export const deleteExperience = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    await removeExperience(id)
        .then(({ data }) => {
            dispatch({
                type: UPDATE_PROFILE,
                payload: data,
            });
            dispatch(setAlert("Experience removed", "success"));
        })
        .catch((e) => {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: get(e, "response.statusText"),
                    status: get(e, "response.status"),
                },
            });
        });
    dispatch(setLoading(false));
};

export const deleteEducation = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    await removeEducation(id)
        .then(({ data }) => {
            dispatch({
                type: UPDATE_PROFILE,
                payload: data,
            });
            dispatch(setAlert("Education removed", "success"));
        })
        .catch((e) => {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: get(e, "response.statusText"),
                    status: get(e, "response.status"),
                },
            });
        });
    dispatch(setLoading(false));
};

export const deleteAccount = () => async (dispatch) => {
    if (window.confirm("Are you sure you want to delete your account?")) {
        dispatch(setLoading(true));
        await removeAccount()
            .then(({ data }) => {
                dispatch({ type: CLEAR_PROFILE });
                dispatch({ type: ACCOUNT_DELETED });
                dispatch(setAlert("Your account has been permanently deleted"));
            })
            .catch((e) => {
                dispatch({
                    type: PROFILE_ERROR,
                    payload: {
                        msg: get(e, "response.statusText"),
                        status: get(e, "response.status"),
                    },
                });
            });
        dispatch(setLoading(false));
    }
};

export const getAllProfiles = () => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch({ type: CLEAR_PROFILE });

    await getProfiles()
        .then(({ data }) => {
            data.forEach((usr) => {
                Object.assign(usr, { user_details: usr.user_id });
                delete usr.user_id;
            });
            dispatch({ type: GET_PROFILES, payload: data });
        })
        .catch((e) => {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: get(e, "response.statusText"),
                    status: get(e, "response.status"),
                },
            });
        });

    dispatch(setLoading(false));
};

export const getProfileByUsrId = (id) => async (dispatch) => {
    dispatch(setLoading(true));

    await getProfileByUserId(id)
        .then(({ data }) => {
            Object.assign(data, {
                user_details: data.user_id,
                user_id: undefined,
            });
            dispatch({ type: GET_PROFILE, payload: data });
        })
        .catch((e) => {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: get(e, "response.statusText"),
                    status: get(e, "response.status"),
                },
            });
        });

    dispatch(setLoading(false));
};

export const getUserGithubRepositories = (username) => async (dispatch) => {
    dispatch(setLoading(true));

    await getGithubRepos(username)
        .then(({ data }) => dispatch({ type: GET_REPOS, payload: data }))
        .catch((e) => {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: get(e, "response.statusText"),
                    status: get(e, "response.status"),
                },
            });
        });

    dispatch(setLoading(false));
};
