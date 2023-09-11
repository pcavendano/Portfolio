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
                    Développeur Web <span>Full-Stack</span>
                </span>
                <ul className="menu">
                    <li>
                        <a className="btn" href="#about">à propos</a>
                    </li>
                    <li>
                        <a className="btn" href="#projects">projets</a>
                    </li>
                    <li>
                        <a className="btn hireme"  href="mailto:pcavendano.dev@gmail.com" target="_blank" rel="noreferrer">
                            <span>contactez-moi</span>
                            <Lottie
                                className="fire"
                                animationData={fire}
                                options={defaultOptions}
                                height={16}
                                width={16}
                            />
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
