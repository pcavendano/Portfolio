import React, { useState } from "react";

const Ingredient = (props) => {
    const [style, setStyle] = useState("arrow_details");
    const [display, setDisplay] = useState("");
    const [bg, setBg] = useState("");

    const changeStyle = () => {
        style === "arrow_details"
            ? setStyle("arrow_details rotate")
            : setStyle("arrow_details");
        display === "display" ? setDisplay("") : setDisplay("display");
        bg === "bg" ? setBg("") : setBg("bg");
    };

    return (
        <>
            <span className="li">
                <div
                    className={`${bg} entete ${props.bg}`}
                    onClick={changeStyle}
                >
                    <div onClick={changeStyle}>
                        <svg
                            className={style}
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path>
                            <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path>
                        </svg>
                    </div>
                    {props.title}
                </div>
                <div className={`${display} grid`}>
                    <div className="project_description ">
                        <p dangerouslySetInnerHTML={{ __html: props.data }}>
                        </p>
                    </div>
                </div>
            </span>
        </>
    );
};

export default Ingredient;
