import React from 'react';
import isLoggedIn from '../utilities/user';

const Header = () => {
    return(
        <header>
            <span>трговац.цом</span>
            <nav>
                <ul>
                    {
                        isLoggedIn()
                        ? <li>Одјавите се</li>
                        : <li>Пријавите се</li>
                    }
                    <li>Најновији огласи</li>
                    <li>Поставите оглас</li>
                    <li>Профил</li>
                    <li>Ценовник</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;