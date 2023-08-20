const loginFields = [
    {
        labelText: "Name",
        labelFor: "Name",
        id: "Name",
        name: "Name",
        type: "text",
        autoComplete: "Name",
        isRequired: true,
        placeholder: "Student Name"
    },
]

const signupFields = [
    {
        labelText: "Name",
        labelFor: "Name",
        id: "Name",
        name: "Name",
        type: "text",
        isRequired: true,
        placeholder: "Student Name"
    },
    {
        labelText: "ID",
        labelFor: "ID",
        id: "ID",
        name: "ID",
        type: "number",
        isRequired: true,
        placeholder: "Student ID"
    },
    {
        labelText: "Confirm ID",
        labelFor: "confirm-ID",
        id: "Confirm_ID",
        name: "confirm-ID",
        type: "number",
        isRequired: true,
        placeholder: "Confirm ID"
    }
]

const timeFields = [
    {
        labelText: "Name",
        labelFor: "Name",
        id: "Name",
        name: "Name",
        type: "text",
        isRequired: true,
        placeholder: "Student Name"
    },
    {
        labelText: "Time in",
        labelFor: "Time-in",
        id: "Time_in",
        name: "Time in",
        type: "Time",
        isRequired: true,
        placeholder: "Time in"
    },
    {
        labelText: "Time out",
        labelFor: "Time-in",
        id: "Time_out",
        type: "Time",
        isRequired: true,
        placeholder: "Time out"
    }
]

const massField = [
    {
        labelText: "Time in",
        labelFor: "Time-in",
        id: "Time_in",
        name: "Time in",
        type: "Time",
        isRequired: true,
        placeholder: "Time in"
    }
]

export { loginFields, signupFields, timeFields, massField}