import { setAlert } from "./alert";
import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    CREATE_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
} from "./types";
import {
    getPosts,
    addALike,
    removeALike,
    deletePost,
    addAPost,
    getPostById,
    addAComment,
    removeAComment,
} from "../API/Post";
import get from "lodash/get";
import { setLoading } from "./loading";

export const getAllPosts = () => async (dispatch) => {
    dispatch(setLoading(true));
    await getPosts()
        .then(({ data }) => {
            dispatch({
                type: GET_POSTS,
                payload: data,
            });
        })
        .catch((e) => {
            dispatch({
                type: POST_ERROR,
                payload: {
                    msg: get(e, "response.statusText"),
                    status: get(e, "response.status"),
                },
            });
        });
    dispatch(setLoading(false));
};

export const getAPost = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    await getPostById(id)
        .then(({ data }) => {
            dispatch({
                type: GET_POST,
                payload: data,
            });
        })
        .catch((e) => {
            dispatch({
                type: POST_ERROR,
                payload: {
                    msg: get(e, "response.statusText"),
                    status: get(e, "response.status"),
                },
            });
        });
    dispatch(setLoading(false));
};

export const likeAPost = (postId) => async (dispatch) => {
    dispatch(setLoading(true));
    await addALike(postId)
        .then(({ data }) => {
            dispatch({
                type: UPDATE_LIKES,
                payload: { id: postId, likes: data },
            });
        })
        .catch((e) => {
            dispatch({
                type: POST_ERROR,
                payload: {
                    msg: get(e, "response.statusText"),
                    status: get(e, "response.status"),
                },
            });
        });
    dispatch(setLoading(false));
};

export const unlikeAPost = (postId) => async (dispatch) => {
    dispatch(setLoading(true));
    await removeALike(postId)
        .then(({ data }) => {
            dispatch({
                type: UPDATE_LIKES,
                payload: { id: postId, likes: data },
            });
        })
        .catch((e) => {
            dispatch({
                type: POST_ERROR,
                payload: {
                    msg: get(e, "response.statusText"),
                    status: get(e, "response.status"),
                },
            });
        });
    dispatch(setLoading(false));
};

export const deleteAPost = (postId) => async (dispatch) => {
    dispatch(setLoading(true));
    await deletePost(postId)
        .then(() => {
            dispatch({
                type: DELETE_POST,
                payload: postId,
            });
            dispatch(setAlert("Post Removed", "success"));
        })
        .catch((e) => {
            dispatch({
                type: POST_ERROR,
                payload: {
                    msg: get(e, "response.statusText"),
                    status: get(e, "response.status"),
                },
            });
        });
    dispatch(setLoading(false));
};

export const createPost = (formData) => async (dispatch) => {
    dispatch(setLoading(true));
    await addAPost(formData)
        .then(({ data }) => {
            dispatch({
                type: CREATE_POST,
                payload: data,
            });
            dispatch(setAlert("Post Created", "success"));
        })
        .catch((e) => {
            dispatch({
                type: POST_ERROR,
                payload: {
                    msg: get(e, "response.statusText"),
                    status: get(e, "response.status"),
                },
            });
        });
    dispatch(setLoading(false));
};

export const addComment = (id, formData) => async (dispatch) => {
    dispatch(setLoading(true));
    await addAComment(id, formData)
        .then(({ data }) => {
            dispatch({
                type: ADD_COMMENT,
                payload: data,
            });
            dispatch(setAlert("Comment Added", "success"));
        })
        .catch((e) => {
            dispatch({
                type: POST_ERROR,
                payload: {
                    msg: get(e, "response.statusText"),
                    status: get(e, "response.status"),
                },
            });
        });
    dispatch(setLoading(false));
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
    dispatch(setLoading(true));
    await removeAComment(postId, commentId)
        .then(() => {
            dispatch({
                type: REMOVE_COMMENT,
                payload: commentId,
            });
            dispatch(setAlert("Comment Deleted", "success"));
        })
        .catch((e) => {
            dispatch({
                type: POST_ERROR,
                payload: {
                    msg: get(e, "response.statusText"),
                    status: get(e, "response.status"),
                },
            });
        });
    dispatch(setLoading(false));
};
