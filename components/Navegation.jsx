import Link from 'next/link'
import Style from '../components/Navegation.module.css'

const links =[{
    label: 'Home',
    route:'/'
},{
    label: 'Products',
    route: '/products'
},{
    label: 'Notification',
    route: '/notification '
}]

export default function NavigationPage (){
    return(
        <header className={Style.header}>
            <nav>
                <ul className={Style.navegation}>
                    <li>
                        <Link href="/">Inicio</Link>
                    </li>
                    <li>
                        <Link href="/products">Productos</Link>
                    </li>
                    <li>
                        <Link href="/notification">Notificaciones</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}   