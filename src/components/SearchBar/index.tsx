import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { getCharacterList } from 'api/character';
import clsx from 'clsx';
import { useDebounce } from 'hooks/useDebounce';
import styles from './SearchBar.module.scss';
import Button from 'components/common/Button';
import Loader from 'components/common/Loader';

const SearchBar: FC = () => {
  const { search, results, hidden, loadBtn } = styles;
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

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

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
      setIsLoading(true);
      const suggestions = await fetchData(currentPage, value);

      setSuggestions(suggestions);

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
  };

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
          [hidden]: hideSuggestions || !suggestions?.length,
        })}
      >
        <ul>
          {suggestions &&
            suggestions?.length > 0 &&
            suggestions.map((suggestion: Character, idx) => (
              <li key={idx}>
                <a href={`/character/${suggestion?.id}`}>{suggestion?.name}</a>
              </li>
            ))}
        </ul>
        {isLoading && <Loader />}
        {totalPages !== currentPage && (
          <Button
            className={loadBtn}
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
