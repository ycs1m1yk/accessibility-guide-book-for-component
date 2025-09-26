import { useState } from "react";

import styles from "./Slider.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MIN = 0;
const MAX = 100;
const STEP = 5;

function Slider() {
  const [sliderValue, setSliderValue] = useState(70);

  const handleChangeValue = (event) => {
    setSliderValue(event.target.value);
  };


  return (
    <>
      <div className={cx("slider")}>
        {/* 1. 레이블 제공: input 요소의 id 값 참조 */}
        <label htmlFor="slider-id">할인율</label>
        {/* 2. 초점 이동이 가능한 input 태그 사용 */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={sliderValue}
          aria-valuetext={`${sliderValue}%`}
          onChange={handleChangeValue}
          id="slider-id"
        />
      </div>
      <div className={cx("slider-value")}>{sliderValue}%</div>
    </>
  );
}

export default Slider;
