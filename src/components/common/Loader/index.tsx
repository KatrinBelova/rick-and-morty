import { FC } from 'react';
import LoaderIcon from 'assets/icons/LoaderIcon';
import styles from './Loader.module.scss';

const Loader: FC = () => {
  const { loader } = styles;
  return (
    <div className={loader}>
      <LoaderIcon />
    </div>
  );
};

export default Loader;
