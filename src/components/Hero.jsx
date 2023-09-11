import React, { useRef } from "react";
import pedro1200 from "../assets/hero_pedro_1200X1600.webp";
import pedro800 from "../assets/hero_pedro_800X1067.webp";
import pedro405 from "../assets/hero_pedro_405x540.webp";
import pedro200 from "../assets/hero_pedro_200X267.webp";

const Hero = () => {
    const linkedinRef = useRef(null);
    const githubRef = useRef(null);
    // Function will execute on click of button
    const onButtonClick = () => {
        // using Java Script method to get PDF file
        fetch("CV_Pedro_v2.pdf").then((response) => {
            response.blob().then((blob) => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement("a");
                alink.href = fileURL;
                // Setting file name to download
                // alink.download = 'CV_Pedro_v2.pdf';
                alink.click();
            });
        });
    };
    return (
        <section className="home_hero">
            <figure>
                <img
                    src={pedro405}
                    srcSet={`${pedro200} 200w, ${pedro405} 405w, ${pedro800} 800w, ${pedro1200} 1200w `}
                    alt="photo de profil de pedro contreras avendano"
                    sizes="(max-width:1024px)100vw, 50vw"
                    loading="lazy"
                />
            </figure>
            <div className="content">
                <h1>
                    Développeur Web
                    <br />
                    Full-Stack
                    <br />
                    <span className="open">Ouvert </span>
                    Aux Opportunités
                </h1>
                <p>
                    Passionné de cuisine, je construit des produits web
                    interactifs - prêt à m&apos;engager, apprendre,
                    m&apos;adapter et m&apos;améliorer.
                </p>
                <div className="links">
                    <ul>
                        <li>
                            <a
                                className="linkedin"
                                title="linkedin"
                                href="https://www.linkedin.com/in/pcavendano/"
                                target="_blank"
                                rel="noopener noreferrer"
                                ref={linkedinRef}
                            >
                                <svg
                                    width="42"
                                    height="42"
                                    viewBox="0 0 42 42"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M37.3333 0H4.66667C2.08833 0 0 2.08833 0 4.66667V37.3333C0 39.9117 2.08833 42 4.66667 42H37.3333C39.9117 42 42 39.9117 42 37.3333V4.66667C42 2.08833 39.9117 0 37.3333 0ZM14 32.6667H8.113V16.3333H14V32.6667ZM10.9527 13.3397C9.15367 13.3397 7.952 12.1403 7.952 10.5397C7.952 8.939 9.15133 7.73967 11.151 7.73967C12.95 7.73967 14.1517 8.939 14.1517 10.5397C14.1517 12.1403 12.9523 13.3397 10.9527 13.3397ZM35 32.6667H29.302V23.7393C29.302 21.2707 27.783 20.7013 27.2137 20.7013C26.6443 20.7013 24.745 21.0817 24.745 23.7393C24.745 24.1197 24.745 32.6667 24.745 32.6667H18.858V16.3333H24.745V18.613C25.5033 17.283 27.0223 16.3333 29.8713 16.3333C32.7203 16.3333 35 18.613 35 23.7393V32.6667Z"
                                        fill="#FFE5B8"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a
                                className="gtihub"
                                title="gtihub"
                                href="https://www.github.com/pcavendano/"
                                target="_blank"
                                rel="noopener noreferrer"
                                ref={githubRef}
                            >
                                <svg
                                    width="42"
                                    height="42"
                                    viewBox="0 0 42 42"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21 0C9.40078 0 0 9.40078 0 21C0 32.5992 9.40078 42 21 42C32.5992 42 42 32.5992 42 21C42 9.40078 32.5992 0 21 0ZM21 4.2C30.2613 4.2 37.8 11.7387 37.8 21C37.8 21.9844 37.7016 22.9523 37.5375 23.8875C37.0207 23.7727 36.2578 23.6332 35.3719 23.625C34.7156 23.6168 33.8953 23.7234 33.2062 23.8219C33.4441 23.0918 33.6 22.2879 33.6 21.4594C33.6 19.4414 32.6156 17.5629 31.0406 16.0125C31.4754 14.3965 31.902 11.6238 30.7781 10.5C27.4559 10.5 25.6184 12.8707 25.5281 12.9937C24.5027 12.7477 23.4445 12.6 22.3125 12.6C20.8605 12.6 19.4742 12.8625 18.1781 13.2562L18.5719 12.9281C18.5719 12.9281 16.7262 10.3687 13.3219 10.3687C12.1324 11.5664 12.6738 14.6016 13.125 16.1437C11.5172 17.6777 10.5 19.4906 10.5 21.4594C10.5 22.1484 10.6641 22.8047 10.8281 23.4281C10.2457 23.3625 8.1457 23.1656 7.28437 23.1656C6.52148 23.1656 5.34023 23.3461 4.39687 23.5594C4.26562 22.7227 4.2 21.8695 4.2 21C4.2 11.7387 11.7387 4.2 21 4.2ZM7.28437 23.6906C8.11289 23.6906 10.6312 23.9859 10.9594 24.0187C11.0004 24.1336 11.0414 24.2402 11.0906 24.3469C10.1883 24.2648 8.44101 24.1418 7.28437 24.2812C6.51328 24.3715 5.52891 24.6504 4.65937 24.8719C4.59375 24.6094 4.51172 24.3551 4.4625 24.0844C5.38125 23.8875 6.58711 23.6906 7.28437 23.6906ZM35.3719 24.15C36.2086 24.1582 36.9715 24.2977 37.4719 24.4125C37.4473 24.552 37.3734 24.6668 37.3406 24.8062C36.8074 24.6832 35.9297 24.5027 34.9125 24.4781C34.4203 24.4699 33.6328 24.4945 32.9437 24.5437C32.9766 24.4781 32.9848 24.4125 33.0094 24.3469C33.723 24.2484 34.6336 24.1418 35.3719 24.15ZM8.59687 24.7406C9.77812 24.7488 10.8855 24.8309 11.3531 24.8719C12.4523 26.9227 14.6754 28.4402 18.1125 29.0719C17.2676 29.5395 16.5129 30.1957 15.9469 30.975C15.4547 31.016 14.9379 31.0406 14.4375 31.0406C12.9773 31.0406 12.0668 29.7363 11.2875 28.6125C10.5 27.4887 9.53203 27.3656 8.99062 27.3C8.44101 27.2344 8.25234 27.5461 8.53125 27.7594C10.1309 28.9898 10.7051 30.45 11.3531 31.7625C11.9355 32.9437 13.1578 33.6 14.5031 33.6H14.7656C14.7246 33.8297 14.7 34.043 14.7 34.2562V36.5531C9.85195 34.5926 6.16055 30.45 4.79062 25.3312C5.65195 25.118 6.61992 24.8965 7.35 24.8062C7.68633 24.7652 8.11289 24.7324 8.59687 24.7406ZM34.9125 25.0031C35.8559 25.0277 36.6926 25.2082 37.2094 25.3312C36.0527 29.6789 33.198 33.2965 29.4 35.5031V34.2562C29.4 32.468 27.9891 30.1711 25.9875 29.0719C29.3098 28.4648 31.4754 27.0129 32.6156 25.0687C33.4113 25.0113 34.3465 24.9867 34.9125 25.0031ZM22.05 33.6C22.6242 33.6 23.1 34.0758 23.1 34.65V37.6687C22.4109 37.759 21.7137 37.8 21 37.8V34.65C21 34.0758 21.4758 33.6 22.05 33.6ZM17.85 35.7C18.4242 35.7 18.9 36.1758 18.9 36.75V37.6687C18.1945 37.5785 17.4809 37.4473 16.8 37.275V36.75C16.8 36.1758 17.2758 35.7 17.85 35.7ZM26.25 35.7C26.7586 35.7 27.2016 36.0691 27.3 36.5531C26.6191 36.832 25.9219 37.0863 25.2 37.275V36.75C25.2 36.1758 25.6758 35.7 26.25 35.7Z"
                                        fill="#FFE5B8"
                                    />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="btn-container cv">
                    <a className="btn" onClick={onButtonClick}>
                        curriculum vitae
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M21.5833 20C21.2076 20 20.8473 19.8507 20.5816 19.5851C20.3159 19.3194 20.1667 18.9591 20.1667 18.5833V5.83333H7.41667C7.04094 5.83333 6.68061 5.68408 6.41493 5.4184C6.14926 5.15272 6 4.79239 6 4.41667C6 4.04094 6.14926 3.68061 6.41493 3.41493C6.68061 3.14926 7.04094 3 7.41667 3H21.5833C21.9591 3 22.3194 3.14926 22.5851 3.41493C22.8507 3.68061 23 4.04094 23 4.41667V18.5833C23 18.9591 22.8507 19.3194 22.5851 19.5851C22.3194 19.8507 21.9591 20 21.5833 20Z"
                                fill="#FFE5B8"
                            />
                            <path
                                d="M4.66805 23C4.33812 22.9999 4.01562 22.902 3.74132 22.7187C3.46702 22.5354 3.25323 22.2748 3.12698 21.97C3.00073 21.6652 2.96769 21.3298 3.03204 21.0062C3.09639 20.6827 3.25523 20.3854 3.48849 20.1521L20.1725 3.46833C20.4872 3.16443 20.9086 2.99626 21.3461 3.00006C21.7835 3.00386 22.202 3.17933 22.5113 3.48866C22.8207 3.79799 22.9961 4.21644 22.9999 4.65388C23.0037 5.09132 22.8356 5.51276 22.5317 5.82741L5.84761 22.5112C5.69289 22.6663 5.50903 22.7894 5.3066 22.8733C5.10418 22.9572 4.88717 23.0002 4.66805 23Z"
                                fill="#FFE5B8"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
