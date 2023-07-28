import Header from "../components/Header"
import Timer from "../components/Timer"

export default function LoginPage() {
    return (
        <>
            <Header
                heading="Manually Adjust "
                paragraph = ""
                linkName = "Back to Login"
                linkUrl = "/" 
            />
            <Timer/>
        </>
    )
}