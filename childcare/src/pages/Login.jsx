import Header from "../components/Header"
import Login from "../components/Login"

export default function LoginPage() {
    return (
        <>
            <Header
                heading="Childcare Sign-in"
                paragraph="Don't have an account yet? "
                linkName="Register Student"
                linkUrl="/signup"
            />
            <Login/>
        </>
    )
}