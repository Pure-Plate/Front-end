import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./custom-swal.css";
// Create an AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component
function AuthProvider({ children }) {
  // State declarations
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [bookmarks, SetBookmarks] = useState({});
  const [bookmarksToggle, SetBookmarksToggle] = useState(false);
  const [restaurantModalOpen, setRestaurantModalOpen] = useState();
  const [dietToggle, setDietToggle] = useState({
    Vegan: false,
    Halal: false,
    "Gluten-Free": false,
    "Lacto-Free": false,
  });

  const [restaurantNameList, setRestaurantNameList] = useState([]);

  // Effect to log dietToggle state changes
  useEffect(() => {
    console.log(dietToggle);
  }, [dietToggle]);

  const URL = "http://pureplate.site:8000";
  // const URL = "http://127.0.0.1:8000";
  // const URL = "http://pureplate.site:443";

  // Effect to load user data from session storage on component mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");
    const storedBookmarks = JSON.parse(sessionStorage.getItem("bookmarks"));

    if (storedUser && storedToken && storedBookmarks) {
      setUser(storedUser);
      setIsLoggedIn(true);
      setUserToken(storedToken);
      SetBookmarks(storedBookmarks);
    }
  }, []);

  const showSuccessAlert = (username) => {
    Swal.fire({
      title: "You have successfully logged in!", // Alert title
      text: `Hello, ${username}!!`, // Alert contents
      icon: "success", // Alert type (success, error, warning, info, question)
    });
  };

  const showFailAlert = () => {
    Swal.fire({
      title: "Login unsuccessful.", // Alert title
      text: "Please verify your email and password and try again.", // Alert contents
      icon: "error", // Alert type (success, error, warning, info, question)
    });
  };

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post(`${URL}/api/account/login/`, {
        username,
        password,
      });
      setUser(response.data.nickname);
      setIsLoggedIn(true);
      setUserToken(response.data.token);
      sessionStorage.setItem("user", response.data.nickname);
      sessionStorage.setItem("token", response.data.token);
      showSuccessAlert(response.data.nickname);

      await bookmarkGet(response.data.token);
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data);
        showFailAlert();
      } else {
        console.error("An error occurred during the request.", error.message);
      }
      setIsLoggedIn(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setUserToken(null);
    SetBookmarks([]);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("bookmarks");
    SetBookmarksToggle(false);
  };

  // Function to get user bookmarks
  const bookmarkGet = async (token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    try {
      const response = await axios.get(`${URL}/api/favorite/user`, config);
      // Convert received array to object
      const bookmarksObj = response.data.favorites.reduce((acc, cur) => {
        acc[cur.restaurant_id] = cur.restaurant_name;
        return acc;
      }, {});
      // Update state
      SetBookmarks(bookmarksObj);
      sessionStorage.setItem("bookmarks", JSON.stringify(bookmarksObj));
    } catch (error) {
      if (error.response) {
        // When the server returns a response but the status code is out of the 2xx range
        console.error(
          "Server response error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        // When the request is made but no response is received
        console.error(
          "No response from the server. It might be a network issue.",
          error.request
        );
      } else {
        // When an error occurs in setting up the request
        console.error(
          "An error occurred while setting up the request:",
          error.message
        );
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        setUser,
        login,
        logout,
        userToken,
        setUserToken,
        bookmarks,
        bookmarkGet,
        bookmarksToggle,
        SetBookmarksToggle,
        setRestaurantModalOpen,
        restaurantModalOpen,
        URL,
        dietToggle,
        setDietToggle,
        restaurantNameList,
        setRestaurantNameList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
