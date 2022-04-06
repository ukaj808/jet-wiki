import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Divider } from '@mui/material';
import { SearchDrink, SearchIngredient } from '../../models/searchbox.api';
import { SearchItem } from '../../models/cocktail-search-home.api';
import styles from './styles.module.css';
import { Details, ItemDetailsView } from './item/ItemDetailsView.component';

export interface CatalogueOptions {
    items: SearchItem[];
}

const Catalogue: React.FC<CatalogueOptions> = function Catalogue(options: CatalogueOptions) {
  const { items } = options;

  const [selectedItem, setSelectedItem] = useState<Details | null>(null);

  const selectItem = (details: Details) => {
    setSelectedItem(() => details);
  };

  const buildCocktailDetails = (drink: SearchDrink): Details => ({
    title: drink.name,
    subTitle: drink.category,
    note: drink.glass,
    imageSource: drink.imageSource,
    longDescription: `Ingredients: ${drink.ingredients.join(', ')}`,
  });

  const buildIngredientDetails = (ingredient: SearchIngredient): Details => ({
    title: ingredient.name,
    subTitle: 'Ingredient',
    note: '',
    imageSource: ingredient.imageSource,
    longDescription: ingredient.description,
  });

  // todo: generify!!
  const getCatalogueItem = (category: string, item: any): JSX.Element | undefined => {
    if (category === 'drinks') {
      const drink: SearchDrink = item as SearchDrink;
      return (
        <ImageListItem
          sx={{ boxShadow: 3, maxWidth: '300px', maxHeight: '300px' }}
          key={drink.thumbnailSource}
        >
          <img
            src={drink.thumbnailSource}
            srcSet={drink.thumbnailSource}
            alt={drink.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={drink.name}
            sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: '800' }}
            actionIcon={(
              <IconButton
                onClick={() => selectItem(buildCocktailDetails(drink))}
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${drink.name}`}
              >
                <InfoIcon />
              </IconButton>
                        )}
          />
        </ImageListItem>
      );
    } if (category === 'ingredients') {
      const ingredient: SearchIngredient = item as SearchIngredient;
      return (
        <ImageListItem sx={{ boxShadow: 3, maxWidth: '300px', maxHeight: '300px' }} key={ingredient.imageSource}>
          <img
            src={ingredient.imageSource}
            srcSet={ingredient.imageSource}
            alt={ingredient.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={ingredient.name}
            sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: '800' }}
            actionIcon={(
              <IconButton
                onClick={() => selectItem(buildIngredientDetails(ingredient))}
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${ingredient.name}`}
              >
                <InfoIcon />
              </IconButton>
                        )}
          />
        </ImageListItem>
      );
    }
    return undefined;
  };

  const getCatalogueSectionItems = (searchItem: SearchItem): JSX.Element => (
    <ImageList key={searchItem.category} cols={3}>
      {searchItem.items.map((item) => getCatalogueItem(searchItem.category, item))}
    </ImageList>
  );

  const getCatalogueSection = (searchItem: SearchItem): JSX.Element | undefined => (
    <section className={styles.catalogueSection} key={`div$${searchItem.category}`}>

      <h1
        className={styles.category}
        key={`h1$${searchItem.category}`}
      >
        {searchItem.category.charAt(0).toUpperCase() + searchItem.category.slice(1)}
      </h1>

      {getCatalogueSectionItems(searchItem)}
      <Divider variant="middle" />
    </section>
  );

  return (
    <>
      {items?.filter((searchItem) => searchItem.items && searchItem.items.length > 0)
        .map((searchItem: SearchItem) => getCatalogueSection(searchItem))}
      {selectedItem && (
      <ItemDetailsView
        details={selectedItem}
        close={() => setSelectedItem(null)}
      />
      )}
    </>
  );
};

export default Catalogue;
