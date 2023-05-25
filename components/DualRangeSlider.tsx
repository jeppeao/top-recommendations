import { useState } from "react";
import styles from "./DualRangeSlider.module.css"

interface DualRangeSliderProps {
  min: number,
  max: number,
  onChange: (min: number, max: number) => void
  labels: {min: string, max: string, label: string}
}


const DualRangeSlider = (
  {min, max, onChange, labels}: DualRangeSliderProps
) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const pixelWidth = 200;
  const minThumbGap = 20;
  const activeRange = Math.round((maxVal - minVal) / max * pixelWidth);
  const rangePixelOffset = Math.round(minVal / max * pixelWidth);

  const onLeftThumbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(+event.target.value, maxVal - minThumbGap);
    event.target.value = val.toString();
    setMinVal(val);
    onChange(minVal, maxVal);
  }

  const onRightThumbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(+event.target.value, minVal + minThumbGap);
    event.target.value = val.toString();
    setMaxVal(val);
    onChange(minVal, maxVal);
  }

  return (
    <>
    <div className="text-neutral-400">{labels.label}</div>
    <div className="relative">
      <input 
        type="range"
        min={min} 
        max={max}
        defaultValue={min}
        className={`
          ${styles.thumb}
          appearance-none
          z-10
        `}
        onChange={onLeftThumbChange}
        style={{"width": pixelWidth + "px"}}
      />
      <input 
        type="range" 
        min={min} 
        max={max}
        defaultValue={max}
        className={`
          ${styles.thumb}
          appearance-none
          z-20
        `}
        style={{"width": pixelWidth + "px"}}
        onChange={onRightThumbChange}
      />
      <div className={`${styles.slider}`}>
        <div className={`${styles.sliderTrack}`} />
        <div 
          className={`${styles.sliderRange}`} 
          style={{
            "width" : activeRange,
            "left" : rangePixelOffset
          }}
        />
      </div>
      <div className="flex justify-between mt-3 text-neutral-400">
        <span>{labels.min}</span>
        <span>{labels.max}</span>
      </div>
    </div>
    </>
  );
}

export default DualRangeSlider;