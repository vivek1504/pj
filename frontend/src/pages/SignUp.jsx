import {Heading} from"../components/Heading"
import {SubHeading} from "../components/SubHeading"
import {InputBox} from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const SignUp = ()=>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"}></Heading>

                <SubHeading label={"Enter your information to create an account"}></SubHeading>

                <InputBox onChange={e => {
                    setFirstName(e.target.value)
                }} placeholder="vivek" label={"First Name"}></InputBox>
                <InputBox onChange={e=>{
                    setLastName(e.target.value)
                }} placeholder="jadhav" label={"Last Name"}></InputBox>
                <InputBox onChange={e=>{
                    setUsername(e.target.value)
                }} placeholder="vivek231@gmail.com" label={"Email"}></InputBox>
                <InputBox onChange={e =>{
                    setPassword(e.target.value)
                }} placeholder="112345" label={"Password"}></InputBox>

                <div className="pt-4">
                    <Button onClick={async ()=> {
                        const response =await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            firstName,
                            lastName,
                            password
                        })
                        localStorage.setItem("token",response.data.token)
                        navigate("/dashboard")
                    }} label={"Sign Up"}></Button>
                </div>

                <BottomWarning label={"Already have an account ?"} buttonText={"Sign Up"} to={"/signin"}></BottomWarning>
            </div>
        </div>
    </div>
}