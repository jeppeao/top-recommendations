import useGenres from "@/hooks/useGenres";
import { GenreChoice, getRankedRecommendations } from "@/libs/spotify";
import { likedTracks } from "@/recoilAtoms/likedAtom";
import { recommendedTracks } from "@/recoilAtoms/recommendedAtom";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import DualRangeSlider from "../DualRangeSlider";
import GenreSelector from "./GenreSelector";
import SongSelector from "./SongSelector";

const OptionsView = () => {
  const tracks = useRecoilValue(likedTracks);
  const [recommended, setRecommended] = useRecoilState(recommendedTracks);
  const [isLoading, setIsLoading] = useState(false);
  const [minPopularity, setMinPopularity] = useState(0);
  const [maxPopularity, setMaxPopularity] = useState(100);
  const [chosenGenres, setChosenGenres] = useState<GenreChoice[]>([]);
  const [chosenSongs, setChosenSongs] = useState<any>(tracks);
  const genres = useGenres() || [];

  useEffect(() => {
    if (genres.length > 0) {
      setChosenGenres(genres);
    }
  }, [genres]);

  useEffect(() => {
    if (tracks.length > 0 ) {
      setChosenSongs(tracks);
    }
  }, [tracks]);

  const onResetSongs = () => {
    setChosenSongs(tracks);
  }

  const onClearSongs = () => {
    setChosenSongs([]);
  }

  const onSelectSong = (song:any) => {
    const isChosen = chosenSongs.some((i: any) =>
      i.track.id === song.track.id
    );

    isChosen 
      ? setChosenSongs(chosenSongs.filter(
        (s: any) => s.track.id !== song.track.id
      ))
      : setChosenSongs([...chosenSongs, song]);
  }

  const onSelectGenre = (genreChoice: GenreChoice) => {
    const chosen = chosenGenres.map((g: GenreChoice) => {
      return (g.genre === genreChoice.genre ? genreChoice: g)
    });

    if (chosen.filter((g: GenreChoice) => g.selected === true).length > 4) {
      return;
    }
    setChosenGenres(chosen);
  }

  const onRemoveAllGenres = () => {
    setChosenGenres(chosenGenres.map((g: any) => {
      return {...g, selected: false}
    }));
  }
  
  const genreString = chosenGenres
    .filter((g: any) => g.selected === true)
    .map((g: any) => g.genre)
    .join(",");

  const recommendationsOptions = {
    "max_popularity": `${maxPopularity}`,
    "min_popularity": `${minPopularity}`,
    "seed_genres": genreString
  }

  const onPopularitySliderChange = (min: number, max: number) => {
    if (min !== minPopularity) {
      setMinPopularity(min);
    }
    if (max !== maxPopularity) {
      setMaxPopularity(max);
    }
  }

  const onGetRecommendations = async () => {
    setIsLoading(true);

    const ranked = await getRankedRecommendations(
      chosenSongs.slice(0,20), 
      tracks, 
      recommendationsOptions
    );
    setRecommended(ranked as any);
    setIsLoading(false);
  }

  return (
    <div className="
      flex
      flex-col
      gap-6
      justify-start
      items-center
      h-full
      w-full
      mt-6
    ">
      <button 
        className="
          border-neutral-600
          border-2
          text-violet-400
          text-xl
          w-4/5
          p-2
          my-2
          rounded-full
          hover:border-neutral-500
          hover:text-violet-300
          "
        onClick={onGetRecommendations}
      >
        {isLoading ? "Loading..." : "Load Suggestions"}
      </button>
      <DualRangeSlider 
        min={0} 
        max={100} 
        labels={{min:"Cold", max:"Hot", label:"Popularity range"}}
        onChange={onPopularitySliderChange}
      />
      <GenreSelector 
        genreChoices={chosenGenres} 
        onSelect={onSelectGenre}
        onRemoveAll={onRemoveAllGenres}
      />
      <SongSelector 
        songChoices={chosenSongs} 
        onSelect={onSelectSong}
        onReset={onResetSongs}
        songs={tracks}
        onClearSongs={onClearSongs}
      />
    </div>
  );
}

export default OptionsView;