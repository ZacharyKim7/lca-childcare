import Header from "../components/Header"
import Timer from "../components/Timer"

export default function LoginPage() {
    return (
        <>
            <Header
                heading="Manually Adjust "
                paragraph = "Already registered? "
                linkName = "Sign In"
                linkUrl = "/" 
            />
            <Timer/>
        </>
    )
}