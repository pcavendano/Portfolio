import React, { useEffect } from "react";
import html5 from "../assets/icons/html5.svg";
import css from "../assets/icons/css.svg";
import javascript from "../assets/icons/javascript.svg";
import php from "../assets/icons/php.svg";
import sql from "../assets/icons/mysql.svg";
import react from "../assets/icons/react.svg";
import angular from "../assets/icons/angular.svg";
import laravel from "../assets/icons/laravel.svg";
import materialui from "../assets/icons/material.svg";
import github from "../assets/icons/github.svg";
import docker from "../assets/icons/docker.svg";
import figma from "../assets/icons/figma.svg";
import vscode from "../assets/icons/vscode.svg";
import intellij from "../assets/icons/intellij.svg";
import eclipse from "../assets/icons/eclipse.svg";
import androidstudio from "../assets/icons/androidstudio.svg";
import wordpress from "../assets/icons/wordpress.svg";
import kirby from "../assets/icons/kirby.svg";

const About = () => {
    useEffect(() => {
        const elementIsVisibleInViewport = (el, partiallyVisible = true) => {
            const { top, left, bottom, right } = el.getBoundingClientRect();
            const { innerHeight, innerWidth } = window;
            return partiallyVisible
                ? ((top > 0 && top < innerHeight) ||
                      (bottom > 0 && bottom < innerHeight)) &&
                      ((left > 0 && left < innerWidth) ||
                          (right > 0 && right < innerWidth))
                : top >= 0 &&
                      left >= 0 &&
                      bottom <= innerHeight &&
                      right <= innerWidth;
        };

        // find the collection of elements with the class name 'my-text'
        window.onscroll = function () {
            elementIsVisibleInViewport(document.querySelector(".ellipse svg"));
            const ellipse = document.getElementsByClassName("ellipse");
            let scrollX =
                (document.documentElement.scrollTop / 10) * 0.15 + -10;
            ellipse[0].style.transform = "translate(" + scrollX + "%)";
        };
    }, []);
    return (
        <section className="home_about">
            <div className="arrow">
                <svg
                    className="arrow-desktop"
                    width="522"
                    height="262"
                    viewBox="0 0 522 262"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M510.765 261.908C512.371 262.314 514.002 261.341 514.408 259.735L521.026 233.558C521.432 231.952 520.459 230.321 518.852 229.915C517.246 229.509 515.615 230.482 515.209 232.088L509.327 255.356L486.059 249.474C484.452 249.068 482.821 250.041 482.415 251.647C482.009 253.254 482.982 254.885 484.588 255.291L510.765 261.908ZM1.50649 0.302681C-1.00678 38.4171 3.49735 68.6615 13.6779 92.6635C23.8754 116.705 39.7008 134.322 59.5386 147.246C99.0349 172.976 154.373 180.039 212.689 182.925C271.346 185.827 333.018 184.516 386.611 192.999C440.122 201.468 484.491 219.573 508.923 260.536L514.076 257.463C488.259 214.176 441.636 195.633 387.548 187.072C333.542 178.525 271.007 179.803 212.985 176.932C154.622 174.044 100.808 166.97 62.8137 142.218C43.9062 129.901 28.9018 113.19 19.2016 90.3206C9.48451 67.4113 5.02319 38.1602 7.49349 0.697464L1.50649 0.302681Z"
                        fill="#FFE5B8"
                    />
                </svg>
                <svg
                    className="arrow-mobile"
                    width="92"
                    height="144"
                    viewBox="0 0 92 144"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M71.8643 4C71.8643 4 37.4675 43.0427 56.3639 63.779C73.6143 82.709 88.9811 66.6429 87.7396 54.6876C87.3646 51.076 82.3645 40.3656 71.7393 38.2484C64.4481 36.7958 53.8639 34.014 38.9886 58.7974C24.1133 83.5808 37.8636 120.818 37.8636 120.818L43.6137 139.25C43.6137 139.25 36.3635 121.067 8.86294 121.814C-6.68189 122.237 29.1134 117.58 38.1136 132.027"
                        stroke="#FFE5B8"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M38.1135 132.027C50.7403 152.295 34.1134 121.815 78.1144 105.874"
                        stroke="#FFE5B8"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <div className="about-container">
                <div className="ellipse">
                    <svg
                        width="2000"
                        height="2000"
                        viewBox="0 0 2000 2000"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <ellipse
                            cx="1000"
                            cy="1000"
                            rx="1000"
                            ry="1000"
                            transform="rotate(90 1000 1000)"
                            fill="url(#paint0_linear_381_121)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_381_121"
                                x1="1000"
                                y1="0.00012207"
                                x2="1000"
                                y2="2000"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#CB3234" />
                                <stop offset="1" stopColor="#E3D45D" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <section className="about" id="about">
                    <header>
                        <h2>
                            <span className="border six">À propos</span>
                        </h2>
                    </header>
                    <article>
                        <p>
                            👋 Je suis Pedro, un aspirant développeur Full Stack
                            avec des fortes connaissances en Front-End. <br />
                            <br /> Ma passion pour la réparation, la
                            compréhension du fonctionnement interne des
                            appareils électroniques et des automobiles m&apos;a
                            poussé à retourner à l&apos;école et à devenir
                            développeur Full Stack. Je me considére comme
                            quelqu&apos;un de responsable, coopératif, curieux
                            et toujours en quête d&apos;apprentissage. Je suis
                            prêt à apporter mes compétences analytiques et de
                            résolution de problèmes 🛠️ dans le monde numérique,
                            aux côtés d&apos;autres passionnés de la réparation
                            et de la création.
                        </p>
                    </article>
                </section>
                <section className="skills">
                    <header>
                        <h2>
                            <span className="border six">
                                Savoir&#8208;Faire
                            </span>{" "}
                        </h2>
                    </header>
                    <article>
                        <section>
                            <h3>Présent</h3>
                            <p>
                                Mon éducation actuelle est principalement axée
                                sur le design et développement de produits web.
                                Je suis capable de créer des interfaces web en
                                utilisant des outils de maquettage tels que
                                Figma et les convertir en code fonctionnel en
                                utilisant React, Angular, Javascript Vanille et
                                une infrastructure backend en PHP ou Laravel.
                                Cependant, lors de mes études collégiales (DEC),
                                j&apos;ai également appris la Programmation
                                Orientée Objet (POO) en Java, les algorithmes en
                                Python, et la création d&apos;applications
                                Windows en utilisant C#.
                            </p>
                            <br />
                        </section>
                        <section>
                            <h3>Futur</h3>
                            <p>
                                Chez mon futur employeur, je souhaite
                                principalement me spécialiser dans le
                                développement d&apos;interfaces web en utilisant
                                une variété de technologies, notamment React,
                                Angular, Vue.js, ou même JavaScript pur. De
                                cette façon, je pourrai continuer à enrichir mes
                                compétences en UX/UI et en CSS.
                            </p>
                            <br />
                            <p>
                                Cependant, je me considère un généraliste
                                capable de travailler sur l&apos;ensemble de la
                                pile technologique. J&apos;ai un intérêt
                                particulier pour CI/CD, la virtualisation avec
                                Docker, la gestion des serveurs/machines et la
                                configuration d&apos;outils de développement. Je
                                suis également intéressé à en apprendre
                                davantage sur Microsoft .Net et les technologies
                                côté serveur.
                            </p>
                            <br />
                            <p>
                                J&apos;ai hâte de rejoindre une équipe dynamique
                                et de collaborer sur des projets intéressants à
                                long terme.
                            </p>
                        </section>
                        <aside>
                            <h3>Ce que j&apos;utilise</h3>
                            <ul>
                                <li>
                                    <div>Langages: </div>
                                    <div>
                                        <img src={html5} alt="html5 icon" />
                                        <img src={css} alt="css icon" />
                                        <img
                                            src={javascript}
                                            alt="javascript icon"
                                        />
                                        <img src={php} alt="php icon" />
                                        <img src={sql} alt="sql icon" />
                                    </div>
                                </li>
                                <li>
                                    <div>Frameworks: </div>
                                    <div>
                                        <a href="https://getkirby.com/">
                                            <img src={kirby} alt="Kirby icon" />
                                        </a>
                                        <a href="https://angular.io/">
                                            <img
                                                src={angular}
                                                alt="Angular icon"
                                            />
                                        </a>
                                        <a href="https://laravel.com/">
                                            <img
                                                src={laravel}
                                                alt="Laravel icon"
                                            />
                                        </a>
                                        <a href="https://wordpress.com/fr/">
                                            <img
                                                src={wordpress}
                                                alt="Wordpress icon"
                                            />
                                        </a>
                                        <a href="https://react.dev/">
                                            <img src={react} alt="react icon" />
                                        </a>
                                        <a href="https://material.angular.io/">
                                            <img
                                                src={materialui}
                                                alt="Material UI icon"
                                            />
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div>Outils: </div>
                                    <div>
                                        <a href="https://www.figma.com/">
                                            <img src={figma} alt="figma icon" />
                                        </a>
                                        <a href="https://www.docker.com/">
                                            <img
                                                src={docker}
                                                alt="docker icon"
                                            />
                                        </a>
                                        <a href="https://www.jetbrains.com/fr-fr/phpstorm/">
                                            <img
                                                src={intellij}
                                                alt="intellij icon"
                                            />
                                        </a>
                                        <a href="https://github.com/pcavendano">
                                            <img
                                                src={github}
                                                alt="github icon"
                                            />
                                        </a>
                                        <a href="https://code.visualstudio.com/">
                                            <img
                                                src={vscode}
                                                alt="vscode icon"
                                            />
                                        </a>
                                        <a href="https://www.eclipse.org/downloads/">
                                            <img
                                                src={eclipse}
                                                alt="eclipse studio icon"
                                            />
                                        </a>
                                        <a href="https://developer.android.com/">
                                            <img
                                                src={androidstudio}
                                                alt="android studio icon"
                                            />
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </aside>
                    </article>
                </section>
            </div>
        </section>
    );
};

export default About;
