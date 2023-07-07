import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';

function SubMenu({ item }) {
    const [open, setOpen] = React.useState(()=>{
        
        for (const i of item.submenu) {
            if (i.link === window.location.pathname)
                return true;
        }

        return false;
    });

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div>
            <li onClick={handleOpen}>
                <div className="row">
                    <div className="col-2" id="icon">{item.icon}</div>
                    <div className="col-8" id="title">{item.title}</div>
                    <div className="col-2" id="s-icon">{open ? <FaIcons.FaAngleDown /> : <FaIcons.FaAngleRight />}</div>
                </div>
            </li>
            {open ? (
                <ul className="menu">
                    {item.submenu.map((s_item, index) => {
                        return (
                            <li key={index} className="menu-item" id={window.location.pathname === s_item.link ? "active" : ""}>
                                <Link to={s_item.link} className="row">
                                    <div className="col-3" id="icon">{s_item.icon}</div>
                                    <div className="col-9" id="title">{s_item.title}</div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        </div>
    );
}

export default SubMenu;