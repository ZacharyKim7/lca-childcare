import { useState } from "react";
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";

import { DocumentSnapshot, getFirestore } from "firebase/firestore";
import { collection, addDoc, query, where, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);
const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
    const [signupState, setSignupState] = useState(fieldsState);

    const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(signupState);
        checkInput()
    }

    function checkInput() {
        const name = signupState.Name;
        const id = signupState.ID;
        const confirm_id = signupState.Confirm_ID;

        console.log(name, id, confirm_id);

        if (name.length > 30 || id.length > 7 || confirm_id.length > 7) {
            alert("Username or ID exceeds maximum length!");
        } else if (id !== confirm_id) {
            alert("ID and Confirm ID inputs do not match");
        } else {
            createAccount(name, id);
        } 
    }

    function createAccount(name, id) {
        const studentRef = doc(db, "students", name);

        getDoc(studentRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    alert("Student account already exists");
                    console.log("Document already exists");
                } else {
                    console.log("Document not found");
                    alert("Student Record Created");
                    return setDoc(doc(db, "students", name), {
                        ID: id,
                        signed_in: false,
                        on_record: false,
                        time_in: Timestamp.fromDate(new Date()),
                        time_out: Timestamp.fromDate(new Date()),
                    });
                }
            })
            .then(() => {
                console.log("Task Complete");
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