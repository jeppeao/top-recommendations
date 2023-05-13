import TrackHeader from "./RecommendationsView/TrackHeader";
import TrackLabelBar from "./RecommendationsView/TrackLabelBar";
import TrackList from "./RecommendationsView/TrackList";

const RecommendationsView = (props: any) => {

  return (
    <div className="h-fit" style={{minWidth: '500px'}}>
      <TrackHeader />
      <TrackLabelBar />
      <TrackList tracks={props.tracks}/>
    </div>
  )
}

export default RecommendationsView;