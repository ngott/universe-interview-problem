import { useState, useEffect, useCallback } from "react";
import "./App.css";
import FeedList from "./FeedList";
import {
  FIXED_POST_MSG_HEIGHT,
  NUM_PAGES_TO_LOAD,
  PAGE_SIZE,
  PagedData,
} from "./util";

interface FeedProps {
  organization: string;
}

function Feed({ organization }: FeedProps) {
  const [lastPageLoaded, setLastPageLoaded] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Set data and virtual padding at the same time
  const [data, setData] = useState<PagedData>({
    bottomVirtualPadding: 0,
    topVirtualPadding: 0,
  } as PagedData);

  // accumulate page heights as the user scrolls
  const [offsetHeightAtPage, setOffsetHeightAtPage] = useState<{
    [x: number]: number;
  }>({ 0: 0 });
  // keep track of the largest padding
  const [largestOffsetSeen, setLargestOffsetSeen] = useState(0);

  // Reload page when user clicks on a new organization
  useEffect(() => {
    setLastPageLoaded(1);
    setPageCount(0);
    setData({ bottomVirtualPadding: 0, topVirtualPadding: 0 } as PagedData);
    setOffsetHeightAtPage({ 0: 0 });
    setLargestOffsetSeen(0);
    window.scrollTo(0, 0);
    console.log(organization);
  }, [organization]);

  // Fetch data for initial load
  useEffect(() => {
    if (data[1] === undefined && !isLoading) {
      fetchAllPostsCount();
      fetchData(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const fetchAllPostsCount = async () => {
    const response = await fetch(`/api/all-posts-count`);
    const results = await response.json();
    setPageCount(results.data / PAGE_SIZE);
  };

  const fetchData = useCallback(
    async (firstLoad: boolean) => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      setError(null);
      const pageToLoad = firstLoad ? 1 : lastPageLoaded + 1;

      try {
        const response = await fetch(
          `/api/paged-posts/${pageToLoad}?org=${organization}`,
        );
        const results = await response.json();

        const shouldVirtualizeOldData =
          lastPageLoaded >= NUM_PAGES_TO_LOAD &&
          (!data[lastPageLoaded + 1] || data[lastPageLoaded + 1].length === 0);

        setData((prevItems) => {
          if (shouldVirtualizeOldData) {
            prevItems[lastPageLoaded - NUM_PAGES_TO_LOAD + 1] = [];
            prevItems.topVirtualPadding =
              offsetHeightAtPage[lastPageLoaded - NUM_PAGES_TO_LOAD + 1] -
              FIXED_POST_MSG_HEIGHT;
          }
          if (
            lastPageLoaded > 1 &&
            prevItems[pageToLoad] &&
            offsetHeightAtPage[pageToLoad]
          ) {
            prevItems.bottomVirtualPadding =
              largestOffsetSeen - offsetHeightAtPage[pageToLoad];
          }
          prevItems[pageToLoad] = results.data;
          return prevItems;
        });

        if (!firstLoad) {
          setLastPageLoaded((prevPage) => prevPage + 1);
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, isLoading, lastPageLoaded, offsetHeightAtPage],
  );

  const fetchPrevious = async (oldPage: number) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/paged-posts/${oldPage}?org=${organization}`,
      );
      const results = await response.json();
      setData((prevItems) => {
        prevItems[oldPage] = results.data;
        prevItems[lastPageLoaded] = [];
        const newNullHeight =
          offsetHeightAtPage[oldPage - 1] - FIXED_POST_MSG_HEIGHT;
        prevItems.topVirtualPadding = newNullHeight < 0 ? 0 : newNullHeight;
        prevItems.bottomVirtualPadding =
          largestOffsetSeen - offsetHeightAtPage[oldPage + 2];
        return prevItems;
      });
      setLastPageLoaded((prevPage) => prevPage - 1);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = useCallback(() => {
    if (isLoading) {
      return;
    }
    setLargestOffsetSeen((prev) => {
      return document.body.offsetHeight > prev
        ? document.body.offsetHeight
        : prev;
    });
    if (
      offsetHeightAtPage[lastPageLoaded] !== largestOffsetSeen &&
      data[lastPageLoaded + 1] === undefined
    ) {
      setOffsetHeightAtPage((prev) => {
        prev[lastPageLoaded] =
          prev[lastPageLoaded] > document.body.offsetHeight
            ? prev[lastPageLoaded]
            : document.body.offsetHeight;
        return prev;
      });
    }
    if (
      pageCount >= lastPageLoaded &&
      window.innerHeight + Math.round(window.scrollY) >=
        document.body.offsetHeight - data.bottomVirtualPadding - 10
    ) {
      fetchData(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, isLoading, lastPageLoaded, pageCount]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, isLoading]);

  const handleScrollup = (pageNum: number) => {
    if (isLoading) {
      return;
    }
    const shouldFetchPrevious =
      (!data[pageNum - 1] || data[pageNum - 1].length === 0) &&
      lastPageLoaded === pageNum + NUM_PAGES_TO_LOAD - 1;
    if (pageNum > 1 && shouldFetchPrevious) {
      fetchPrevious(pageNum - 1);
    }
  };

  return (
    <div className="list-body">
      <FeedList handleScrollup={handleScrollup} data={data} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default Feed;
