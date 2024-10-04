import Link from "next/link"
import Image from "next/image"
import logoImg from "@/assets/logo.png";
import classes from './main-header.module.css';

export default function MainHeaderPage(){
    return (
        <header className={classes.header}>
            <Link href="/" className={classes.logo}> 
                {/* Mặc định Image component của nextjs sẽ chỉ load hình nếu nó thực sự được hiển thị ytrong khung hình
                 và tất các các hình ảnh được ImageComponent xử lý luôn có chuẩn đầu ra là webp */}
                {/* <img src={logoImg.src} alt="a plate with food on it"/> */}
                <Image src={logoImg} alt="a plate with food on it" priority/> 
                NextLevel Food
            </Link>
            <nav className={classes.nav}>
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
    )
}