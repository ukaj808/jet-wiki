import React from 'react';
import ReactDOM from 'react-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import styles from './styles.module.css';

export interface Details {
    title: [string, string];
    subTitle?: [string, string];
    note?: [string, string];
    imageSource: [string, string];
    longDescription?: [string, string];
}

export interface ItemDetailsOptions {
    details: Details;
    close(): void;
}

const ItemDetailsView: React.FC<ItemDetailsOptions> = (options: ItemDetailsOptions) => ReactDOM.createPortal(
  <div className={styles.overlay}>
    <div className={styles.info}>
      <table className={styles.infoTable}>
        <tbody>
          <th className={styles.header} colSpan={2}>
            <div className={styles.itemTitle}>
              <span>{options.details?.title?.at(1)}</span>
              <button type="button" className={styles.closeButton} onClick={options.close}>
                <KeyboardBackspaceIcon fontSize="large" />
              </button>
            </div>
          </th>
          <tr>
            <td className={styles.image} colSpan={2}>
              <img
                className={styles.itemImage}
                src={options.details?.imageSource[0]}
                alt={options.details?.imageSource[1]}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">{options.details?.subTitle?.at(0)}</th>
            <td>{options.details?.subTitle?.at(1)}</td>
          </tr>
          <tr>
            <th scope="row">{options.details?.note?.at(0)}</th>
            <td>{options.details?.note?.at(1)}</td>
          </tr>
          <tr>
            <th scope="row">{options.details?.longDescription?.at(0)}</th>
            <td>{options.details?.longDescription?.at(1)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>,
        document.getElementById('overlay-portal')!,
);

export { ItemDetailsView };
