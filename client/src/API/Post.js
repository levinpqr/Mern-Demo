import axios from "axios";

const JSON_HEADERS = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const getPosts = async () => {
    return await axios.get("/api/user-post");
};

export const getPostById = async (id) => {
    return await axios.get(`/api/user-post/${id}`);
};

export const addAPost = async (data) => {
    return await axios.post(`/api/user-post`, JSON.stringify(data), JSON_HEADERS);
};

export const addALike = async (id) => {
    return await axios.put(`/api/user-post/like/${id}`, JSON_HEADERS);
};

export const removeALike = async (id) => {
    return await axios.put(`/api/user-post/unlike/${id}`, JSON_HEADERS);
};

export const deletePost = async (id) => {
    return await axios.delete(`/api/user-post/${id}`, JSON_HEADERS);
};

export const addAComment = async (postId, formData) => {
    return await axios.post(
        `/api/user-post/${postId}/comment`,
        JSON.stringify(formData),
        JSON_HEADERS
    );
};

export const removeAComment = async (postId, commentId) => {
    return await axios.delete(`/api/user-post/${postId}/comment/${commentId}`);
};
