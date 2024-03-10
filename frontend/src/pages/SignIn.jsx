import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const SignIn = ()=>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign in"}></Heading>
                <SubHeading label={"Enter your credentials to access your account"}></SubHeading>
                <InputBox onChange={(e)=>{
                    setUsername(e.target.value)
                }} placeholder="vivek231@gmail.com" label={"Email"}></InputBox>
                <InputBox onChange={(e)=>{
                    setPassword(e.target.value)
                }} placeholder="12345" label={"Password"}></InputBox>

                <div className="pt-4">
                    <Button onClick={async()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signIn",{
                            username,
                            password
                        })
                        console.log(response)
                        localStorage.setItem("token",response.data.token)
                        navigate("/dashboard")
                    }} label={"Sign in"}></Button>
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}></BottomWarning>
            </div>
        </div>   
    </div>
}