const axios = require("axios");

const API_BASE_URL = "http://20.244.56.144/test"; // Base URL of the test server API
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3ODI3NzU1LCJpYXQiOjE3MTc4Mjc0NTUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjRjY2Q1ZjQ5LTc1MDUtNDdhMS1hY2VkLTgwOTFjZDA2ZmMyMCIsInN1YiI6InBhbmRleWFkaXR5YTg3MDdAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiQWRpdHlhQmlybGEiLCJjbGllbnRJRCI6IjRjY2Q1ZjQ5LTc1MDUtNDdhMS1hY2VkLTgwOTFjZDA2ZmMyMCIsImNsaWVudFNlY3JldCI6IkRYaUJzY2tGUHdXREZmVXoiLCJvd25lck5hbWUiOiJBZGl0eWEiLCJvd25lckVtYWlsIjoicGFuZGV5YWRpdHlhODcwN0BnbWFpbC5jb20iLCJyb2xsTm8iOiIyMTAwMjcxNTMwMDA3In0.VLw40DQrAcVpXgr2EQXmAPYMbN0L7ayQ8367SmmF1e0";

const fetchNumber = async (numberid) => {
  let apiUrl;

  switch (numberid) {
    case "p": // Prime numbers
      apiUrl = `${API_BASE_URL}/primes`;
      break;
    case "f": // Fibonacci numbers
      apiUrl = `${API_BASE_URL}/fibo`;
      break;
    case "e": // Even numbers
      apiUrl = `${API_BASE_URL}/even`;
      break;
    case "r": // Random numbers
      apiUrl = `${API_BASE_URL}/random`;
      break;
    default:
      throw new Error("Invalid number ID");
  }

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      timeout: 500,
    });

    if (response.data && response.data.numbers) {
      const numbers = response.data.numbers;
      return numbers[Math.floor(Math.random() * numbers.length)];
    } else {
      throw new Error("Invalid response from third-party API");
    }
  } catch (error) {
    console.error("Error fetching number:", error.message);
    throw new Error("Failed to fetch number from third-party API");
  }
};

const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

module.exports = { fetchNumber, calculateAverage };
