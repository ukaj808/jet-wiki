import React from "react";
import {SearchIngredient} from "../../models/searchbox.api";

export interface DetailedIngredientPageOptions {
    ingredient: SearchIngredient;
}

const DetailedCocktailPageComponent: React.FC<DetailedIngredientPageOptions> = (options: DetailedIngredientPageOptions) => {

    return (
        <>
            <h1>{options.ingredient.name}</h1>
            <h2>{options.ingredient.abv}</h2>
            <img src={options.ingredient.imageSource}/>
        </>
    );
}

export {DetailedCocktailPageComponent}