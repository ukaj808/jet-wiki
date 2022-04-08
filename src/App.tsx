import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CocktailSearchHomePageComponent from './components/home/CocktailWikiHomePage.component';

function App() {
  return (
    <CocktailSearchHomePageComponent profileId="" />
  );
}
ReactDOM.render(<App />, document.getElementById('app'));
