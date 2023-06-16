import { FC, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Loader from '../common/Loader';
import styles from './NamesFromUrlsRenderer.module.scss';

interface Props {
  urls?: string[];
}

interface NameResponse {
  name: string;
}

const NamesFromUrlsRenderer: FC<Props> = ({ urls }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState<string[]>([]);

  const fetchNames = async () => {
    const namePromises: Promise<string>[] = [];

    urls?.forEach((url: string) => {
      namePromises.push(
        axios
          .get<NameResponse>(url)
          .then((response: AxiosResponse<NameResponse>) => response.data.name)
      );
    });

    try {
      const resolvedNames: string[] = await Promise.all(namePromises);
      setNames(resolvedNames);
    } catch (error) {
      console.error('Error fetching names:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (urls) fetchNames();
  }, [urls]);

  if (isLoading) return <Loader />;

  return (
    <ul className={styles.list}>
      {names.map((name: string, index: number) => (
        <li key={index} className={styles.item}>
          {name}
        </li>
      ))}
    </ul>
  );
};

export default NamesFromUrlsRenderer;
