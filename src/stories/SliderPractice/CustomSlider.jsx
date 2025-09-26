import { useState, useRef } from "react";

import styles from "./CustomSlider.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const min = 0;
const max = 100;
const step = 5;

function CustomSlider() {
  const [sliderValue, setSliderValue] = useState(70);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const moveSliderTo = (offsetX) => {
  };

  const handleClickTrack = (event) => {
  };

  /* 14. 포인터 이동 이벤트 */
  const handlePointerMove = (event) => {
  };

  /* 14. 포인터 이동 이벤트 */
  const handlePointerDown = () => {
  };

  /* 14. 포인터 이동 이벤트 */
  const handlePointerUp = () => {
  };

  const handleKeyDown = (event) => {
  };

  return (
    <div className={cx("slider-container")}>
      <div className={cx("slider")}>
        <div className={cx("slider-label")}>
          할인율
        </div>
        <div className={cx("slider-track")}>
          <div
            className={cx("progress")}
          />
        </div>
        <div
          className={cx("slider-handle")}
        />
      </div>
      <div className={cx("slider-value")}>{sliderValue}%</div>
    </div>
  );
}

export default CustomSlider;
