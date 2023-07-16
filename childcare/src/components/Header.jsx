import {Link} from 'react-router-dom';
import Logo from '../assets/Logo.png';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-49 w-180"
                    src={Logo}/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-Native-Blue hover:text-Hover-Blue">
                {linkName}
            </Link>
            </p>
        </div>
    )
}