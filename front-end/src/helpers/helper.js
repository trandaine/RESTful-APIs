import axios from "axios";

const baseURL = "http://localhost:3000/words/";
const userURL = "http://localhost:3000/user/";

const handleError =
  (fn) =>
  (...params) =>
    fn(...params).catch((error) => {
      console.log(error);
    });

export const api = {
  getWord: handleError(async (id) => {
    const res = await axios.get(baseURL + id);
    return res.data;
  }),
  getWords: handleError(async () => {
    const res = await axios.get(baseURL);
    return res.data;
  }),
  deleteWord: handleError(async (id) => {
    const res = await axios.delete(baseURL + id);
    return res.data;
  }),
  createWord: handleError(async (payload) => {
    const res = await axios.post(baseURL, payload);
    return res.data;
  }),
  updateWord: handleError(async (payload) => {
    const res = await axios.put(baseURL + payload._id, payload);
    return res.data;
  }),
  async loginUser(credentials) {
    try {
      const response = await axios.post(userURL + "login", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  async createUser(user) {
    try {
      const response = await axios.post(userURL + "register", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
      throw error;
    }
  },


  async logoutUser() {
    try {
      const response = await axios.post(userURL + "logout", {}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error logging out:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  async getUser() {
    try {
      const response = await axios.get(userURL + "me", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      throw error;
    }
  },
};