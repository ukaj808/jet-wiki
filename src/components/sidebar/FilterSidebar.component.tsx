import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';

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

const FilterSidebar: React.FC<FilterOptions> = function FilterSidebar(options: FilterOptions) {
  const [selectedFilters, setSelectedFilters] = useState<Map<string, Set<string>>>(new Map());

  const handleChange = (category: string, {
    target: { name },
  }: React.ChangeEvent<HTMLInputElement>) => setSelectedFilters((prev) => {
    const result = new Map(prev);

    const selected = result.get(category);

    if (selected == null) {
      result.set(category, new Set([name]));
    } else if (selected.has(name)) {
      selected.delete(name);
      if (selected.size === 0) result.delete(category);
    } else {
      selected.add(name);
    }

    return result;
  });

  const getFilterChecked = (category: string, filterValue: string): boolean => {
    const categoryValues: Set<string> | undefined = selectedFilters.get(category);
    return categoryValues != null && categoryValues.has(filterValue);
  };

  const clearFilters = () => {
    setSelectedFilters(() => new Map());
    options.clear();
  };

  const getPossibleFilters = () : JSX.Element[] => Array.from(options.filters?.entries())
    .filter(([, val]) => val != null && val.size > 0).map(([filterCategory, values]) => (
      <div key={filterCategory}>

        <h3>{filterCategory}</h3>

        <ul key={filterCategory} className={styles.filters}>

          {Array.from(values).map((filterValue) => (
            <li key={filterValue}>
              <input
                type="checkbox"
                name={filterValue}
                checked={getFilterChecked(filterCategory, filterValue)}
                onChange={(input) => handleChange(filterCategory, input)}
              />
              <label htmlFor={filterValue}>{filterValue}</label>
            </li>
          ))}
        </ul>
      </div>
    ));

  return ReactDOM.createPortal(
    <div className={styles.sidebar}>

      <button type="button" className={styles.closeButton} onClick={options.close}>&times;</button>

      {getPossibleFilters()}

      <button
        type="button"
        onClick={() => options.apply(selectedFilters)}
        disabled={selectedFilters.size === 0}
      >
        Apply Filters
      </button>
      <button
        type="button"
        onClick={clearFilters}
        disabled={selectedFilters.size === 0}
      >
        Clear Filters
      </button>
    </div>,
        document.getElementById('overlay-portal')!,
  );
};

export default FilterSidebar;
