import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import {useState,useEffect} from "react"
import axios from "axios"

export default function Dashboard(){
    const token = localStorage.getItem("token"); 
    const [balance, setBalance] = useState(null);
    const [firstname,setFirstname] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        "Authorization": token
                    }
                });
                setBalance(response.data.balance);
                setFirstname(response.data.firstname);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchUserData();
    }, []);
    return(
        <div>
            <Appbar user={firstname}></Appbar>
            <Balance balance={balance}></Balance>
            <Users></Users>
        </div>
    )
}