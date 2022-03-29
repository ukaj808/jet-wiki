export interface SearchRequest {
    searchStr: string;
    type: string;
    category?: string;
    profileId?: string;
}

export interface SearchResults {

    profileId: string;
    searchItems?: SearchItem[];

}

export interface SearchItem {
    category: string;
    items: any[];
}

export interface ApiSearchFields {
    searchStr: string;
    category: string;
    profileId: string;
    type: string;
    recentSearches: string[];
}


export interface ApiSearchOptions {
    type: string;
    profileId: string;

    handleResults(results: SearchResults): SearchResults;
}


export interface Profile {

    type: string;
    searches: string[];
}
