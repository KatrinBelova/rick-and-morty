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
  const [isLoading, setIsLoading] = useState(false);
  const [names, setNames] = useState<string[]>([]);
  const { list, item } = styles;

  const fetchNames = async () => {
    setIsLoading(true);
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
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (urls) fetchNames();
  }, [urls]);

  if (isLoading) return <Loader />;

  return (
    <ul className={list}>
      {names &&
        names?.length > 0 &&
        names.map((name: string, index: number) => (
          <li key={index} className={item}>
            {name}
          </li>
        ))}
    </ul>
  );
};

export default NamesFromUrlsRenderer;
