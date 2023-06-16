import { FC, useEffect, useRef, useState } from 'react';
import { getCharacterList } from 'api/character';
import Loader from 'components/common/Loader';
import Actor from '../Actor';
import styles from './ActorList.module.scss';
import Pagination from 'components/common/Pagination';

const ActorList: FC = () => {
  const [actors, setActors] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const resultsContainerRef = useRef<HTMLDivElement | null>(null);

  const getListByPage = async (page: number) => {
    setIsLoading(true);

    const {
      info: { pages },
      results,
    } = await getCharacterList(page);

    setActors(results);
    setTotalPages(pages);

    if (page) setCurrentPage(page);

    setIsLoading(false);
  };

  const handleScroll = (ref: HTMLDivElement) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    getListByPage(currentPage);
  }, []);

  useEffect(() => {
    if (resultsContainerRef.current) handleScroll(resultsContainerRef.current);
  }, [currentPage]);

  if (isLoading) return <Loader />;

  if (!actors?.length)
    return (
      <p className={styles?.errorMessage}>
        Looks like no characters are available now!
      </p>
    );

  return (
    <section>
      <div ref={resultsContainerRef} style={{ minHeight: '100vh' }}>
        <ul className={styles?.list}>
          {actors.map((actor: Character) => (
            <Actor features={actor} key={actor?.id} />
          ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          listLength={actors?.length}
          getListByPage={getListByPage}
          totalPages={totalPages}
        />
      </div>
    </section>
  );
};

export default ActorList;
