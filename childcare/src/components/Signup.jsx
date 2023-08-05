import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useCollectionData } from 'react-firebase-hooks/firestore';

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

    //handle Signup API Integration here
    const createAccount = () => {
        const students = firebase.firestore().collection("students");
        // var name = signupState[field.name];
        // var id = signupState[field.id];
        
        // students.add({
        //     name: name,
        //     id: id,
        //     checkIn: false,
        //     onRecord: false,
        // });
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