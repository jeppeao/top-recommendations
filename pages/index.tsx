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
  const data = useSavedTracks();
  const recommended = useRecoilValue(recommendedTracks);

  useEffect(() => {
    setLiked(data as any);
  }, [data])

  if (recommended.length > 0) {
  
    return (
      <RecommendationsView tracks={recommended} />
    )
  }

  return (
    <InitialView/>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions )
  console.log(session)
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