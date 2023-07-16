const loginFields=[
    {
        labelText:"Student ID",
        labelFor:"Student-ID",
        id:"Student-ID",
        name:"ID",
        type:"ID",
        autoComplete:"ID",
        isRequired:true,
        placeholder:"Student ID"   
    },
]

const signupFields=[
    {
        labelText:"Username",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"Name"   
    },
    {
        labelText:"ID",
        labelFor:"ID",
        id:"ID",
        name:"ID",
        type:"ID",
        autoComplete:"current-ID",
        isRequired:true,
        placeholder:"Student ID"   
    },
    {
        labelText:"Confirm ID",
        labelFor:"confirm-ID",
        id:"confirm-ID",
        name:"confirm-ID",
        type:"ID",
        autoComplete:"confirm-ID",
        isRequired:true,
        placeholder:"Confirm ID"   
    }
]

export {loginFields,signupFields}