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
            const fetchData = async () => {
                const response = await axios.get(`${SERVER_URL}/api/v1/user/bulk?filter=${filter}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
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

export const useGetBalance = () => {
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        try {
            const fetchBalance = async () => {
                const response = await axios.get(`${SERVER_URL}/api/v1/account/balance`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
                setBalance(response.data.balance)
                setLoading(false)
            }
            fetchBalance();

        } catch (error) {
            setLoading(true)
            console.log(error);
        }

    }, [])

    return { balance, loading }
}