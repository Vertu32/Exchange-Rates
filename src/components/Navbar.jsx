import Menu from "./menu/Menu";
import React, { useState } from "react";

const Navbar = () => {

    const [menuActive, setMenuActive] = useState(false);

    const items = [
        { value: "GitHub", href: "https://github.com/Vertu32", icon: "account_box" },
        { value: "Telegram", href: "https://t.me/Vertu322", icon: "send" },
        { value: "Whats'app", href: "https://wa.me/79610055078", icon: "whatsapp" },
        { value: "Mail", href: "mailto:nnovaev@mail.ru?subject=Со страниц сайта World-X&body=Это сообщение адресовано администратору сайта", icon: "email" },
    ];

    return (
        <nav className="navbar">
          <div
            onClick={() => setMenuActive(!menuActive)}
            className={menuActive? "burger-btn active" : "burger-btn"}
          >
            <span></span>
          </div>
          <Menu
            active={menuActive}
            setActive={setMenuActive}
            header={"О себе"}
            items={items}
         ></Menu>
        </nav>
        
    )
}

export default Navbar