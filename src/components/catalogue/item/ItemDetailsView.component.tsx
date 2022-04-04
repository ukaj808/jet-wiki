import React from "react";
import styles from "./styles.module.css";
import ReactDOM from "react-dom";

export interface Details {
    title: string;
    subTitle: string;
    note: string;
    imageSource: string;
    longDescription: string;
}

export interface ItemDetailsOptions {
    details: Details;
    close(): void;
}

const ItemDetailsView: React.FC<ItemDetailsOptions> = (options: ItemDetailsOptions) => {

    return ReactDOM.createPortal(
        <div className={styles.overlay}>
            <div className={styles.overlayContent}>
                <a className={styles.closeButton} onClick={options.close}>&times;</a>
                <h1>{options.details?.title}</h1>
                <h2>{options.details?.subTitle}</h2>
                <h3>{options.details?.note}</h3>
                <img src={options.details?.imageSource} alt={options.details?.title}/>
                <p>{options.details?.longDescription}</p>
            </div>
        </div>,
        document.getElementById('overlay-portal')!
    );
}

export {ItemDetailsView}