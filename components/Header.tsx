import Link from 'next/link';

const Header = () => (
    <header>
        <Link href="/">trello.</Link>
        <nav>
            <ul>
                <li><Link href="/connexion">Connexion</Link></li>
                <li><Link href="/inscription">Inscription</Link></li>
                <li><Link href="/tableaux">Tableaux</Link></li>
                <li><Link href="/deconnexion">Deconnexion</Link></li>
            </ul>
        </nav>
    </header>
);

export default Header;