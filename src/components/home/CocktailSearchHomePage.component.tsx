import React, {useState} from "react";
import ApiSearchBox from "api-search-box/ApiSearchBox";
import {FilterCategories, SearchItem, SearchResults} from "../../models/cocktail-search-home.api";
import {SearchDrink, SearchIngredient} from "../../models/searchbox.api";
import {CocktailFilterSidebar, Filter} from "../sidebar/CocktailFilterSidebar.component";
import styles from "./styles.module.css";
import _ from "lodash";


export interface CocktailSearchHomePageOptions {
    profileId: string;
}

export interface CocktailSearchHomePageOptions {
    profileId: string;
}

export interface FilterOptions {
    possibleFilters: Map<string, Set<string>>;
    sidebarOpen: boolean;
}

const CocktailSearchHomePageComponent: React.FC<CocktailSearchHomePageOptions> = (options: CocktailSearchHomePageOptions) => {

    const [searchResults, setSearchResults] = useState<SearchResults>({
        profileId: options.profileId,
        searchItems: []
    });

    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        possibleFilters: new Map<string, Set<string>>(),
        sidebarOpen: false
    });


    const handleResults = (results: SearchResults) => {

        console.info("Handling results...");

        setSearchResults((prev) => ({
            profileId: results.profileId,
            searchItems: results.searchItems
        }));
        updatePossibleFilters(getPossibleFiltersFromSearchResults(results));
    };

    const getPossibleFiltersFromSearchResults = (results: SearchResults): Map<string, Set<string>> => {
        let possibleFilters: Map<string, Set<string>> = new Map<string, Set<string>>();

        results.searchItems?.filter(searchItem => searchItem.items != null && searchItem.items.length > 0)
            .map((searchItem) => {
                if (searchItem.category === "drinks") {
                    searchItem.items.map((drink: SearchDrink) => {

                        if (possibleFilters.has("glass")) {
                            possibleFilters.get("glass")?.add(drink.glass);
                        } else {
                            possibleFilters.set("glass", new Set<string>([drink.glass]));
                        }

                        if (possibleFilters.has("category")) {
                            possibleFilters.get("category")?.add(drink.category);
                        } else {
                            possibleFilters.set("category", new Set<string>([drink.category]));
                        }

                        if (possibleFilters.has("ingredient")) {
                            drink.ingredients.forEach(ingredient => possibleFilters.get("ingredient")?.add(ingredient));
                        } else {
                            possibleFilters.set("ingredient", new Set<string>(drink.ingredients));
                        }
                    })
                } else if (searchItem.category === "ingredients") {
                    searchItem.items.map((ingredient: SearchIngredient) => {
                        if (possibleFilters.has("abv")) {
                            possibleFilters.get("abv")?.add(String(ingredient.abv));
                        } else {
                            possibleFilters.set("abv", new Set<string>([ingredient.abv.toString()]));
                        }
                    });

                }
            });

        return possibleFilters;
    }

    const toggleFilterSidebar = () => {
        console.log("toggle");
        setFilterOptions((prev) => {
            return {...prev, sidebarOpen: !prev.sidebarOpen};
        });
    }

    const updatePossibleFilters = (possibleFilters: Map<string, Set<string>>) => {
        console.log("update possible filters");
        setFilterOptions((prev) => {
            console.log(possibleFilters);
            return {...prev, possibleFilters: possibleFilters};
        });
    }

    const applyFilters = () => {
        console.log("apply filters");
    }

    return (
        <>

            <ApiSearchBox type={"cocktail"} profileId={searchResults.profileId} handleResults={handleResults}/>

            <button type="button" onClick={toggleFilterSidebar}>Filters</button>

            {searchResults?.searchItems?.filter(searchItem => searchItem.items && searchItem.items.length > 0)
                .map((searchItem: SearchItem) =>
                <div key={'div$' + searchItem.category}>

                    <h1 className = {styles.yellow} key={'h1$' + searchItem.category}>{searchItem.category.charAt(0).toUpperCase() + searchItem.category.slice(1)}</h1>

                    <ul key={searchItem.category}>
                        {searchItem.items.map((item: any) => {
                            if (searchItem.category === "drinks") {
                                let drink: SearchDrink = item as SearchDrink;

                                return <li key={drink.id}><h2>{drink.name}</h2></li>

                            } else if (searchItem.category === "ingredients") {
                                let ingredient: SearchIngredient = item as SearchIngredient;

                                return <li key={ingredient.id}><h2>{ingredient.name}</h2></li>

                            }
                        })}
                    </ul>

                </div>
            )}

            <CocktailFilterSidebar show={filterOptions.sidebarOpen}
                                   searchCategory={""}
                                   filters={filterOptions.possibleFilters}
                                   toggle={toggleFilterSidebar}
                                   apply={applyFilters}/>
        </>
    );

};

export {CocktailSearchHomePageComponent}