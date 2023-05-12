import TrackHeader from "./TrackFeed/TrackHeader";
import TrackLabelBar from "./TrackFeed/TrackLabelBar";
import TrackList from "./TrackFeed/TrackList";

const TrackFeed = (tracks: any, isRecommendations: boolean) => {

  if (isRecommendations) {

  }

  return (
    <div className="h-fit" style={{minWidth: '500px'}}>
      <TrackHeader />
      <TrackLabelBar />
      <TrackList tracks={tracks}/>
    </div>
  )
}

export default TrackFeed;