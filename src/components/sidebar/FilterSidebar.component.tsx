import React, {useState} from "react";
import styles from "./styles.module.css";
import ReactDOM from "react-dom";

export interface Filter {
    id: string;
    value: string;
}

export interface FilterOptions {
    searchCategory: string;
    // Key: Category Name, Value: Filters and their attribute id
    filters: Map<string, Set<string>>;

    close(): void;

    apply(selectedFilters: Map<string, Set<string>>): void;

    clear(): void;
}

const FilterSidebar: React.FC<FilterOptions> = (options: FilterOptions) => {

    const [selectedFilters, setSelectedFilters] = useState<Map<string, Set<string>>>(new Map());

    const handleChange = (category: string, {
                              target: {name},
                          }: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) =>
        setSelectedFilters((prev) => {
            let result = new Map(prev)

            let selected = result.get(category);

            if (selected == null){
                result.set(category, new Set([name]));
            }
            else if(selected.has(name)) {
                selected.delete(name);
                if (selected.size === 0) result.delete(category);
            } else{
                selected.add(name);
            }

            return result;
        });

    const getFilterChecked = (category: string, filterValue: string): boolean => {
        let categoryValues: Set<string> | undefined = selectedFilters.get(category);
        return categoryValues != null && categoryValues.has(filterValue);
    }

    const clearFilters = () => {
        setSelectedFilters(() => new Map());
        options.clear();
    }

    const getPossibleFilters = () : JSX.Element[] => {
        return options.filters && Array.from(options.filters.entries())
                .filter(([key, val]) => val != null && val.size > 0).map(([key, val]) => {

                    return <div key={key}>

                        <h3>{key}</h3>

                        {
                            <ul key={key} className={styles.filters}>

                                {Array.from(val).map((filterValue, index) =>

                                    <li key={filterValue + index}>
                                        <input type="checkbox" name={filterValue}
                                               checked={getFilterChecked(key, filterValue)}
                                               onChange={(input) => handleChange(key, input)}/>
                                        <label htmlFor={filterValue}>{filterValue}</label>
                                    </li>

                                )}
                            </ul>
                        }
                    </div>


                });
    }


    return ReactDOM.createPortal(
        <div className={styles.sidebar}>

            <a className={styles.closeButton} onClick={options.close}>&times;</a>

            {getPossibleFilters()}

            <button onClick={() => options.apply(selectedFilters)} disabled={selectedFilters.size === 0}>Apply Filters</button>
            <button onClick={clearFilters} disabled={selectedFilters.size === 0}>Clear Filters</button>
        </div>,
        document.getElementById('overlay-portal')!
    );
}

export {FilterSidebar}