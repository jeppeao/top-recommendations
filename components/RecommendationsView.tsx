import { useState } from "react";
import TrackHeader from "./RecommendationsView/TrackHeader";
import TrackLabelBar from "./RecommendationsView/TrackLabelBar";
import TrackList from "./RecommendationsView/TrackList";

const RecommendationsView = (props: any) => {
  const [scrolledPastHeader, setScrolledPastHeader] = 
    useState<boolean>(false);

  const handleScroll = (e: any) => {
    if (!scrolledPastHeader && e.target.scrollTop > 295) {
      setScrolledPastHeader(true);
    }
    if (scrolledPastHeader && e.target.scrollTop < 295) {
      setScrolledPastHeader(false);

    }
  }

  return (
    <div 
      className="
        max-h-full
        h-[100vh]
        overflow-y-scroll
        overflow-x-hidden
      " 
      style={{minWidth: '500px'}}
      onScroll={handleScroll}
    >
      <TrackHeader tracks={props.tracks}/>
      <TrackLabelBar 
        sticky={scrolledPastHeader} 
        tracks={props.tracks}
      />
      <TrackList tracks={props.tracks}/>
    </div>
  )
}

export default RecommendationsView;