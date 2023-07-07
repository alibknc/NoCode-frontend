import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../../css/Navbar.css';
import { IconContext } from 'react-icons';
import logo from '../../assets/images/logo.png'

function Navbar({ id, name }) {
    return (
        <div>
            <IconContext.Provider value={{ color: '#fff' }}>
                <nav className='nav-menu'>
                    <ul className='nav-menu-items'>
                        <Link to={'/'}>
                            <img src={logo} alt="No-Code Platform" />
                        </Link>

                        {SidebarData.map((item, index) => {
                            let link = item.link.replace(":id", id)
                            link = link.replace(":name", name)
                            return (
                                <li key={index} id={window.location.pathname === link ? "active" : ""}>
                                    <Link to={link} className="row">
                                        <div className="col-2" id="icon">{item.icon}</div>
                                        <div className="col-10" id="title">{item.title}</div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </div>
    );
}

export default Navbar;