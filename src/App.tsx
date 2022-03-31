import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {CocktailSearchHomePageComponent} from "./components/home/CocktailSearchHomePage.component";

const App = () => (
  <>
      <CocktailSearchHomePageComponent profileId={""}/>
  </>
);
ReactDOM.render(<App />, document.getElementById("app"));
