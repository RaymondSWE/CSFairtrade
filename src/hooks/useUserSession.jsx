import { useState, useEffect } from "react";
import axios from "axios";

const useUserSession = () => {
  const [userSteamId, setUserSteamId] = useState(null);
  const [balance, setBalance] = useState(0);
  const [email, setEmail] = useState(null);
  const [tradeLink, setTradeLink] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userItems, setUserItems] = useState([]);
  const [itemsForSale, setItemsForSale] = useState([]);
  
  
  useEffect(() => {
    fetchUserData();
    fetchAllUsersCount();
  }, []);

  useEffect(() => {
    if (userSteamId) {
      fetchUserBalance();
      fetchUserEmail();
      fetchUserTradeLink();
    }
  }, [userSteamId]);

  const fetchUserData = async () => {
    const user = "http://localhost:4000/api/auth/user";

    try {
      const res = await axios.get(user, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
        withCredentials: true,
        responseType: "json",
      });
      console.log("User data:", res.data);

      setUserSteamId(res.data.id);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const fetchUserBalance = async () => {
    const userBalance = `http://localhost:4000/api/user/balance/${userSteamId}`;

    try {
      const res = await axios.get(userBalance);
      setBalance(res.data.balance);
    } catch (error) {
      console.error("Failed to fetch user balance:", error);
    }
  };

  const fetchUserEmail = async () => {
    const userEmail = `http://localhost:4000/api/user/getUserEmail/${userSteamId}`;

    try {
      const res = await axios.get(userEmail);
      setEmail(res.data.email);
    } catch (error) {
      console.error("Failed to fetch user email:", error);
    }
  };

  const fetchUserTradeLink = async () => {
    const userTradeLink = `http://localhost:4000/api/user/getTradeLink/${userSteamId}`;

    try {
      const res = await axios.get(userTradeLink);
      setTradeLink(res.data.tradelink);
    } catch (error) {
      console.error("Failed to fetch user trade link:", error);
    }
  };

  const fetchAllUsersCount = async () => {
    const allUsersCount = `http://localhost:4000/api/user/allUsersCount`;

    try {
      const res = await axios.get(allUsersCount);
      setTotalUsers(res.data.total_users);
    } catch (error) {
      console.error("Failed to fetch total users count:", error);
    }
  };

  const fetchUserItems = async () => {
    const userItemsUrl = `http://localhost:4000/api/useritems/for_sale/${userSteamId}`;

    try {
      const res = await axios.get(
        `http://localhost:4000/api/useritems/for_sale/${userSteamId}`
      );
      setUserItems(res.data);
    } catch (error) {
      console.error("Failed to fetch user items:", error);
    }
  };

  const fetchItemsForSale = async () => {
    const itemsForSaleUrl = "http://localhost:4000/api/useritems/for_sale";

    try {
      const res = await axios.get(itemsForSaleUrl);
      setItemsForSale(res.data);
    } catch (error) {
      console.error("Failed to fetch items for sale:", error);
    }
  };

  return {
    userSteamId,
    balance,
    email,
    tradeLink,
    totalUsers,
    fetchUserItems,
    userItems,
    fetchItemsForSale,
  };
};

export default useUserSession;
