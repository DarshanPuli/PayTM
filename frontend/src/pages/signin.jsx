import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import BottomWarning from "../components/BottomWarning"
import "../App.css"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Signin(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    return(
        <div className="bg-colour h-screen flex flex-col items-center justify-center">
            <div className="bg-white flex flex-col justify-center p-4 rounded-lg">
                <Heading label={"Sign In"}></Heading>
                <SubHeading label={"Enter your credentials to access your account"}></SubHeading>
                <InputBox onChange={(e)=>{setUsername(e.target.value)}} label={"Email"}></InputBox>
                <InputBox onChange={(e)=>{setPassword(e.target.value)}} label={"Password"}></InputBox>
                <Button onClick = {async()=>{
                    const response = await axios.post("http://localhost:3000/api/v1/users/signin",
                    {
                        username,
                        password
                    }
                    );
                    localStorage.setItem("token",response.data.message);
                    navigate("/dashboard");

                }} label={"SignIn"}></Button>
                <BottomWarning label={"Dont an account?"} underline={"Sign Up"} toLink={"./signup"}></BottomWarning>
            </div>
        </div>
    )
}