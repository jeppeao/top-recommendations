import Tooltip from "./Tooltip";
import Tracklist from "./Tracklist";
import RecommendationsHeader from "./recommendationsFeed/RecommendationsHeader";
import RecommendationsLabelBar from "./recommendationsFeed/RecommendationsLabelBar";

const RecommendationsFeed = () => {

  return (
    <div>
      <RecommendationsHeader />
      <RecommendationsLabelBar/>
      <Tracklist />
    </div>
  )
}

export default RecommendationsFeed;