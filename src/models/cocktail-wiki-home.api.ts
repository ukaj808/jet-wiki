export interface SearchItem {
    category: string;
    items: any[];
}

export interface SearchResults {
    profileId: string;
    searchItems: SearchItem[];
}
