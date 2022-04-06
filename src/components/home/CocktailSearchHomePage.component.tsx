import React, { useState } from 'react';

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import ApiSearchBox from 'api-search-box/ApiSearchBox';
import _ from 'lodash';
import FilterListIcon from '@mui/icons-material/FilterList';
import { SearchItem, SearchResults } from '../../models/cocktail-search-home.api';
import { SearchDrink, SearchIngredient } from '../../models/searchbox.api';
import FilterSidebar from '../sidebar/FilterSidebar.component';
import Catalogue from '../catalogue/Catalogue.component';
import styles from './styles.module.css';
import logo from './JET-logo.svg';

export interface CocktailSearchHomePageOptions {
    profileId: string;
}

export interface FilterOptions {
    possibleFilters: Map<string, Set<string>>;
    filtersApplied: boolean;
    sidebarOpen: boolean;
    filteredResults: SearchItem[];
}

const CocktailSearchHomePageComponent:
    React.FC<CocktailSearchHomePageOptions> = function
    CocktailSearchHomePageComponent(options: CocktailSearchHomePageOptions) {
      const { profileId } = options;

      const [searchResults, setSearchResults] = useState<SearchResults>({
        profileId,
        searchItems: [],
      });

      const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        possibleFilters: new Map<string, Set<string>>(),
        filtersApplied: false,
        sidebarOpen: false,
        filteredResults: [],
      });

      const clearFilters = () => {
        setFilterOptions((prev) => ({
          ...prev,
          filtersApplied: false,
          filteredResults: [],
        }));
      };

      const parseFiltersFromSearchResults = (results: SearchResults): Map<string, Set<string>> => {
        const possibleFilters: Map<string, Set<string>> = new Map<string, Set<string>>();

        results.searchItems?.filter(
          (searchItem) => searchItem.items != null && searchItem.items.length > 0,
        )
          .forEach((searchItem) => {
            if (searchItem.category === 'drinks') {
              searchItem.items.forEach((drink: SearchDrink) => {
                if (possibleFilters.has('glass')) {
                  possibleFilters.get('glass')?.add(drink.glass);
                } else {
                  possibleFilters.set('glass', new Set<string>([drink.glass]));
                }

                if (possibleFilters.has('category')) {
                  possibleFilters.get('category')?.add(drink.category);
                } else {
                  possibleFilters.set('category', new Set<string>([drink.category]));
                }

                if (possibleFilters.has('ingredients')) {
                  drink.ingredients.forEach((ingredient) => possibleFilters.get('ingredients')?.add(ingredient));
                } else {
                  possibleFilters.set('ingredients', new Set<string>(drink.ingredients));
                }

                if (possibleFilters.has('hasAlcohol')) {
                  possibleFilters.get('hasAlcohol')?.add(drink.hasAlcohol);
                } else {
                  possibleFilters.set('hasAlcohol', new Set<string>([drink.hasAlcohol]));
                }
              });
            } else if (searchItem.category === 'ingredients') {
              searchItem.items.forEach((ingredient: SearchIngredient) => {
                if (possibleFilters.has('hasAlcohol')) {
                  possibleFilters.get('hasAlcohol')?.add(ingredient.hasAlcohol);
                } else {
                  possibleFilters.set('hasAlcohol', new Set<string>([ingredient.hasAlcohol]));
                }
              });
            }
          });

        return possibleFilters;
      };

      const updatePossibleFilters = (possibleFilters: Map<string, Set<string>>) => {
        setFilterOptions((prev) => ({ ...prev, possibleFilters }));
      };

      const handleResults = (results: SearchResults) => {
        clearFilters();
        setSearchResults(() => ({
          profileId: results.profileId,
          searchItems: results.searchItems,
        }));
        updatePossibleFilters(parseFiltersFromSearchResults(results));
      };

      const openFilterSidebar = () => {
        setFilterOptions((prev) => ({ ...prev, sidebarOpen: true }));
      };

      const closeFilterSidebar = () => {
        setFilterOptions((prev) => ({ ...prev, sidebarOpen: false }));
      };

      const filteredSearchItems = (
        searchItems: SearchItem[] | undefined,
        selectedFilters: Map<string, Set<string>>,
      ): SearchItem[] => {
        const results: SearchItem[] = [];
        searchItems?.forEach((searchItem) => {
          const filteredSearchItem: SearchItem = {
            category: searchItem.category,
            items: searchItem.items?.filter((item) => {
              for (const [filterCategory, values] of Array.from(selectedFilters.entries())) {
                let attribute = item[filterCategory];
                if (attribute != null) {
                  if (typeof attribute === 'string' || attribute instanceof String) {
                    attribute = item[filterCategory] as String;
                    return values.has(attribute);
                  }
                  if (filterCategory === 'ingredients') {
                    attribute = item[filterCategory];
                    return _.intersectionWith(Array.from(values), attribute, _.isEqual).length > 0;
                  }
                }
              }
              return false;
            }),
          };
          results.push(filteredSearchItem);
        });

        return results;
      };

      const applyFilters = (selectedFilters: Map<string, Set<string>>) => {
        if (selectedFilters.size > 0) {
          setFilterOptions((prev) => ({
            ...prev,
            filtersApplied: true,
            filteredResults: filteredSearchItems(searchResults.searchItems, selectedFilters),
          }));
        } else {
          clearFilters();
        }
      };

      const showFilterButton = () => filterOptions.possibleFilters.size > 0;

      return (
        <div className={styles.home}>
          <img className={styles.logo} src={logo} alt="Logo" />
          <ApiSearchBox type="cocktail" profileId={searchResults.profileId} handleResults={handleResults} />

          <button
            className={showFilterButton() ? styles.filterButton : styles.hidden}
            type="button"
            onClick={openFilterSidebar}
          >
            <FilterListIcon />
          </button>

          <Catalogue items={filterOptions.filtersApplied
            ? filterOptions.filteredResults
            : searchResults.searchItems}
          />

          {filterOptions.sidebarOpen && (
          <FilterSidebar
            searchCategory=""
            filters={filterOptions.possibleFilters}
            close={closeFilterSidebar}
            clear={() => {
              clearFilters();
              closeFilterSidebar();
            }}
            apply={(selectedFilters) => {
              applyFilters(selectedFilters);
              closeFilterSidebar();
            }}
          />
          )}
        </div>
      );
    };

export default CocktailSearchHomePageComponent;
