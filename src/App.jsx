import React from "react";
import { Navbar, Hero, About, Contact } from "./components";


const App = () => {

    return (
        <div id="site">
          <div id="page" className="home">
            <Navbar />
            <main>
              <Hero/>
              <About />
              <Contact />
            </main>
            <section className="site-footer"></section>
          </div>
        </div>
    );
};

export default App;
