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
                <div className="site-logo">
                    <a className="fullname" href="/">
                        <span className="firstName">Pedro</span>
                        <span className="lastName">Contreras</span>
                        <span className="lastName">Avendano</span>
                    </a>
                    <span className="profession">Full Stack Web Developer</span>
                </div>
                <ul>
                    <li>
                        <div className="decorative-space">
                            <a href="/about">About</a>
                        </div>
                    </li>
                    <li>
                        <a href="/projects">Projects</a>
                    </li>
                    <li>
                        <a className="hireme" href="/" target="_blank">
                            <span>Hire Me</span>
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
