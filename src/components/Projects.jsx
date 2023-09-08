import React from "react";
import vino from "../assets/vinovino.png";
import mm from "../assets/meilleurmonde.png";
import Ingredient from "./Ingredient";
import hotsauce from "../assets/hot-sauce.svg";

const Projects = () => {
    return (
        <section className="home_projects">
            <header>
                <h2>
                    <span className="ghipy">
                        <iframe
                            style={{
                                aspectRatio: "16/9",
                                borderRadius: "1000px",
                            }}
                            src="https://giphy.com/embed/aNqEFrYVnsS52"
                            className="giphy-embed"
                            allowFullScreen
                        ></iframe>
                        Mes Projets
                    </span>
                </h2>
            </header>
            <article>
                <section className="project_ctn">
                    <header>
                        <h4 className="visually-hidden">Vinovino</h4>
                    </header>
                    <section className="project pair col_1">
                        <div className="project_image">
                            <a
                                href=" https://vinovino.ca/connexion"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <figure>
                                    <img src={vino} alt="project" />
                                </figure>
                            </a>
                        </div>
                        <div className="project_info col_2">
                            <span className="recette">
                                Recette
                                <img
                                    src={hotsauce}
                                    alt="bouteille de sauce piquante"
                                />
                            </span>
                            <Ingredient title={"Avant de commencer"} />
                            <Ingredient title={"Ingrédients"} />
                            <Ingredient title={"Préparation"} />
                        </div>
                    </section>
                </section>
                <section className="project_ctn">
                    <header>
                        <h4 className="visually-hidden">Meilleur Monde</h4>
                    </header>
                    <section className="project impair col_2">
                        <div className="project_info red col_1">
                            <span className="recette red">
                                Recette
                                <img
                                    src={hotsauce}
                                    alt="bouteille de sauce piquante"
                                />
                            </span>
                            <Ingredient
                                title={"Avant de commencer"}
                                bg={"red"}
                            />
                            <Ingredient title={"Ingrédients"} bg={"red"} />
                            <Ingredient title={"Préparation"} bg={"red"} />
                        </div>
                        <div className="project_image">
                            <a
                                href=" https://meilleurmonde.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <figure>
                                    <img
                                        src={mm}
                                        alt="collage de photos du projet meilleur monde"
                                    />
                                </figure>
                            </a>
                        </div>
                    </section>
                </section>
            </article>
        </section>
    );
};

export default Projects;
