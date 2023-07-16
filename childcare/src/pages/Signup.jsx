import Header from "../components/Header";
import Signup from "../components/Signup";

export default function SignupPage() {
    return (
        <>
            <Header
                heading = "Register new student"
                paragraph = "Already registered?"
                linkName = "Sign In"
                linkUrl = "/" 
            />
            <Signup/>
        </>
    )
}