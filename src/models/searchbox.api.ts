// Our APIS drink model for much cleaner mappings; needed for filtering.
export interface SearchDrink {
    id: string;
    name: string;
    category: string;
    ingredients: string[];
    glass: string;
    hasAlcohol: string;
}

// Our APIS ingredient model for much cleaner mappings; needed for filtering.
export interface SearchIngredient {
    id: string;
    name: string;
    abv: string;
    hasAlcohol: string;
}