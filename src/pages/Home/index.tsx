import ActorList from 'components/ActorList';
import { FC } from 'react';
import styles from './Home.module.scss';

const Home: FC = () => {
  const { heading } = styles;
  return (
    <main>
      <h1 className={heading}>The Rick and Morty</h1>
      <ActorList />
    </main>
  );
};

export default Home;
