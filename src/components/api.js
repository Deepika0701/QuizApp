import axios from "axios";

// Use the proxy path defined in vite.config.js
// const API_URL = "https://api.jsonserve.com/Uw5CrX";

export const fetchQuizData = async () => {
  try {
    const response = await axios.get("/api");
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return null;
  }
};
