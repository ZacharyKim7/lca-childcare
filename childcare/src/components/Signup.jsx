import { useState } from "react";
import { signupFields } from "../constants/formFields"
import Error from "../constants/Alerts";
import FormAction from "./FormAction";
import Input from "./Input";

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { initializeApp } from "firebase/app";
import { DocumentSnapshot, getFirestore } from "firebase/firestore";
import { collection, addDoc, query, where, doc, getDoc, setDoc, Timestamp } from "firebase/firestore"; 
import { firebaseConfig } from '../firebase';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
    const [signupState, setSignupState] = useState(fieldsState);

    const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(signupState)
        createAccount()
    }

    // function checkInput() {

    // }

    function createAccount() {
        const name = signupState.Name;
        const id = signupState.ID;
    
        const studentRef = doc(db, "students", id);
        getDoc(studentRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    <Error message = "Student account already exists" />;
                    console.log("Document found");
                } else {
                    console.log("Document not found");
                    return setDoc(doc(db, "students", id), {
                        Name: name,
                        signed_in: false,
                        on_record: false,
                        time_in: Timestamp.fromDate(new Date("July 22, 2003")),
                        time_out: Timestamp.fromDate(new Date("July 23, 2003")),
                    });
                }
            })
            .then(() => {
                console.log("Document written");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
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
                <FormAction handleSubmit={handleSubmit} type='Button' text="Register" />
            </div>
        </form>
    )
}