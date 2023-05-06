import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<{}[]>([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMySavedTracks().then((data) => {
        setPlaylists(data.body.items);
      })
    }
  }, [session, spotifyApi]);

  return (
    <div className="flex justify-center h-full w-full">
      SearchBar works!
    </div>
  );
}

export default SearchBar;