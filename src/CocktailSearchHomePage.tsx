import React, {useState} from "react";
import ApiSearchBox from "api-search-box/ApiSearchBox";
import {SearchItem, SearchResults} from "./models/cocktail-search-home.api";
import {Drink, Ingredient} from "./models/cocktaildb.api";
import {Filter} from "./CocktailFilterSidebar";


export interface CocktailSearchHomePageOptions {
    profileId: string;
}

export interface CocktailSearchHomePageOptions {
    profileId: string;
}

const CocktailSearchHomePage: React.FC<CocktailSearchHomePageOptions> = (options: CocktailSearchHomePageOptions) => {

    const [searchResults, setSearchResults] = useState<SearchResults>({
        profileId: options.profileId,
        searchItems: []
    });

    const [filters, setFilters] = useState<Filter[]>([]);

    const handleResults = (results: SearchResults) => {
        console.info("Handling results...");
        setSearchResults((prev) => ({
            profileId: results.profileId,
            searchItems: results.searchItems
        }));
    };

    return (
        <>
            <ApiSearchBox type={"cocktail"} profileId={searchResults.profileId} handleResults={handleResults}/>
            <button type="button">Filters</button>
            <ul>

            </ul>
            {searchResults?.searchItems?.filter(searchItem => searchItem.items).map((searchItem: SearchItem) =>
                <div key={'div$' + searchItem.category}>
                    <h1 key={'h1$' + searchItem.category}>{searchItem.category.charAt(0).toUpperCase() + searchItem.category.slice(1)}</h1>
                    <ul key={searchItem.category}>
                        {searchItem.items.map((item: any) => {
                            if (searchItem.category === "drinks") {
                                let drink: Drink = item as Drink;

                                return <li key={drink.idDrink}><h2>{drink.strDrink}</h2></li>

                            } else if (searchItem.category === "ingredients") {
                                let ingredient: Ingredient = item as Ingredient;

                                return <li key={ingredient.idIngredient}><h2>{ingredient.idIngredient}</h2></li>

                            }
                        })}
                    </ul>

                </div>
            )}
        </>
    );

};

export {CocktailSearchHomePage}