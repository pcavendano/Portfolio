import React from "react";
import Lottie from "lottie-react";
import fire from "../assets/lottie/fire.json";

const Navbar = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: fire,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <header className="site-header">
            <nav>
                <a className="fullname" href="/">
                    <span className="firstName">Pedro</span>
                    <span className="lastName">Contreras</span>
                    <span className="lastName">Avendano</span>
                </a>
                <span className="profession">
                    Full Stack Web <span>Developer</span>
                </span>
                <ul className="menu">
                    <li>
                        <a className="btn" href="/about">about</a>
                    </li>
                    <li>
                        <a className="btn" href="/projects">projects</a>
                    </li>
                    <li>
                        <a className="btn hireme" href="/" target="_blank">
                            <span>hire me</span>
                            <Lottie
                                className="fire"
                                animationData={fire}
                                options={defaultOptions}
                            />
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
