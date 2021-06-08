import axios from "axios";

const JSON_HEADERS = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const registerUser = async (body) => {
    return await axios.post("/api/user", JSON.stringify(body), JSON_HEADERS);
};
