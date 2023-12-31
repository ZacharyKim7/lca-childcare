import { getFirestore } from "firebase/firestore";
import { collection, doc, getDocs, getDoc, setDoc, Timestamp, updateDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../firebase";
import 'firebase/auth';


import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



const db = getFirestore(app);

function Admin(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            return true;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return false;
        });
    return true
}

async function fetchStudentsAll() {
    const people = [];

    const querySnapshot = await getDocs(collection(db, "students"));
    querySnapshot.forEach((doc) => {
        var persons_data = doc.data();
        persons_data.name = doc.id;
        people.push(persons_data);
    });

    return people;
}

function signIn(Time_in, checkedItems, checked) {
    const timeIn = Time_in;
    const [hoursIn, minutesIn] = timeIn.split(':');

    const new_in = new Date();
    new_in.setHours(hoursIn);
    new_in.setMinutes(minutesIn);
    const Time = Timestamp.fromDate(new_in)

    const data = {
        signed_in: true,
        on_record: true,
        time_in: Time,
    }
    console.log(data.time_in)

    if (checkedItems.length === 0) {
        alert("No students Checked");
    } else {
        checked.forEach((student) => {
            const studentRef = doc(db, "students", student);
            updateDoc(studentRef, data)
                .then(() => {
                    console.log("Signed in student.");
                })
                .catch((error) => {
                    console.log("Encountered an error duing mass sign in.", error);
                    alert("Error during mass sign-in.");
                })
        })
        alert(`Signed in students.`);
    }
    return Time
}

function signOut(Time_in, checkedItems, checked) {
    const timeIn = Time_in;
    const [hoursIn, minutesIn] = timeIn.split(':');

    const new_in = new Date();
    new_in.setHours(hoursIn);
    new_in.setMinutes(minutesIn);
    const Time = Timestamp.fromDate(new_in)

    const data = {
        signed_in: false,
        time_out: Time,
    }

    if (checkedItems.length === 0) {
        alert("No students checked.");
    } else {
        checked.forEach((student) => {
            const studentRef = doc(db, "students", student);
            updateDoc(studentRef, data)
                .then(() => {
                    console.log("Signed out student.");
                })
                .catch((error) => {
                    console.log("Encountered an error duing mass sign out.", error);
                })
        })
        alert(`Signed out students.`);
    }
    return Time
}

const adjustTimer = (timerState) => {
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

                const new_out = new Date();
                new_out.setHours(hoursOut);
                new_out.setMinutes(minutesOut);

                const data = {
                    time_in: Timestamp.fromDate(new_in),
                    time_out: Timestamp.fromDate(new_out),
                };
                updateDoc(studentRef, data)
                    .then(() => {
                        console.log("Time updated successfully.");
                        alert("Time updated sucessfully:", { new_in }, { new_out });
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

const authenticateUser = (loginState) => {
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

async function processBatch() {
    const peopleJSON = [];

    const querySnapshot = await getDocs(collection(db, "students"));
    querySnapshot.forEach((document) => {
        if (document.data().on_record === true) {
            const time = (document.data().time_out.toDate() - document.data().time_in.toDate()) / 3600000.0;
            const day = document.data().time_in.toDate().toString();
            const hourMatch = day.match(/(\d{2}):/);
            let isPM = null;
            if (hourMatch) {
                const hour = parseInt(hourMatch[1], 10);
                isPM = (hour >= 12);
            }
            var persons_data = {
                "Log Id": document.data().ID,
                "Student": document.id,
                "Login": document.data().time_in.toDate().toString(),
                "Logout": document.data().time_out.toDate().toString(),
                "Total Time (hours)": time.toFixed(2),
                "Charge note": `${time.toFixed(2)} X ${isPM ? "$7.50 (PM)" : "$8.50 (AM)"} on ${day.slice(0, 10)}`,
                "Billing Amount": (time.toFixed(2) * (isPM ? 7.50 : 8.50)).toFixed(2)
            }
            peopleJSON.push(persons_data);

            const name = document.id;

            const studentRef = doc(db, "students", name);

            const data = {
                on_record: false,
            }

            updateDoc(studentRef, data)
                .then(() => {
                    console.log("Removed student from record");
                })
                .catch((error) => {
                    console.log("Encountered an error when removing student from record", error);
                })
        }
    });

    return peopleJSON
}


export { fetchStudentsAll, signIn, signOut, adjustTimer, authenticateUser, createAccount, processBatch, Admin }