import axios from "axios";

const JSON_HEADERS = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const getUserByToken = async () => {
    return await axios.get("/api/auth");
};

export const loginUser = async (body) => {
    return await axios.post("/api/auth", JSON.stringify(body), JSON_HEADERS);
};
