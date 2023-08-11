import { useState } from 'react';
import { timeFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";

import 'firebase/compat/firestore';

import { DocumentSnapshot, getFirestore } from "firebase/firestore";
import { collection, addDoc, query, where, doc, getDoc, setDoc, updateDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

const fields = timeFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Timer() {
    const [timerState, settimerState] = useState(fieldsState);

    const handleChange = (e) => settimerState({ ...timerState, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(timerState);
        adjustTimer();
    }

    const adjustTimer = () => {
        const name = timerState.Name;
        const timeIn = timerState.Time_in;
        const timeOut = timerState.Time_out;
        const [hoursIn, minutesIn] = timeIn.split(':');
        const [hoursOut, minutesOut] = timeOut.split(':');

        const studentRef = doc(db, "students", name);

        getDoc(studentRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const new_in = new Date();
                    new_in.setHours(hoursIn);
                    new_in.setMinutes(minutesIn);
                    new_in.setMiliseconds(0);

                    const new_out = new Date();
                    new_out.setHours(hoursOut);
                    new_out.setMinutes(minutesOut);
                    new_in.setMiliseconds(0);

                    const data = {
                        time_in: Timestamp.fromDate(new_in),
                        time_out: Timestamp.fromDate(new_out),
                    };
                    updateDoc(studentRef, data)
                        .then(() => {
                            console.log("Time updated successfully.");
                            alert("Time updated sucessfully:", {new_in}, {new_out});
                        })
                        .catch((error) => {
                            console.log("Encountered an error when updating time.", error);
                            alert("Error updating student time");
                        })    
                } else {
                    alert("Student record not found.");
                }
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