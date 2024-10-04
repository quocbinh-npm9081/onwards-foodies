import Link from "next/link"
import logImg from "@/assets/logo.png";

export default function MainHeaderPage(){
    return <header>
        <Link href="/"> 
            <img src={logImg.src} alt="a plate with food on it"/>
            NextLevel Food
        </Link>
        <nav>
            <ul>
                <li>
                    <Link href="/meals">Meals</Link>
                </li>
                <li>
                    <Link href="/community">Foodies community</Link>
                </li>
            </ul>
        </nav>
    </header>
}