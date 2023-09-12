import React from "react";
import { Navbar, Hero, About, Footer, Projects } from "./components";


const App = () => {

    return (
        <div id="site">
          <div id="page" className="home">
            <Navbar />
            <main>
              <Hero/>
              <About />
              <Projects />
            </main>
            <Footer />
          </div>
        </div>
    );
};

export default App;
