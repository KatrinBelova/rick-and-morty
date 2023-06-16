import { FC } from 'react';
import clsx from 'clsx';
import styles from './StatusSpeciesInfo.module.scss';

interface Props {
  status: Status;
  species: string;
}

const StatusSpeciesInfo: FC<Props> = ({ status, species }) => {
  const { statusIndicator, alive, dead, info } = styles;

  return (
    <div className={info}>
      <div
        className={clsx(statusIndicator, {
          [alive]: status === 'Alive',
          [dead]: status === 'Dead',
        })}
      />
      {status} - {species}
    </div>
  );
};

export default StatusSpeciesInfo;
