import React, {useState} from "react";
import ApiSearchBox from "api-search-box/ApiSearchBox";
import {SearchItem, SearchResults} from "../../models/cocktail-search-home.api";
import {SearchDrink, SearchIngredient} from "../../models/searchbox.api";
import {CocktailFilterSidebar} from "../sidebar/CocktailFilterSidebar.component";
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
    filtersApplied: boolean;
    sidebarOpen: boolean;
    filteredResults: SearchItem[];
}

const CocktailSearchHomePageComponent: React.FC<CocktailSearchHomePageOptions> = (options: CocktailSearchHomePageOptions) => {

    const [searchResults, setSearchResults] = useState<SearchResults>({
        profileId: options.profileId,
        searchItems: [],
    });

    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        possibleFilters: new Map<string, Set<string>>(),
        filtersApplied: false,
        sidebarOpen: false,
        filteredResults: []
    });

    const handleResults = (results: SearchResults) => {

        clearFilters();
        setSearchResults((prev) => ({
            profileId: results.profileId,
            searchItems: results.searchItems,
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

                        if (possibleFilters.has("ingredients")) {
                            drink.ingredients.forEach(ingredient => possibleFilters.get("ingredients")?.add(ingredient));
                        } else {
                            possibleFilters.set("ingredients", new Set<string>(drink.ingredients));
                        }

                        if (possibleFilters.has("hasAlcohol")) {
                            possibleFilters.get("hasAlcohol")?.add(drink.hasAlcohol);
                        } else {
                            possibleFilters.set("hasAlcohol", new Set<string>([drink.hasAlcohol]));
                        }
                    })
                } else if (searchItem.category === "ingredients") {

                    searchItem.items.map((ingredient: SearchIngredient) => {
                        if (possibleFilters.has("hasAlcohol")) {
                            possibleFilters.get("hasAlcohol")?.add(ingredient.hasAlcohol);
                        } else {
                            possibleFilters.set("hasAlcohol", new Set<string>([ingredient.hasAlcohol]));
                        }
                    });

                }
            });

        return possibleFilters;
    }

    const toggleFilterSidebar = () => {
        setFilterOptions((prev) => {
            return {...prev, sidebarOpen: !prev.sidebarOpen};
        });
    }

    const updatePossibleFilters = (possibleFilters: Map<string, Set<string>>) => {
        setFilterOptions((prev) => {
            return {...prev, possibleFilters: possibleFilters};
        });
    }

    const applyFilters = (selectedFilters: Map<string, Set<string>>) => {
        if (selectedFilters.size > 0) {
            setFilterOptions((prev) => {
                return {...prev, filtersApplied: true,
                    filteredResults: filteredSearchItems(searchResults.searchItems, selectedFilters)
                }
            });
        } else {
            clearFilters();
        }
    }

    const filteredSearchItems = (searchItems: SearchItem[] | undefined, selectedFilters: Map<string, Set<string>>): SearchItem[] => {
        let results: SearchItem[] = [];
        searchItems?.forEach((searchItem) => {
            let filteredSearchItem: SearchItem = {
                category: searchItem.category,
                items: searchItem.items?.filter((item) => {
                    for(const [filterCategory, values] of Array.from(selectedFilters.entries())) {
                        let attribute = item[filterCategory];
                        if (attribute != null) {
                            if (typeof attribute === 'string' || attribute instanceof String) {
                                attribute = item[filterCategory] as String;
                                return values.has(attribute);
                            } else if (filterCategory === "ingredients") {
                                attribute = item[filterCategory];
                                return _.intersectionWith(Array.from(values), attribute, _.isEqual).length > 0;
                            }
                        }
                    }
                    return false;
                })
            };
            results.push(filteredSearchItem);
        });

        return results;
    }

    const clearFilters = () => {
        setFilterOptions((prev) => {
            return {...prev, filtersApplied: false,
                filteredResults: []
            }
        });
    }

    const getCataloguedSearchResponse = () : JSX.Element => {
        let resultSet = filterOptions.filtersApplied ? filterOptions.filteredResults : searchResults.searchItems;
        return <div className={styles.searchItem}>
                {resultSet?.filter(searchItem => searchItem.items && searchItem.items.length > 0)
                .map((searchItem: SearchItem) => getCatalogueSection(searchItem))}
            </div>;
    }

    const getCatalogueSection = (searchItem: SearchItem) : JSX.Element | undefined => {

        return <section key={'div$' + searchItem.category}>

            <h1 className = {styles.yellow} key={'h1$' + searchItem.category}>{searchItem.category.charAt(0).toUpperCase() + searchItem.category.slice(1)}</h1>

            {getCatalogueSectionItems(searchItem)}

        </section>


    }

    const getCatalogueSectionItems = (searchItem: SearchItem) : JSX.Element => {
        return <ul key={searchItem.category}>
            {searchItem.items.map(item => getCatalogueItem(searchItem.category, item))}
        </ul>
    }

    const getCatalogueItem = (category: string, item: any) : JSX.Element | undefined => {
        if (category === "drinks") {
            let drink: SearchDrink = item as SearchDrink;
            return <li key={drink.id}><h2>{drink.name}</h2></li>

        } else if (category === "ingredients") {

            let ingredient: SearchIngredient = item as SearchIngredient;
            return <li key={ingredient.id}><h2>{ingredient.name}</h2></li>

        }
        return undefined;
    }

    return (
        <>

            <ApiSearchBox type={"cocktail"} profileId={searchResults.profileId} handleResults={handleResults}/>

            <button type="button" onClick={toggleFilterSidebar}>Filters</button>

            {getCataloguedSearchResponse()}

            <CocktailFilterSidebar show={filterOptions.sidebarOpen}
                                   searchCategory={""}
                                   filters={filterOptions.possibleFilters}
                                   toggle={toggleFilterSidebar}
                                   clear={clearFilters}
                                   apply={applyFilters}/>
        </>
    );

};

export {CocktailSearchHomePageComponent}