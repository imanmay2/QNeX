// ping.js
const axios = require("axios");

// Replace with your actual Render service URL
const URL = "https://qnex.onrender.com/";

const pingServer = async () => {
  try {
    const res = await axios.get(URL);
    console.log(`[${new Date().toLocaleString()}] Status Code: ${res.status}`);
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] Error: ${error.message}`);
  }
};

// Run immediately and then every 13 minutes
pingServer();
setInterval(pingServer, 13 * 60 * 1000); // 13 mins in milliseconds
