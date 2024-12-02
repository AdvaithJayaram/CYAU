import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseInfiniteScrollOptions<T> {
  fetchData: (page: number) => Promise<T[]>;
  initialPage?: number;
  pageSize?: number;
}

export function useInfiniteScroll<T>({
  fetchData,
  initialPage = 1,
  pageSize = 10,
}: UseInfiniteScrollOptions<T>) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView]);

  const loadMore = async () => {
    try {
      setLoading(true);
      setError(null);
      const newData = await fetchData(page);
      
      if (newData.length < pageSize) {
        setHasMore(false);
      }
      
      setData(prev => [...prev, ...newData]);
      setPage(prev => prev + 1);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData([]);
    setPage(initialPage);
    setHasMore(true);
    setError(null);
  };

  return {
    data,
    loading,
    error,
    hasMore,
    loadMoreRef: ref,
    reset,
  };
}