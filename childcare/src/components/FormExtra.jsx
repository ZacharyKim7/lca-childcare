import { Link } from 'react-router-dom';

export default function FormExtra() {
    return (
        <div className="flex items-center justify-between">
            <div className="text-sm">
                <span className="text-sm text-gray-900">
                    Missed Sign In/Out?
                </span>
                {" "}
                <Link to="/timer" className="font-medium text-purple-600 hover:text-purple-500">
                    Edit timer
                </Link>
            </div>
            <div className="text-sm">
                <Link to="/List" className="font-medium text-purple-600 hover:text-purple-500">
                    Mass Sign-in
                </Link>
            </div>
        </div>
    )
}