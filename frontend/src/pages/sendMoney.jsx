import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import "../App.css"
import { useSearchParams } from "react-router-dom"
import {useState} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export default function SendMoney(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount,setAmount] = useState(0);
    const navigate = useNavigate();
    return(
        <div className="bg-colour h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center p-8 rounded-lg  w-80 card-colour">
                <Heading label={"Send Money"}></Heading>
                <div className="ml-2 justify-start">
                    <div className="flex items-center  pt-20 pb-5">
                        <button className="bg-green-500 w-10 h-10 rounded-full mr-4 font-semibold">U1</button>
                        <div className="text-medium font-bold text-xl ">{name}</div>
                    </div>
                    <input onChange={(e)=>{setAmount(e.target.value)}} type="text" placeholder="Enter Amount (in Rs)" className=" placeholder:text-sm w-[100%] placeholder:pl-3 p-1.5 rounded border-solid border border-slate-400 mt-1"/>
                    <button className="bg-green-500 w-[100%] font-bold text-md p-1 mt-3 rounded text-white" onClick={()=>{
                        axios.post("http://localhost:3000/api/v1/account/transfer",
                        {
                            to:id,
                            amount
                        },{
                            headers : {
                                Authorization : localStorage.getItem("token")
                            }
                        }
                        
                        )
                        navigate("/sent");
                    }}>Initiate Transfer</button>
                </div>
                
            </div>
        </div>
    )
}