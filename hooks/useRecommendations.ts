import { useEffect, useState } from "react";

const useRecommendations = () => {
  const [data, setData] = useState('none');
  const endpoint = '/api/spotify/getRecommendations';

  useEffect(() => {
    fetch('/api/spotify/getRecommendations?track=tre7')
      .then((res) => res.json())
      .then((res) => setData(res))   

  }, [])
  return {
    data
  }
}

export default useRecommendations;