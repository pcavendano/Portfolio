import React, {useEffect} from "react";
import Lottie from "lottie-react";
import fire from "../assets/lottie/fire.json";

const Navbar = () => {

    useEffect(() => {


        window.addEventListener("scroll", (e) => {
            const doc = document.documentElement;
            const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
            const header = document.getElementsByClassName("site-header")[0]
            if (top > 15) {
              header.style.borderRadius = "0 0 0 0";
            } else {
              header.style.borderRadius = "0.5rem 0.5rem 0 0;";
            }
          });
    }, [])

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
