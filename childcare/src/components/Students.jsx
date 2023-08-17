import React, { useState } from "react";
import { DocumentSnapshot, getFirestore } from "firebase/firestore";
import { collection, addDoc, query, where, doc, getDocs, setDoc, Timestamp } from "firebase/firestore";
import { app } from "../firebase";
import Input from "./Input";
import { fixedInputClass } from "./Input";

const db = getFirestore(app);

const people = [];

const querySnapshot = await getDocs(collection(db, "students"));
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    var persons_data = doc.data();
    persons_data.name = doc.id;
    people.push(persons_data);
    console.log(doc.id, " => ", doc.data());
});

console.log(people);



export default function Students() {

    const [checked, setChecked] = useState([]);

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    }

    const checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";


    function signIn() {
        checkedItems.forEach((student) => {
            const studentRef = doc(db, "students", student);
            data = {
                signed_in: true,
                on_record: true,
            }
        })

    }


    return (
        <div className="sm:px-6 w-full">
            <div className="items-center mb-4">
                <form>
                    <Input
                        // key={search}
                        //onChange={onChange}
                        // value={search_input}
                        // labelText={labelText}
                        // labelFor={labelFor}
                        // id={search_input}
                        // name={search_name}
                        type="text"
                        isRequired={false}
                        className={fixedInputClass}
                        placeholder={"Search Student"} />
                </form>
            </div>
            <div className="bg-white py-4 md:py-7 px-5 md:px-8 xl:px-10">
                <div className="sm:flex items-center justify-between">
                    <div className="flex items-center">
                        <a className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" href=" javascript:void(0)">
                            <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                                <p>All</p>
                            </div>
                        </a>
                        <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8" href="javascript:void(0)">
                            <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                                <p>Signed-in</p>
                            </div>
                        </a>
                        <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8" href="javascript:void(0)">
                            <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                                <p>Signed-out</p>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="mt-7 h-70">
                    <table className="overflow-y-scroll w-full whitespace-nowrap">
                        <tbody>
                            {people.map((person, index) => (
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
                                                <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                                                    <svg className="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z"></path>
                                                        <path d="M5 12l5 5l10 -10"></path>
                                                    </svg>
                                                </div>
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
                                    <td className="pl-5">
                                        <div className={`py-3 px-3 text-sm focus:outline-none leading-none ${person.signed_in ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"}  rounded text-center`}>
                                            {person.signed_in ? "Signed In" : "Signed Out"}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            <tr className="h-3"></tr>
                            <tr tabindex="0" className="focus:outline-none  h-16 border border-gray-100 rounded">
                                <td className="focus:text-indigo-600 ">
                                    <div className="flex items-center pl-5">
                                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{checkedItems}</p>
                                    </div>
                                </td>
                                <td className="pl-24">
                                    <div className="flex items-center">
                                        <p className="text-sm leading-none text-gray-600 ml-2">Urgent</p>
                                    </div>
                                </td>
                                <td className="pl-5">
                                    <div className="flex items-center">
                                        <p className="text-sm leading-none text-gray-600 ml-2">04/07</p>
                                    </div>
                                </td>
                                <td className="pl-5">
                                    <div className="flex items-center">
                                        <p className="text-sm leading-none text-gray-600 ml-2">23</p>
                                    </div>
                                </td>
                                <td className="pl-5">
                                    <div className="flex items-center">
                                        <p className="text-sm leading-none text-gray-600 ml-2">04/07</p>
                                    </div>
                                </td>
                                <td className="pl-5">
                                    <button className="py-3 px-6 focus:outline-none text-sm leading-none text-gray-700 bg-gray-100 rounded">Due on 21.02.21</button>
                                </td>
                                <td className="pl-4">
                                    <button className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">View</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}