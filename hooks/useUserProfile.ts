import { spotifyGetUserProfile } from "@/libs/spotify";
import { useEffect, useState } from "react"
import { UserProfile } from "@/libs/spotify";

const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>();

  useEffect(() => {
    const getUser = async () => {
      const response = await spotifyGetUserProfile();
      if (response.status === 200) {
        const json = await response.json();
        setProfile(json);
      }
    }  
    getUser();  
  }, [])

  return profile;
}

export default useUserProfile