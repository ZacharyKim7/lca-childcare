import React, { useState, setState, useEffect } from "react";
// import { DocumentSnapshot, getFirestore } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
// import { app } from "../firebase";
import Input from "./Input";
import FormAction from "./FormAction";
import { massField } from "../constants/formFields"
import { fetchStudentsAll, signIn, signOut } from "./Api";


const fields = massField;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Students() {
    const [search, setSearch] = useState("");
    const [checked, setChecked] = useState([]);
    const [timerState, settimerState] = useState(fieldsState);
    const [people, setPeople] = useState([]);
    const [currentTab, setcurrentTab] = useState(1);

    const checkboxes = document.querySelectorAll("input[type='checkbox']");


    // console.log(people);
    useEffect(() => {
        async function fetchData() {
            const temp_people = await fetchStudentsAll();
            setPeople(temp_people);
        }

        fetchData();
    }, []);

    useEffect(() => {
        console.log(checked);
    }, [checked]);

    function updateList(checkedItems, Time) {
        setPeople(people.map((person) => {
            if (checkedItems.includes(person.name)) {
                person.signed_in = true,
                    person.on_record = true,
                    person.time_in = Time,
                    console.log(person.Time_in)
            }
            return person;
        }))
    }

    function updateListOut(checkedItems, Time) {
        setPeople(people.map((person) => {
            if (checkedItems.includes(person.name)) {
                person.signed_in = false,
                    person.time_out = Time,
                    console.log(person)
            }
            return person;
        }))
    }

    const handleChange = (e) => settimerState({ ...timerState, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        const Time = signIn(timerState.Time_in, checkedItems, checked);
        updateList(checkedItems, Time);
        setChecked([]);
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    };

    const handleSubmitOut = (e) => {
        e.preventDefault();
        const Time = signOut(timerState.Time_in, checkedItems, checked);
        updateListOut(checkedItems, Time);
        setChecked([]);
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
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
                        className={"rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-Native-Blue focus:border-Native-Blue focus:z-10 sm:text-sm"
                        }
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
                                <p>Sign In Here</p>
                            </div>
                        </div>
                        <div className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8" onClick={() => setcurrentTab(3)}>
                            <div className={`py-2 px-8 rounded-full ${currentTab == 3 ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:text-indigo-700 hover:bg-indigo-100"}`}>
                                <p>Sign Out Here</p>
                            </div>
                        </div>
                        <div className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8" onClick={() => setcurrentTab(4)}>
                            <div className={`py-2 px-8 rounded-full ${currentTab == 4 ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:text-indigo-700 hover:bg-indigo-100"}`}>
                                <p>Students On-Record</p>
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
                                if (currentTab == 4 && person.on_record == false) {
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
                                            <p className="text-sm leading-none text-gray-600 ml-2>">{person.on_record && !person.signed_in ? `In at: ${person.time_in.toDate().getHours().toString().padStart(2, '0')}:${person.time_in.toDate().getMinutes().toString().padStart(2, '0')} | Out at: ${person.time_out.toDate().getHours().toString().padStart(2, '0')}:${person.time_out.toDate().getMinutes().toString().padStart(2, '0')}` : ""} {person.signed_in ? `In at: ${person.time_in.toDate().getHours().toString().padStart(2, '0')}:${person.time_in.toDate().getMinutes().toString().padStart(2, '0')}` : ""}</p>
                                        </div>
                                    </td>
                                    <td className="pl-3 py-4 flex justify-center">
                                        <div className={`py-3 w-4/5 text-sm focus:outline-none leading-none ${person.signed_in ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"}  rounded text-center`}>
                                            Current Status: {person.signed_in ? "Signed In" : "Signed Out"}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex">
                <form onSubmit={handleSubmit} className="flex justify-around h-full w-2/3">
                    <div className="w-1/3 py-4 h-full">
                        <Input
                            handleChange={handleChange}
                            id={"Time_in"}
                            type={"Time"}
                            fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-Native-Blue focus:border-Native-Blue focus:z-10 sm:text-sm"

                        />
                    </div>
                    <div className="w-1/4">
                        <FormAction type="Button" handleSubmit={handleSubmit} text="Sign In" fixedclassName="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-Native-Blue hover:bg-Hover-Blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-Hover-Blue mt-10" />
                    </div>
                </form>
                <div className="w-1/3 flex justify-center">
                    <form onSubmit={handleSubmitOut} className="w-1/2">
                        <FormAction type="Button" handleSubmit={handleSubmitOut} text="Sign Out" fixedclassName="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-Native-Blue hover:bg-Hover-Blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-Hover-Blue mt-10" />
                    </form>
                </div>
            </div>
        </div>
    )
}