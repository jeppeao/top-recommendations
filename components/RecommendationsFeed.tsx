import Tooltip from "./Tooltip";
import RecommendationsHeader from "./recommendationsFeed/RecommendationsHeader";
import RecommendationsLabelBar from "./recommendationsFeed/RecommendationsLabelBar";

const RecommendationsFeed = () => {

  return (
    <div>
      <RecommendationsHeader />
      <RecommendationsLabelBar/>
      <Tooltip message={"tooltip"} children={(<div>hello</div>)}/>
    </div>
  )
}

export default RecommendationsFeed;