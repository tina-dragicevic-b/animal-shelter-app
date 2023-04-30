import axios from "axios";

const url = "http://localhost:3001";

export const postComment = async (comment) => {
    return await axios.post(`${url}/comments`, {...comment})
}

export const getComments = async () => {
    return await axios.get(`${url}/comments`)
}
