import React from "react";
import {SearchDrink} from "../../models/searchbox.api";

export interface DetailedCocktailPageOptions {
    drink: SearchDrink;
}

const DetailedCocktailPageComponent: React.FC<DetailedCocktailPageOptions> = (options: DetailedCocktailPageOptions) => {

    return (
        <>
            <h1>{options.drink.name}</h1>
            <h2>{options.drink.category}</h2>
            <h3>{options.drink.glass}</h3>
            <img src={options.drink.imageSource}/>
            <ul>
                {options.drink.ingredients.map((ingredient) => {
                    return <li>{ingredient}</li>
                })}
            </ul>

        </>
    );
}

export {DetailedCocktailPageComponent}