export const loginUser = async (credentials) => {
  try {
    // Replace with your real backend login endpoint API call
    // const response = await axios.post('/api/login', credentials);
    // const { token, user } = response.data;

    // Simulate successful backend server response payload
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (mock_jwt_token)";
    const user = {
      username: "@current_user",
      name: "Current User",
      avatar: "https://picsum.photos/300"
    };

    // Save strings into persistent browser memory vault
    localStorage.setItem("auth_token", token);
    localStorage.setItem("logged_in_user", JSON.stringify(user));

    return { token, user };
  } catch (error) {
    console.error("Login authorization failed:", error);
    throw error;
  }
};