// src/context/GeneralContext.js
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // ====================== State ======================
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // ================== Axios interceptor ==================
  // Automatically attach JWT to all Axios requests
  axios.interceptors.request.use((config) => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      config.headers.Authorization = `Bearer ${storedToken}`;
    }
    return config;
  });

  // ================== Fetch cart count ==================
  const fetchCartCount = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const response = await axios.get(
        "http://localhost:6001/api/cart/fetch-cart"
      );
      const count = response.data.filter(
        (item) => item.userId === userId
      ).length;
      setCartCount(count);
    } catch (err) {
      console.error("Cart fetch error:", err.response?.data || err.message);
    }
  };

  // Fetch cart count on load or when token changes
  useEffect(() => {
    if (token) fetchCartCount();
  }, [token]);

  // ================== Search handler ==================
  const handleSearch = () => {
    navigate("#products-body"); // Example scroll to products
  };

  // ================== LOGIN ==================
  const login = async () => {
    if (!email || !password) {
      alert("Email and password are required!");
      return;
    }

    try {
      const payload = { email: email.trim(), password };
      const res = await axios.post(
        "http://localhost:6001/api/users/login",
        payload
      );

      // Save user info + token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data._id);
      localStorage.setItem("userType", res.data.usertype);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("email", res.data.email);

      setToken(res.data.token); // Update state for useEffect triggers
      setUsername(res.data.username);
      setUsertype(res.data.usertype);

      // Navigate based on user type
      if (res.data.usertype === "customer") {
        navigate("/");
      } else if (res.data.usertype === "admin") {
        navigate("/admin");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed!!");
    }
  };

  // ================== REGISTER ==================
  const register = async () => {
    if (!username || !email || !password || !usertype) {
      alert("All fields are required!");
      return;
    }

    const payload = { username, email, usertype, password };

    try {
      const res = await axios.post(
        "http://localhost:6001/api/users/register",
        payload
      );

      // Save user info + token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data._id);
      localStorage.setItem("userType", res.data.usertype);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("email", res.data.email);

      setToken(res.data.token);
      setUsername(res.data.username);
      setUsertype(res.data.usertype);

      if (res.data.usertype === "customer") {
        navigate("/");
      } else if (res.data.usertype === "admin") {
        navigate("/admin");
      }
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed!!");
    }
  };

  // ================== LOGOUT ==================
  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUsername("");
    setUsertype("");
    setCartCount(0);
    navigate("/");
  };

  return (
    <GeneralContext.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        usertype,
        setUsertype,
        token,
        cartCount,
        setCartCount,
        productSearch,
        setProductSearch,
        handleSearch,
        fetchCartCount,
        login,
        register,
        logout,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
