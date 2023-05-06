import useSavedTracks from "@/hooks/useSavedTracks";

const Tracklist = () => {
  const { data } = useSavedTracks() || '';
  console.log(data);
  return (
    <div>
      { data && data.map((item: any) => { return (
        <div>{item.track.name}</div>
      )})
      
      }
    </div>
  );
}

export default Tracklist