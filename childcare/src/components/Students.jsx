import { DocumentSnapshot, getFirestore } from "firebase/firestore";
import { collection, addDoc, query, where, doc, getDocs, setDoc, Timestamp } from "firebase/firestore";
import { app } from "../firebase";

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
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {people.map((person) => (
                console.log(person)
                // <li key={person.ID} className="flex justify-between gap-x-6 py-5">
                    // {/* <div className="flex min-w-0 gap-x-4">
                    //     <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                    //     <div className="min-w-0 flex-auto">
                    //         <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                    //         <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                    //     </div>
                    // </div>
                    // <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    //     <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                    //     {person.lastSeen ? (
                    //         <p className="mt-1 text-xs leading-5 text-gray-500">
                    //             Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                    //         </p>
                    //     ) : (
                    //         <div className="mt-1 flex items-center gap-x-1.5">
                    //             <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    //                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    //             </div>
                    //             <p className="text-xs leading-5 text-gray-500">Online</p>
                    //         </div>
                    //     )}
                    // </div> */}
                // </li>
            ))}
        </ul>
    )
}