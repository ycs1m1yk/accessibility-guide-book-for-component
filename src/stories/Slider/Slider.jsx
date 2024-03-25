import { useState } from "react";

function Slider() {
  const [sliderValue, setSliderValue] = useState(70);

  const handleChangeValue = (event) => {
    setSliderValue(event.target.value);
  };

  return (
    <>
      <div className="slider">
        {/* 1. 레이블 제공: input 요소의 id 값 참조 */}
        <label htmlFor="slider-id">할인율</label>
        {/* 2. 초점 이동이 가능한 input 태그 사용 */}
        <input
          type="range"
          id="slider-id"
          min="0"
          max="100"
          step="5"
          value={sliderValue}
          onChange={handleChangeValue}
        />
      </div>
      <div className="slider-value">{sliderValue}%</div>
    </>
  );
}

export default Slider;
