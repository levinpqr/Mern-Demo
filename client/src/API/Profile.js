import axios from "axios";

const JSON_HEADERS = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const getMyProfile = async () => {
    return await axios.get("/api/user-profile/me");
};

export const createOrEditProfile = async (payload) => {
    return await axios.post("/api/user-profile", JSON.stringify(payload), JSON_HEADERS);
};

export const addProfileExperience = async (payload) => {
    return await axios.put(
        "/api/user-profile/experience",
        JSON.stringify(payload),
        JSON_HEADERS
    );
};

export const addProfileEducation = async (payload) => {
    return await axios.put(
        "/api/user-profile/education",
        JSON.stringify(payload),
        JSON_HEADERS
    );
};

export const removeExperience = async (id) => {
    return await axios.delete("/api/user-profile/experience/" + id);
};

export const removeEducation = async (id) => {
    return await axios.delete("/api/user-profile/education/" + id);
};

export const removeAccount = async (id) => {
    return await axios.delete("/api/user-profile");
};

export const getProfiles = async () => {
    return await axios.get("/api/user-profile");
};

export const getProfileByUserId = async (id) => {
    return await axios.get("/api/user-profile/user/" + id);
};

export const getGithubRepos = async (username) => {
    return await axios.get("/api/user-profile/github/" + username);
};
