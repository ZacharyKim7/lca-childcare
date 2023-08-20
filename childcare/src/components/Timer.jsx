import { useState } from 'react';
import { timeFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";

import { adjustTimer } from "./Api";

// import 'firebase/compat/firestore';

// import { DocumentSnapshot, getFirestore } from "firebase/firestore";
// import { collection, addDoc, query, where, doc, getDoc, setDoc, updateDoc, Timestamp, serverTimestamp } from "firebase/firestore";
// import { app } from "../firebase";

const fields = timeFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Timer() {
    const [timerState, settimerState] = useState(fieldsState);

    const handleChange = (e) => settimerState({ ...timerState, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        adjustTimer(timerState);
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={timerState[field.id]}
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
                <FormAction handleSubmit={handleSubmit} type='Button' text="Adjust Time" />
            </div>
        </form>
    )
}