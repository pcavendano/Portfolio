import React, { useEffect } from "react";

const About = () => {
    useEffect(() => {
        
        const elementIsVisibleInViewport = (el, partiallyVisible = true) => {
            const { top, left, bottom, right } = el.getBoundingClientRect();
            const { innerHeight, innerWidth } = window;
            return partiallyVisible
            ? ((top > 0 && top < innerHeight) ||
            (bottom > 0 && bottom < innerHeight)) &&
            ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
            : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
        };
        
        // find the collection of elements with the class name 'my-text'
        window.onscroll = function () {
            elementIsVisibleInViewport(document.querySelector('.ellipse svg'))
            const ellipse = document.getElementsByClassName("ellipse");
            let scrollX = (document.documentElement.scrollTop/10) * .15 + -10;
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
                <section className="about">
                    <header>
                        <h2>About</h2>
                    </header>
                    <article>
                        <p>
                            👋 I&apos;m Pedro, an aspiring Full Stack Developer
                            with strong Front-End knowledge. <br /> <br /> My passion for
                            fixing and understanding the inner-workings of
                            electronics, appliances, automobiles and anything
                            engineered compelled me to return to school and
                            become a full stack developer. I like to think of
                            myself as someone who is responsable, cooperative,
                            curious and always looking to learn. I am ready to
                            bring my analytical and problem-solving 🛠️ abilities
                            to the digital world, alongside other like-minded
                            repairers, improvers and creators.
                        </p>
                        <br />
                    </article>
                </section>
                <section className="skills">
                    <header>
                        <h2>My Skills</h2>
                    </header>
                    <article>
                        <h3>Design</h3>
                        <p>
                            My current education is mainly focused on creating
                            and programming web interfaces using React, Angular,
                            and a Laravel backend. However, during my college
                            studies (DEC), I also learned Object-Oriented
                            Programming (OOP) in Java, algorithms in Python, and
                            creating Windows applications using C#.
                        </p>
                        <br />
                        <p>
                            At my future employer, I would like to primarily
                            focus on web interface development using
                            technologies like React, Angular, and Vue.js. This
                            is where I can continue enhancing my knowledge in
                            UX/UI and CSS.
                        </p>
                        <br />
                        <p>
                            Nonetheless, I consider myself a generalist capable
                            of working across the entire stack. I have a
                            particular interest in CI/CD, Docker, server/machine
                            management, and setting up development tools. I am
                            also interested in learning more about cloud
                            computing and machine learning.
                        </p>
                        <br />
                        <p>
                            I look forward to being a part of a dynamic team and
                            to contribute and collaborate on interesting
                            projects for the long term.
                        </p>
                        <br />
                    </article>
                </section>
            </div>
        </section>
    );
};

export default About;
