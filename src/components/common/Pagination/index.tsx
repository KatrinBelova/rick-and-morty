import { FC } from 'react';
import styles from './Pagination.module.scss';

interface Props {
  currentPage: number;
  totalPages: number;
  listLength: number;
  getListByPage: (page: number) => Promise<void>;
}

interface ItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | number;
  span?: boolean;
}

const PaginationItem: FC<ItemProps> = ({ text, span, ...rest }) => {
  return (
    <li>{span ? <span>{text}</span> : <button {...rest}>{text}</button>}</li>
  );
};

const Pagination: FC<Props> = ({
  currentPage,
  totalPages,
  listLength,
  getListByPage,
}) => {
  const { paginationWrapper, pagination, activeBtn, hideOnMobile } = styles;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      getListByPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    getListByPage(currentPage + 1);
  };

  if (!listLength) return null;

  return (
    <div className={paginationWrapper}>
      <ul className={pagination}>
        <PaginationItem
          className={hideOnMobile}
          text="Previous"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        />

        {currentPage !== 1 && (
          <>
            <PaginationItem text="1" onClick={() => getListByPage(1)} />
            {currentPage !== 2 && (
              <>
                <PaginationItem span text="..." />
                <PaginationItem
                  text={currentPage - 1}
                  onClick={handlePrevPage}
                />
              </>
            )}
          </>
        )}
        <PaginationItem className={activeBtn} text={currentPage} />
        {currentPage !== totalPages && (
          <>
            {currentPage !== totalPages - 1 && (
              <>
                <PaginationItem
                  onClick={handleNextPage}
                  text={currentPage + 1}
                />
                <PaginationItem span text="..." />
              </>
            )}
            <PaginationItem
              onClick={() => getListByPage(totalPages)}
              text={totalPages}
            />
          </>
        )}
        <PaginationItem
          className={hideOnMobile}
          text="Next"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        />
      </ul>
    </div>
  );
};

export default Pagination;
