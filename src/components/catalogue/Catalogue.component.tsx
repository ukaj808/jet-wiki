import React, {useState} from "react";
import styles from "./styles.module.css";
import {SearchItem} from "../../models/cocktail-search-home.api";
import ImageList from "@mui/material/ImageList";
import {SearchDrink, SearchIngredient} from "../../models/searchbox.api";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import {Details, ItemDetailsView} from "./item/ItemDetailsView.component";

export interface CatalogueOptions {
    items: SearchItem[];
}

const Catalogue: React.FC<CatalogueOptions> = (options: CatalogueOptions) => {

    const [selectedItem, setSelectedItem] = useState<Details | null>(null);

    const selectItem = (details: Details) => {
        setSelectedItem(() => details);
    }

    const buildCocktailDetails = (drink: SearchDrink): Details => {
        return {
            title: drink.name,
            subTitle: drink.category,
            note: drink.glass,
            imageSource: drink.imageSource,
            longDescription: `Ingredients: ${drink.ingredients.join(', ')}`
        }
    }

    const buildIngredientDetails = (ingredient: SearchIngredient): Details => {
        return {
            title: ingredient.name,
            subTitle: "Ingredient",
            note: "",
            imageSource: ingredient.imageSource,
            longDescription: ingredient.description
        }
    }

    const getCatalogueSection = (searchItem: SearchItem): JSX.Element | undefined => {

        return <section key={'div$' + searchItem.category}>

            <h1 className={styles.yellow}
                key={'h1$' + searchItem.category}>{searchItem.category.charAt(0).toUpperCase() + searchItem.category.slice(1)}</h1>

            {getCatalogueSectionItems(searchItem)}

        </section>

    }

    const getCatalogueSectionItems = (searchItem: SearchItem): JSX.Element => {
        return <ImageList key={searchItem.category}>
            {searchItem.items.map(item => getCatalogueItem(searchItem.category, item))}
        </ImageList>
    }

    //todo: generify!!
    const getCatalogueItem = (category: string, item: any): JSX.Element | undefined => {
        if (category === "drinks") {
            let drink: SearchDrink = item as SearchDrink;
            return <ImageListItem key={drink.thumbnailSource}>
                <img
                    src={drink.thumbnailSource}
                    srcSet={drink.thumbnailSource}
                    alt={drink.name}
                    loading="lazy"
                />
                <ImageListItemBar
                    title={drink.name}
                    actionIcon={
                        <IconButton onClick={() => selectItem(buildCocktailDetails(drink))}
                            sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                            aria-label={`info about ${drink.name}`}>
                            <InfoIcon/>
                        </IconButton>
                    }
                />
            </ImageListItem>


        } else if (category === "ingredients") {

            let ingredient: SearchIngredient = item as SearchIngredient;
            return <ImageListItem key={ingredient.imageSource}>
                <img
                    src={ingredient.imageSource}
                    srcSet={ingredient.imageSource}
                    alt={ingredient.name}
                    loading="lazy"
                />
                <ImageListItemBar
                    title={ingredient.name}
                    actionIcon={
                        <IconButton
                            onClick={() => selectItem(buildIngredientDetails(ingredient))}
                            sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                            aria-label={`info about ${ingredient.name}`}>
                            <InfoIcon/>
                        </IconButton>
                    }
                />
            </ImageListItem>

        }
        return undefined;
    }

    return (
        <>
            {options.items?.filter(searchItem => searchItem.items && searchItem.items.length > 0)
                .map((searchItem: SearchItem) => getCatalogueSection(searchItem))}
            {selectedItem && <ItemDetailsView details={selectedItem} close={() => setSelectedItem(null)}/>}
        </>
    );
}

export {Catalogue}