import RecommendationsFeed from "@/components/RecommendationsFeed"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"
export default function Home() {

  return (
    <RecommendationsFeed/>
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