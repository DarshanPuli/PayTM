import Heading from "../components/Heading"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"

export default function Sent(){
    const navigate = useNavigate();
    return(
        <div className="bg-colour h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center p-8 rounded-lg  w-[100] card-colour">
                <Heading label={"Payment Completed"}></Heading>
                <br></br>
                <Button label={"Return to Dashboard"} onClick={()=>{
                    navigate("/dashboard")
                }}></Button>
                <div className="ml-2 justify-start">
                </div>
            </div>
        </div>
    )
}