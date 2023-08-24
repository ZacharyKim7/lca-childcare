import { useState } from 'react';
import { AdminLogin } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { Admin } from "./Api";
import {
    useNavigate
  } from "react-router-dom";

const fields = AdminLogin;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (await Admin(loginState.Email, loginState.Password)) {
            console.log("a")
            navigate("/");
        }
    }


    const handleBatch = (e) => {
        e.preventDefault();
        
    }

    return (
        <div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="-space-y-px">
                    {
                        fields.map(field =>
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={loginState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                            />

                        )
                    }
                </div>

                <FormAction handleSubmit={handleSubmit} type='Button' text="Sign In/Out" />
            </form>
        </div>
    )
}