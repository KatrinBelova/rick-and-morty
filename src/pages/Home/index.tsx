import ActorList from 'components/ActorList';
import { FC } from 'react';
import styles from './Home.module.scss';

const Home: FC = () => {
  return (
    <main>
      <h1 className={styles?.heading}>The Rick and Morty</h1>
      <ActorList />
    </main>
  );
};

export default Home;
