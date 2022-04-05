export interface SearchItem {
    category: string;
    items: any[];
}

export interface SearchResults {

    profileId: string;
    searchItems: SearchItem[];

}

export const FilterCategories: Map<string, string[]> = new Map([
  ['drinks', ['ingredients', 'category', 'glass']],
  ['ingredients', ['abv']],
]);
