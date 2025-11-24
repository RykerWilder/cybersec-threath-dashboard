import React from "react";

const Header = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="p-10 max-w-[1300px] w-full mx-auto flex">
            <span className="w-full border-t border-stone-500 text-stone-500 text-center p-10">&copy; {currentYear} | All rights are reserved | Developed by RykerWilder </span>
        </footer>
    );
};

export default Header;