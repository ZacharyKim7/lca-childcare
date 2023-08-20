import React, { useState, setState, useEffect } from "react";
// import { DocumentSnapshot, getFirestore } from "firebase/firestore";
// import { collection, addDoc, query, where, doc, getDocs, setDoc, Timestamp, updateDoc } from "firebase/firestore";
// import { app } from "../firebase";
import Input from "./Input";
import { fixedInputClass } from "./Input";
import FormAction from "./FormAction";
import { massField } from "../constants/formFields"
import { fetchStudentsAll, signIn, signOut } from "./Api";


const fields = massField;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

const temp_people = await fetchStudentsAll();


export default function Students() {
    const [search, setSearch] = useState("");
    const [checked, setChecked] = useState([]);
    const [timerState, settimerState] = useState(fieldsState);
    const [people, setPeople] = useState([]);
    const [currentTab, setcurrentTab] = useState(1);


    // console.log(people);
    useEffect(() => {
        // This code will run only once when the component mounts
        setPeople(temp_people);
    }, []);

    useEffect(() => {
        console.log(checked);
    }, [checked]);

    function updateList(checkedItems) {
        setPeople(people.map((person) => {
            if (checkedItems.includes(person.name)) {
                person.signed_in = true,
                    person.on_record = true,
                    console.log(person)
            }
            return person;
        }))
    }

    function updateListOut(checkedItems) {
        setPeople(people.map((person) => {
            if (checkedItems.includes(person.name)) {
                person.signed_in = false,
                    console.log(person)
            }
            return person;
        }))
    }

    const handleChange = (e) => settimerState({ ...timerState, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn(timerState.Time_in, checkedItems, checked);
        updateList(checkedItems);

    };

    const handleSubmitOut = (e) => {
        e.preventDefault();
        signOut(timerState.Time_in, checkedItems, checked);
        updateListOut(checkedItems);
    }

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    const checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";

    return (
        <div className="sm:px-6 w-full">
            <div className="items-center mb-4">
                <form>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        className={fixedInputClass}
                        placeholder={"Search Student"} />
                </form>
            </div>
            <div className="bg-white py-4 md:py-7 px-5 md:px-8 xl:px-10">
                <div className="sm:flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" onClick={() => setcurrentTab(1)}>
                            <div className={`py-2 px-8 rounded-full ${currentTab == 1 ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:text-indigo-700 hover:bg-indigo-100"}`}>
                                <p>All</p>
                            </div>
                        </div>
                        <div className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8" onClick={() => setcurrentTab(2)}>
                            <div className={`py-2 px-8 rounded-full ${currentTab == 2 ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:text-indigo-700 hover:bg-indigo-100"}`}>
                                <p>Signed-out</p>
                            </div>
                        </div>
                        <div className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8" onClick={() => setcurrentTab(3)}>
                            <div className={`py-2 px-8 rounded-full ${currentTab == 3 ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:text-indigo-700 hover:bg-indigo-100"}`}>
                                <p>Signed-in</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-7 max-h-[55vh] overflow-hidden overflow-y-scroll">
                    <table className="w-full whitespace-nowrap">
                        <tbody className="overflow-y-scroll w-full">
                            {people.filter((person) => {
                                if (currentTab == 2 && person.signed_in == true) {
                                    return false;
                                }
                                if (currentTab == 3 && person.signed_in == false) {
                                    return false;
                                }
                                return search.toLowerCase() === '' ? true : person.name.toLowerCase().includes(search);
                            }).map((person, index) => (
                                <tr key={person.name} className="focus:outline-none h-16 border border-gray-300 rounded">
                                    <td>
                                        <div className="ml-5">
                                            <div key={index} className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                                <input
                                                    placeholder="checkbox"
                                                    value={person.name}
                                                    type="checkbox"
                                                    onChange={handleCheck}
                                                    className="focus:opacity-100 checkbox absolute cursor-pointer w-full h-full" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="">
                                        <div className="flex items-center pl-5">
                                            <p className='text-base font-medium leading-none text-gray-700 mr-2'>{person.name}</p>
                                        </div>
                                    </td>
                                    <td className="pl-24">
                                        <div className="flex items-center">
                                            <p className="text-sm leading-none text-gray-600 ml-2>"></p>
                                        </div>
                                    </td>
                                    <td className="pl-5 pr-5">
                                        <div className={`py-3 px-3 text-sm focus:outline-none leading-none ${person.signed_in ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"}  rounded text-center`}>
                                            {person.signed_in ? "Signed In" : "Signed Out"}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex">
                <div className="w-1/2">
                    <form onSubmit={handleSubmit} className="flex">
                        <div className="w-2/5 pr-5 py-4">
                            <Input
                                handleChange={handleChange}
                                id={"Time_in"}
                                type={"Time"}
                            />
                        </div>
                        <div className="w-2/5">
                            <FormAction type="Button" handleSubmit={handleSubmit} text="Sign In" className="border border-transparent text-sm font-medium rounded-md text-white bg-Native-Blue hover:bg-Hover-Blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-Hover-Blue" />
                        </div>
                    </form>
                </div>
                <div className="w-1/2 flex justify-end">
                    <form onSubmit={handleSubmitOut} className="w-2/5">
                        <FormAction type="Button" handleSubmit={handleSubmitOut} text="Sign Out" className="border border-transparent text-sm font-medium rounded-md text-white bg-Native-Blue hover:bg-Hover-Blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-Hover-Blue" />
                    </form>
                </div>
            </div>
        </div>
    )
}