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

  const progress = sliderValue / MAX;
  const progressBackground = `linear-gradient(to right, #027dfa ${
    progress * 100
  }%, #eee ${progress * 100}%)`;

  return (
    <>
      <div className={cx("slider")}>
        {/* 1. 레이블 제공: input 요소의 id 값 참조 */}
        <label htmlFor="slider-id">할인율</label>
        {/* 2. 초점 이동이 가능한 input 태그 사용 */}
        <input
          type="range"
          id="slider-id"
          min={MIN}
          max={MAX}
          step={STEP}
          value={sliderValue}
          // 3. 슬라이더의 현재 값에 대한 더 자세한 정보 전달
          aria-valuetext={`${sliderValue}%`}
          onChange={handleChangeValue}
          style={{
            background: progressBackground,
          }}
        />
      </div>
      <div className={cx("slider-value")}>{sliderValue}%</div>
    </>
  );
}

export default Slider;
