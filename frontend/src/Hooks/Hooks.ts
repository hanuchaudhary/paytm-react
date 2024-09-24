import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";

interface usersInterface {
  id: string;
  email: string;
  name: string;
  password: string;
}

export const useAllUsers = () => {
  const [data, setData] = useState<usersInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token")?.split(" ")[1];
      const fetchData = async () => {
        const response = await axios.get(`${SERVER_URL}/api/v1/user/bulk?filter=${filter}`, {
          headers: {
            Authorization: token
          }
        })
        setData(response.data.users)
        setLoading(false)
      }
      fetchData();
    } catch (error: any) {
      setLoading(true)
      setError(error)
    }

  }, [filter])
  return { data, loading, setFilter, error }
}

interface MeInterface {
  name: string;
  id: string;
  email: string;
}

export const useProfile = () => {
  const [myData, setMyData] = useState<MeInterface | null>(() => {
    const savedData = localStorage.getItem("profileData");
    return savedData ? JSON.parse(savedData) : null;
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token")?.split(" ")[1];

  useEffect(() => {
    if (myData) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/v1/user/me`, {
          headers: {
            Authorization: token,
          },
        });
        setMyData(response.data.user);

        localStorage.setItem("profileData", JSON.stringify(response.data.user));
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError("Failed to fetch profile data");
        console.error("Error fetching profile data:", error);
      }
    };

    if (!myData) {
      fetchData();
    }
  }, [token]);

  return { myData, loading, error };
};


export const useGetBalance = () => {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem("token")?.split(" ")[1];

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/v1/account/balance`, {
          headers: {
            Authorization: token,
          },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance(); 

    const intervalId = setInterval(fetchBalance, 30000); 
    return () => clearInterval(intervalId);
  }, [token]); 

  return { balance, loading };
};

