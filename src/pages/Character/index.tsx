import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCharacter } from 'api/character';
import styles from './Character.module.scss';
import StatusSpeciesInfo from 'components/common/StatusSpeciesInfo';
import axios from 'axios';
import NamesFromUrlsRenderer from 'components/NamesFromUrlsRenderer';
import Loader from 'components/common/Loader';

const Character: FC = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [person, setPerson] = useState({});
  const [locationData, setLocationData] = useState<Location>();
  const { name, image, status, species, origin, location, gender, episode } =
    person as Character;

  const { featureLabel, imageWrapper } = styles;

  const features = [
    { label: 'Gender', value: gender },
    {
      label: 'Location',
      render: () => {
        const { name, dimension, type, residents } = locationData || {};

        const locationProps = [name, dimension, type]
          .filter(Boolean)
          .join(', ');
        return (
          <>
            {locationProps}{' '}
            {residents ? `, Residents: ${residents?.length}` : ''}
          </>
        );
      },
    },
    { label: 'Origin', value: origin?.name },
  ];

  const getCharacterById = async (id: string) => {
    setIsLoading(true);

    const person = await getCharacter(id);
    setPerson(person);

    setIsLoading(false);
  };

  const getLocationDetails = async (url: string) => {
    try {
      const location = await axios.get(url).then((res) => res.data);
      setLocationData(location);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (id) getCharacterById(id);
  }, [id]);

  useEffect(() => {
    if (location?.url) getLocationDetails(location.url);
  }, [location?.url]);

  if (isLoading) return <Loader />;

  if (!Object.keys(person as Character)?.length)
    return (
      <main>
        <Link to="/">Back to Home</Link>
        <p>Sorry! Looks like no info about character is available now!</p>
      </main>
    );

  return (
    <main>
      <Link to="/">Back to Home</Link>

      {
        <>
          <div className={imageWrapper}>
            <img src={image} alt={name} />
          </div>
          <section>
            <h2>{name}</h2>
            {status && species && (
              <StatusSpeciesInfo status={status} species={species} />
            )}
            {features.map((item) => (
              <p key={item.label}>
                <span className={featureLabel}>{item.label}: </span>
                <span>{item.value || (item?.render && item.render())}</span>
              </p>
            ))}
            <div>
              <span className={featureLabel}>Episodes: </span>
              <NamesFromUrlsRenderer urls={episode} />
            </div>
          </section>
        </>
      }
    </main>
  );
};

export default Character;
