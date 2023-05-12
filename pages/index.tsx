import TrackFeed from "@/components/TrackFeed"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"
import { useRecoilState, useRecoilValue } from "recoil"
import { currentTracks } from "@/recoilAtoms/currentTracksAtom"
import { likedTracks } from "@/recoilAtoms/likedAtom"
import useSavedTracks from "@/hooks/useSavedTracks"
import { useEffect } from "react"

export default function Home() {
  const tracks = useRecoilValue(currentTracks);
  const [liked, setLiked] = useRecoilState(likedTracks);
   const { data } = useSavedTracks() || '';

  useEffect(() => {
    setLiked(data);
  }, [data])

  return (
    <TrackFeed tracks={liked} isRecommendations={false}/>
  )

  if (tracks.length > 0) {
    return (
      <TrackFeed tracks={liked} isRecommendations={false}/>
    )
  }

  return (
    <h1 className="min-h-full">Add some tracks</h1>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions )

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}