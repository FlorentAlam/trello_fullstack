import Link from 'next/link';
import { useContext } from 'react';
import { MainContext } from '../pages/_app';

const Header = () => {
    const { ctx } = useContext(MainContext);

    return (
    <header>
        <span className="brand"><Link href="/">trello.</Link></span>
        <nav>
            <ul>
                { !ctx.user.isLogged && (
                        <>
                            <li><Link href="/connexion">Connexion</Link></li>
                            <li><Link href="/inscription">Inscription</Link></li>
                        </>
                    )
                }
                { ctx.user.isLogged && (
                        <>
                            <li><Link href="/tableaux">Tableaux</Link></li>
                            <li><Link href="/deconnexion">Deconnexion</Link></li>
                        </>
                    )
                }
            </ul>
        </nav>
    </header>
)};

export default Header;