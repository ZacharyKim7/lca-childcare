const loginFields=[
    {
        labelText:"Name",
        labelFor:"Name",
        id:"Name",
        name:"Name",
        type:"text",
        autoComplete:"Name",
        isRequired:true,
        placeholder:"Student Name"   
    },
]

const signupFields=[
    {
        labelText:"Name",
        labelFor:"Name",
        id:"name",
        name:"Name",
        type:"text",
        isRequired:true,
        placeholder:"Student Name"   
    },
    {
        labelText:"ID",
        labelFor:"ID",
        id:"id",
        name:"ID",
        type:"number",
        isRequired:true,
        placeholder:"Student ID"   
    },
    {
        labelText:"Confirm ID",
        labelFor:"confirm-ID",
        id:"confirm-ID",
        name:"confirm-ID",
        type:"number",
        isRequired:true,
        placeholder:"Confirm ID"   
    }
]

const timeFields=[
    {
        labelText:"Name",
        labelFor:"Name",
        id:"Name",
        name:"Name",
        type:"text",
        isRequired:true,
        placeholder:"Student Name"   
    },
    {
        labelText:"Time in",
        labelFor:"Time-in",
        id:"Time-in",
        name:"Time in",
        type:"Time",
        isRequired:true,
        placeholder:"Time in"
    },
    {
        labelText:"Time out",
        labelFor:"Time-in",
        id:"Time-out",
        type:"Time",
        isRequired:true,
        placeholder:"Time out"
    }
]



export {loginFields, signupFields, timeFields}