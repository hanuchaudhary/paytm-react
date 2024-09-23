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
  const [myData, setMyData] = useState<MeInterface | null>(null);
  const token = localStorage.getItem("token")?.split(" ")[1]
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/v1/user/me`, {
          headers: {
            Authorization: token,
          },
        });
        setMyData(response.data.user);
      } catch (error: any) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [SERVER_URL, myData?.name]);

  return { myData };
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
        console.log("Error fetching balance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return { balance, loading };
};
