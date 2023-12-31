import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  className?: string;
}

const Button: FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
  className,
  ...rest
}) => {
  const { button } = styles;

  return (
    <button className={clsx(button, className)} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
