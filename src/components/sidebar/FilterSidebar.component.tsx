import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel,
} from '@mui/material';
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
    console.log(result);
    const selected = result.get(category);
    console.log(`selected: ${selected}`);
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
      <FormGroup key={filterCategory}>
        <FormLabel component="legend" sx={{ fontFamily: "'Roboto', sans-serif" }}>{filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)}</FormLabel>

        <ul key={filterCategory} className={styles.filters}>
          {Array.from(values).map((filterValue) => (
            <FormControlLabel
              sx={{ fontFamily: "'Roboto', sans-serif" }}
              key={filterValue}
              control={(
                <Checkbox
                  name={filterValue}
                  checked={getFilterChecked(filterCategory, filterValue)}
                  onChange={(input) => handleChange(filterCategory, input)}
                />
                )}
              label={filterValue}
            />
          ))}
        </ul>

      </FormGroup>
    ));

  return ReactDOM.createPortal(
    <div className={styles.sidebar}>

      <button type="button" className={styles.closeButton} onClick={options.close}>
        <KeyboardBackspaceIcon fontSize="large" />
      </button>

      {getPossibleFilters()}

      <div>
        <button
          className={styles.filterActionBtn}
          type="button"
          onClick={() => options.apply(selectedFilters)}
          disabled={selectedFilters.size === 0}
        >
          Apply Filters
        </button>
        <button
          className={styles.filterActionBtn}
          type="button"
          onClick={clearFilters}
          disabled={selectedFilters.size === 0}
        >
          Clear Filters
        </button>
      </div>
    </div>,
        document.getElementById('overlay-portal')!,
  );
};

export default FilterSidebar;
