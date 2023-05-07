import RecommendationsHeader from "./recommendationsFeed/RecommendationsHeader";
import RecommendationsLabelBar from "./recommendationsFeed/RecommendationsLabelBar";
import TrackList from "./recommendationsFeed/TrackList";

const RecommendationsFeed = () => {

  return (
    <div className="h-fit" style={{minWidth: '500px'}}>
      <RecommendationsHeader />
      <RecommendationsLabelBar/>
      <TrackList />
    </div>
  )
}

export default RecommendationsFeed;