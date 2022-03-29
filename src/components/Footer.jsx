import React from "react";

const Footer = () => {

    const items = [
        { value: "GitHub", href: "https://github.com/Vertu32", icon: "account_box" },
        { value: "Telegram", href: "https://t.me/Vertu322", icon: "send" },
        { value: "Whats'app", href: "https://wa.me/79610055078", icon: "whatsapp" },
        { value: "Mail", href: "mailto:nnovaev@mail.ru?subject=Со страниц сайта World-X&body=Это сообщение адресовано администратору сайта", icon: "email" },
    ];

    return(
        <footer>
            <div className="footer-text">
                <p>Меня зовут - Никита Новаев</p>
                <p>Благодарю что ознакомилиь с моей работой</p>
                <p>Правее ссылки на мои проекты и контакты для связи,</p>
                <p>До скорых встреч!</p>
            </div>
            <div className="footer-links">
                {items.map(item =>
                            <li key={item.href}>
                                
                                <a href={item.href}  target="_blank">
                                    <span className="material-icons">{item.icon}</span>
                                </a>
                                
                            </li>)}
            </div>
            
      </footer>
    )
}

export default Footer;