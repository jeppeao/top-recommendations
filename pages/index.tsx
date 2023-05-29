import RecommendationsView from "@/components/RecommendationsView"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"
import { useRecoilState, useRecoilValue } from "recoil"
import { likedTracks } from "@/recoilAtoms/likedAtom"
import { useEffect } from "react"
import { recommendedTracks } from "@/recoilAtoms/recommendedAtom"
import useSavedTracks from "@/hooks/useSavedTracks"
import InitialView from "@/components/InitialView"


export default function Home() {
  const [liked, setLiked] = useRecoilState(likedTracks);
  const {tracks, isLoading} = useSavedTracks();
  const recommended = useRecoilValue(recommendedTracks);

  useEffect(() => {
    setLiked(tracks as any);
  }, [tracks])

  if (recommended.length > 0) {
  
    return (
      <RecommendationsView tracks={recommended} />
    )
  }

  return (
    <InitialView isLoading={isLoading} numberOfTracks={tracks.length}/>
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