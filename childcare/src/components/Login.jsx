import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { authenticateUser } from "./Api";

// import 'firebase/compat/firestore';

// import { DocumentSnapshot, getFirestore } from "firebase/firestore";
// import { collection, addDoc, query, where, doc, getDoc, setDoc, updateDoc, Timestamp, serverTimestamp } from "firebase/firestore";
// import { app } from "../firebase";

// const db = getFirestore(app);

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser(loginState);
    }

    //Handle Login API Integration here




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

                <FormExtra />
                <FormAction handleSubmit={handleSubmit} type='Button' text="Sign In/Out" />

            </form>
            <div className="fixed bottom-4 right-4">
                <FormAction handleSubmit={handleBatch} type='Button-Batch' text="Process Batch"/>
            </div>
        </div>
    )
}