export interface SearchResults {

    profileId: string;
    searchItems?: SearchItem[];

}

export interface SearchItem {
    category: string;
    items: any[];
}

export const FilterCategories: Map<string, string[]> =
    new Map([
        ["drinks", ["ingredients", "category", "glass"]],
        ["ingredients", ["abv"]]
    ]);