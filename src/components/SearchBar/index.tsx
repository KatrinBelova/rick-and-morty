import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { getCharacterList } from 'api/character';
import clsx from 'clsx';
import { useDebounce } from 'hooks/useDebounce';
import styles from './SearchBar.module.scss';
import Button from 'components/common/Button';
import Loader from 'components/common/Loader';

const SearchBar: FC = () => {
  const { search, results, hidden, loadBtn, errorMessage } = styles;
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const searchComponentRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      searchComponentRef.current &&
      !searchComponentRef.current.contains(event.target as Node)
    ) {
      setHideSuggestions(true);
    }
  };

  const fetchData = async (page: number, name: string) => {
    const {
      results,
      info: { pages },
    } = await getCharacterList(page, name);

    setTotalPages(pages);
    return results;
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    const suggestions = await fetchData(currentPage + 1, value);

    setSuggestions((prevState) => prevState.concat(suggestions));
    setCurrentPage((prevPage) => prevPage + 1);

    setIsLoading(false);
  };

  useDebounce(
    async () => {
      if (value) {
        const suggestions = await fetchData(currentPage, value);
        setSuggestions(suggestions);
      } else {
        setSuggestions([]);
      }

      setIsLoading(false);
    },
    1000,
    [value]
  );

  const handleFocus = () => {
    setHideSuggestions(false);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsLoading(true);
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className={search} ref={searchComponentRef}>
      <input
        type="search"
        className={styles['textbox']}
        placeholder="Search character..."
        value={value}
        onChange={handleSearchInputChange}
        onFocus={handleFocus}
      />
      <div
        className={clsx(results, {
          [hidden]: hideSuggestions || !value,
        })}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <ul>
            {suggestions.length > 0 ? (
              <>
                {suggestions.map(({ id, name }: Character) => (
                  <li key={id}>
                    <a href={`/character/${id}`}>{name}</a>
                  </li>
                ))}
              </>
            ) : (
              <li className={errorMessage}>
                Looks like no characters were found
              </li>
            )}
          </ul>
        )}
        {totalPages !== currentPage && (
          <Button
            className={clsx(loadBtn, {
              [hidden]: suggestions.length === 0,
            })}
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
