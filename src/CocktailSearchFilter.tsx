import React, {useState} from "react";

export interface Filter {
    category: string;
    value: string;
}

export interface FilterOptions {

}

const CocktailSearchFilter: React.FC<FilterOptions> = (options: FilterOptions) => {

    const [filters, setFilters] = useState<Filter[]>([]);

    return (
        <>
        </>
    );
}