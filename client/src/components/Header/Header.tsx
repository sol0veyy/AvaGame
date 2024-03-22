import React from "react";
import ProfileButton from "../Button/ProfileButton";
import { MAIN_ROUTE } from "../../utils/consts";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <Link to={MAIN_ROUTE} className="navbar-brand col-2 mb-0">
                    <img src="/img/logo.svg" alt="AvaGame logo" height={40} />
                </Link>
                <ProfileButton className="d-none d-lg-block" />

                <i className="d-lg-none bi bi-list fs-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu"></i>
                <div className="d-lg-none w-50 offcanvas offcanvas-end" id="offcanvasMenu">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasRightLabel">Меню</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ProfileButton />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;