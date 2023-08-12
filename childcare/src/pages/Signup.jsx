import Header from "../components/Header";
import Signup from "../components/Signup";

export default function SignupPage() {
    return (
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <Header
                    heading="Register new student"
                    paragraph="Already registered?"
                    linkName="Sign In"
                    linkUrl="/"
                />
                <Signup />
            </div>
        </div>
    )
}