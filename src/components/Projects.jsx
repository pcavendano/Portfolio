import React from "react";
import vino1800 from "../assets/vinovino_1800x2644.webp";
import vino900 from "../assets/vinovino_900x1322.webp";
import vino400 from "../assets/vinovino_400x588.webp";
import vino300 from "../assets/vinovino_300x441.webp";
import mm1800 from "../assets/mm_1800x2487.webp";
import mm900 from "../assets/mm_900x1243.webp";
import mm400 from "../assets/mm_400x553.webp";
import mm300 from "../assets/mm_300x414.webp";
import Ingredient from "./Ingredient";
import hotsauce from "../assets/hot-sauce.svg";
import data from "../assets/data/data.json";

const Projects = () => {
    return (
        <>
            <div id="projects"></div>
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
                            <span>
                                <span className="border six">Mes Projets</span>
                            </span>
                        </span>
                    </h2>
                </header>
                <article>
                    <section className="project_ctn">
                        <header>
                            <h3 className="visually-hidden">vinovino.ca</h3>
                        </header>
                        <section className="project pair col_1">
                            <div className="project_image">
                                <a
                                    href=" https://vinovino.ca/connexion"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <figure>
                                        <img
                                            src={vino1800}
                                            srcSet={`${vino300} 300w, ${vino400} 400w, ${vino900} 900w, ${vino1800} 1800w `}
                                            alt="vinovino project collage"
                                            sizes="(max-width:1024px)100vw, 50vw"
                                            loading="lazy"
                                        />
                                    </figure>
                                </a>
                            </div>
                            <div className="project_info col_2">
                                <span className="recette">
                                    <span className="border four">Vinovino</span>
                                    <img
                                        src={hotsauce}
                                        alt="bouteille de sauce piquante"
                                        loading="lazy"
                                        height={50}
                                        width={50}
                                    />
                                </span>
                                <Ingredient
                                    data={data.vinovino.projectDescription}
                                    title={"Qu'est-ce que c'est?"}
                                />
                                <Ingredient
                                    data={data.vinovino.projectIngridients}
                                    title={"Avec quoi on fait ça?"}
                                />
                                <Ingredient
                                    data={data.vinovino.projectProcedure}
                                    title={"Comment on fait ça?"}
                                />
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
                                    <span className="border four">Meilleur Monde</span>
                                    <img
                                        src={hotsauce}
                                        alt="bouteille de sauce piquante"
                                        loading="lazy"
                                        height={50}
                                        width={50}
                                    />
                                </span>
                                <Ingredient
                                    data={data.mm.projectDescription}
                                    title={"Avant de commencer"}
                                    bg={"red"}
                                />
                                <Ingredient
                                    data={data.mm.projectIngridients}
                                    title={"Ingrédients"}
                                    bg={"red"}
                                />
                                <Ingredient
                                    data={data.mm.projectProcedure}
                                    title={"Préparation"}
                                    bg={"red"}
                                />
                            </div>
                            <div className="project_image">
                                <a
                                    href=" https://meilleurmonde.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <figure>
                                        <img
                                            src={mm1800}
                                            srcSet={`${mm300} 300w, ${mm400} 400w, ${mm900} 900w, ${mm1800} 1800w `}
                                            alt="meilleur monde project collage"
                                            sizes="(max-width:1024px)100vw, 50vw"
                                            loading="lazy"
                                        />
                                    </figure>
                                </a>
                            </div>
                        </section>
                    </section>
                </article>
            </section>
        </>
    );
};

export default Projects;
