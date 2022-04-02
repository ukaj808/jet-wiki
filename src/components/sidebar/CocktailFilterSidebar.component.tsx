import React, {useState} from "react";
import styles from "./styles.module.css";

export interface Filter {
    id: string;
    value: string;
}

export interface FilterOptions {
    searchCategory: string;
    show: boolean;
    // Key: Category Name, Value: Filters and their attribute id
    filters: Map<string, Set<string>>;

    toggle(): void;

    apply(selectedFilters: Map<String, Set<string>>): void;

    clear(): void;
}

const CocktailFilterSidebar: React.FC<FilterOptions> = (options: FilterOptions) => {

    const [selectedFilters, setSelectedFilters] = useState<Map<string, Set<string>>>(new Map());

    const handleChange = (category: string, {
                              target: {name},
                          }: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) =>
        setSelectedFilters((prev) => {

            let selected = prev.get(category);

            if (selected == null){
                prev.set(category, new Set([name]));
            }
            else if(selected.has(name)) {
                selected.delete(name);
                if (selected.size === 0) prev.delete(category);
            } else{
                selected.add(name);
            }

            return prev;
        });

    const getFilterValue = (category: string, filterValue: string): number => {
        let categoryValues: Set<string> | undefined = selectedFilters.get(category);
        if (categoryValues != null && categoryValues.has(filterValue)) return 1;
        return 0;
    }

    const clearFilters = () => {
        setSelectedFilters(() => new Map())
        options.clear();
    }

    const getPossibleFilters = () : JSX.Element[] => {
        return options.filters && Array.from(options.filters.entries())
                .filter(([key, val]) => val != null && val.size > 0).map(([key, val]) => {

                    return <div key={key}>

                        <h3>{key}</h3>

                        {
                            <ul key={key}>

                                {Array.from(val).map((filterValue, index) =>

                                    <li key={filterValue + index}>
                                        <input type="checkbox" name={filterValue}
                                               value={getFilterValue(key, filterValue)}
                                               onChange={(input) => handleChange(key, input)}/>
                                        <label htmlFor={filterValue}>{filterValue}</label>
                                    </li>

                                )}
                            </ul>
                        }
                    </div>


                })
    }


    return (
        <div className={options.show ? styles.sidebar : styles.collapsed}>

            <a className={styles.closeButton} onClick={options.toggle}>&times;</a>

            {getPossibleFilters()}

            <button onClick={() => options.apply(selectedFilters)}>Apply Filters</button>
            <button onClick={clearFilters}>Clear Filters</button>
        </div>
    );
}

export {CocktailFilterSidebar}