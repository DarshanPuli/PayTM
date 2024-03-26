import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import BottomWarning from "../components/BottomWarning"
import "../App.css"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Signup(){
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    return(
        <div className="bg-colour h-screen flex flex-col items-center justify-center">
            <div className="bg-white flex flex-col justify-center p-4 rounded-lg">
                <Heading label={"Sign up"}></Heading>
                <SubHeading label={"Enter your information to create your account"}></SubHeading>
                <InputBox onChange={(e)=>{setFirstName(e.target.value)}} label={"FirstName"}></InputBox>
                <InputBox onChange={(e)=>{setLastName(e.target.value)}} label={"LastName"}></InputBox>
                <InputBox onChange={(e)=>{setUserName(e.target.value)}} label={"Email"}></InputBox>
                <InputBox onChange={(e)=>{setPassword(e.target.value)}} label={"Password"}></InputBox>
                <Button onClick={async()=>{
                    const response = await axios.post(
                        "http://localhost:3000/api/v1/users/signup",
                        {
                            firstname : firstName,
                            lastname : lastName,
                            username : username,
                            password : password
                        }
                    );
                    localStorage.setItem("token",response.data.token);
                    navigate("/dashboard")
                    }} label={"SignUp"}></Button>
                <BottomWarning label={"Already have an account?"} underline={"Login"} toLink={"./signin"}></BottomWarning>
            </div>
        </div>
    )
}