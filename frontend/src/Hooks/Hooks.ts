import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { SERVER_URL } from "../config";

interface usersInterface {
  id: string;
  email: string;
  name: string;
  password: string;
}

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
  const [debouncedFilter, setDebouncedFilter] = useState(filter);  
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 500); 

    return () => {
      clearTimeout(handler);  
    };
  }, [filter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token")?.split(" ")[1];
        const response = await axios.get(`${SERVER_URL}/api/v1/user/bulk?filter=${debouncedFilter}`, {
          headers: {
            Authorization: token || ""
          }
        });
        setData(response.data.users);
      } catch (error: any) {
        setError(error.message || "Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    if (debouncedFilter !== null) {
      fetchData();
    }
  }, [debouncedFilter]);

  return { data, loading, setFilter, error };
};


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

  const fetchBalance = useCallback(async () => {
    setLoading(true);
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
  }, [token]);

  useEffect(() => {
    fetchBalance();
    const interval = setInterval(fetchBalance, 20000);

    return () => clearInterval(interval);
  }, [fetchBalance]);

  return { balance, loading, fetchBalance };
};


interface Transaction {
  id: string
  amount: number
  timestamp: string
  sender: {
    name: string
    email: string
  }
  receiver: {
    name: string
    email: string
  }
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      setError(null)
      const token = localStorage.getItem("token")?.split(" ")[1]
      if (!token) {
        throw new Error("No authentication token found")
      }

      const response = await axios.get<{ transactions: Transaction[] }>(
        `${SERVER_URL}/api/v1/account/transactions/recent`,
        {
          headers: {
            Authorization: token
          },
        }
      )

      setTransactions(response.data.transactions)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  const refetch = () => {
    setLoading(true)
    fetchTransactions()
  }

  return { transactions, loading, error, refetch }
}