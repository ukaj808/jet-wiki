import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {CocktailSearchHomePage} from "./CocktailSeachHomePage";

const App = () => (
  <>
      <CocktailSearchHomePage/>
  </>
);
ReactDOM.render(<App />, document.getElementById("app"));
