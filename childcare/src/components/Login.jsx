import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

import 'firebase/compat/firestore';

import { DocumentSnapshot, getFirestore } from "firebase/firestore";
import { collection, addDoc, query, where, doc, getDoc, setDoc, updateDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

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
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = () => {
        const name = loginState.Name;
        const studentRef = doc(db, "students", name);
        
        
        getDoc(studentRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    if (docSnap.data().signed_in === true) {
                        const data = {
                            signed_in: false,
                            time_out: serverTimestamp(),
                        };
                        updateDoc(studentRef, data)
                            .then(() => {
                                console.log("Field value of an existing document was changed");
                            })
                            .catch((error) => {
                                console.log("Encountered an error when updating field value", error);
                            })
                        alert("Success! Student signed out.");

                    } else {
                        const data = {
                            signed_in: true,
                            on_record: true,
                            time_in: serverTimestamp(),
                        };
                        updateDoc(studentRef, data)
                            .then(() => {
                                console.log("Field value of an existing document was changed")
                            })
                            .catch((error) => {
                                console.log("Encountered an error when updating field value", error);
                            });
                        alert("Success! Student signed in.")
                    }
                } else {
                    alert("Student record not found.");
                }
            })
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

                <FormExtra />
                <FormAction handleSubmit={handleSubmit} type='Button' text="Sign In/Out" />

            </form>
            <div className="fixed bottom-4 right-4">
                <FormAction handleSubmit={handleBatch} type='Button-Batch' text="Process Batch"/>
            </div>
        </div>
    )
}