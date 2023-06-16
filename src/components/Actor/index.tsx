import { FC } from 'react';
import { Link } from 'react-router-dom';
import StatusSpeciesInfo from 'components/common/StatusSpeciesInfo';
import styles from './Actor.module.scss';

interface Props {
  features: Character;
}

const Actor: FC<Props> = ({ features }) => {
  const { id, name, image, status, species, location } = features || {};
  const { item, info } = styles;

  return (
    <li className={item}>
      <Link to={`/character/${id}`}>
        <div>
          <img src={image} alt={name} />
        </div>
        <div className={info}>
          <h3>{name}</h3>
          <StatusSpeciesInfo status={status} species={species} />
          <p>
            Last known location: <span>{location?.name}</span>
          </p>
        </div>
      </Link>
    </li>
  );
};

export default Actor;
