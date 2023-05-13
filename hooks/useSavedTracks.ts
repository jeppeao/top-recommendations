import fetcher from "@/libs/fetcher";
import useSWRImmutable from 'swr';

const useSavedTracks = () => {
  const url = '/api/spotify/getSavedTracks';
  let { data, error, isLoading, mutate } = useSWRImmutable(url, fetcher);
  
  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export default useSavedTracks;








