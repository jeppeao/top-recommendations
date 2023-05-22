import useUserProfile from "@/hooks/useUserProfile";
import TrackCard from "./TrackCard";

const TrackList = (props: any) => {

  const userProfile = useUserProfile();
  const userProduct = userProfile?.product;

  console.log(userProduct)
  return (
    <div className="py-4 px-4">
      {props.tracks && props.tracks.map((item: any, i: number) => {
        return <TrackCard 
          track={item.recommendation}
          key={i}
          order={i}
          hits={item.count}
          userProduct={userProduct}
        />
      })}
    </div>
  );
}

export default TrackList