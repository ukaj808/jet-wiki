import React from "react";
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

    apply(): void;
}

const CocktailFilterSidebar: React.FC<FilterOptions> = (options: FilterOptions) => {

    return (
        <div className={options.show ? styles.sidebar : styles.collapsed}>
            <a className={styles.closeButton} onClick={options.toggle}>&times;</a>
            {options.filters && Array.from(options.filters.entries())
                .filter(([key, val]) => val != null && val.size > 0).map(([key, val]) => {

                    return <div key={key}>

                        <h3>{key}</h3>

                        {
                            <ul key={key}>

                                {Array.from(val).map((filterValue) =>

                                    <li key={filterValue}>
                                        <input type="checkbox" name={filterValue} value={filterValue}/>
                                        <label htmlFor={filterValue}>{filterValue}</label>
                                    </li>

                                )}
                            </ul>
                        }
                    </div>


                })}
            <button onClick={options.apply}>Apply Filters</button>
        </div>
    );
}

export {CocktailFilterSidebar}