import { FC } from 'react';
import LoaderIcon from 'assets/icons/LoaderIcon';
import styles from './Loader.module.scss';

const Loader: FC = () => {
  return (
    <div className={styles?.loader}>
      <LoaderIcon />
    </div>
  );
};

export default Loader;
