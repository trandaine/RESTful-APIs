import axios from "axios";

const baseURL = "http://localhost:3000/words";

const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    console.error("Error:", error);
  });

export const api = {
    getWord: handleError(async id => {
        const response = await axios.get(baseURL + id);
        return response.data;
    }),
    getWords: handleError(async () => {
        const response = await axios.get(baseURL);
        return response.data;
    }),
    deleteWords: handleError(async id => {
        const response = await axios.delete(baseURL + id);
        return response.data;
    }),
    createWord: handleError(async payload => {
        const response = await axios.post(baseURL, payload);
        return response.data;
    }),
    updateWord: handleError(async (id, payload) => {
        const response = await axios.put(baseURL + payload._id, payload);
        return response.data;
    })
};
