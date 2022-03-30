import React, {useState} from "react";

export interface Filter {
    category: string;
    value: string;
}

export interface FilterOptions {
    searchCategory: string;
}

const CocktailFilterSidebar: React.FC<FilterOptions> = (options: FilterOptions) => {

    const [filters, setFilters] = useState<Filter[]>([]);

    return (
        <div id="mySidebar" className="sidebar">
            <h1>Filters</h1>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
        </div>
    );
}