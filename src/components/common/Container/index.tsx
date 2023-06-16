import { FC, PropsWithChildren } from 'react';
import styles from './Container.module.scss';
import clsx from 'clsx';

interface Props {
  className?: string;
}

const Container: FC<PropsWithChildren<Props>> = ({ children, className }) => {
  return <div className={clsx(styles.container, className)}>{children}</div>;
};

export default Container;
