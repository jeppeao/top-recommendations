import TrackCard from "./TrackCard";

const TrackList = (props: any) => {

  return (
    <div className="py-4 px-4">
      {props.tracks && props.tracks.map((item: any, i: number) => {
        return <TrackCard track={item.recommendation} key={i} order={i} hits={item.count}/>
      })}
    </div>
  );
}

export default TrackList