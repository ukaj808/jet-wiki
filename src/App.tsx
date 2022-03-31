import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {CocktailSearchHomePage} from "./components/home/CocktailSearchHomePage";

const App = () => (
  <>
      <CocktailSearchHomePage profileId={""}/>
  </>
);
ReactDOM.render(<App />, document.getElementById("app"));
