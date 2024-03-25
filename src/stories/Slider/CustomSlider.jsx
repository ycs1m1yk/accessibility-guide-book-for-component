import { useState, useRef } from "react";
import "./index.css";

const min = 0;
const max = 100;
const step = 5;

function CustomSlider() {
  const [sliderValue, setSliderValue] = useState(70);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const moveSliderTo = (offsetX) => {
    const sliderWidth = sliderRef.current?.clientWidth;

    const percentage = offsetX / sliderWidth;
    const range = max - min;
    const steppedValue = Math.round((percentage * range) / step) * step;
    const newValue = steppedValue + min;

    if (newValue >= min && newValue <= max) {
      setSliderValue(newValue);
    }
  };

  const handleClickTrack = (event) => {
    if (isDragging) return;

    const sliderOffsetX = sliderRef.current.getBoundingClientRect().left;
    const offsetX = event.clientX - sliderOffsetX;

    moveSliderTo(offsetX);
  };

  // 14. 포인터 이동 이벤트
  const handlePointerMove = (event) => {
    const sliderOffsetX = sliderRef.current?.getBoundingClientRect().left;
    const clientX =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;

    moveSliderTo(clientX - sliderOffsetX);
  };

  // 14. 포인터 이동 이벤트
  const handlePointerDown = () => {
    setIsDragging(true);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  // 14. 포인터 이동 이벤트
  const handlePointerUp = () => {
    setIsDragging(false);

    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  const handleKeyDown = (event) => {
    switch (event.code) {
      // 8. 'ArrowLeft' 또는 "ArrowDown" 키를 통해 현재 값 감소
      case "ArrowLeft":
      case "ArrowDown":
        event.preventDefault();
        setSliderValue(Math.max(min, sliderValue - step));
        break;
      // 9. 'ArrowRight' 또는 "ArrowUp" 키를 통해 현재 값 감소
      case "ArrowRight":
      case "ArrowUp":
        event.preventDefault();
        setSliderValue(Math.min(max, sliderValue + step));
        break;
      // 10. 'End' 키를 통해 슬라이더의 현재 값을 최소값으로 변경
      case "Home":
        event.preventDefault();
        setSliderValue(min);
        break;
      // 11. 'End' 키를 통해 슬라이더의 현재 값을 최대값으로 변경
      case "End":
        event.preventDefault();
        setSliderValue(max);
        break;
      // 12. 'PageUp' 키를 통해 현재 값을 전체 범위의 10% 만큼 증가
      case "PageUp": {
        event.preventDefault();
        // 전체 범위
        const range = max - min;
        // 전체 범위(100)의 10%인 10 증가
        setSliderValue(Math.min(sliderValue + range * 0.1, max));
        break;
      }
      // 13. 'PageUp' 키를 통해 현재 값을 전체 범위의 10% 만큼 감소
      case "PageDown": {
        event.preventDefault();
        // 전체 범위
        const range = max - min;
        // 전체 범위(100)의 10%인 10 감소
        setSliderValue(Math.max(sliderValue - range * 0.1, min));
        break;
      }

      default:
        return;
    }
  };

  return (
    <div className="slider-container">
      <div className="slider" ref={sliderRef}>
        <div id="slider-id" className="slider-label">
          할인율
        </div>
        <div className="slider-track" onClick={handleClickTrack} />
        <div
          className="slider-handle"
          // 1. 슬라이더 역할 명시
          role="slider"
          // 2. 슬라이더의 현재 값 제공
          aria-valuenow={sliderValue}
          // 3. 슬라이더의 현재 값에 대한 더 자세한 정보 전달
          aria-valuetext={`${sliderValue}%`}
          // 4. 슬라이더의 최소값 설정
          aria-valuemin={min}
          // 4. 슬라이더의 최대값 설정
          aria-valuemax={max}
          // 5. 레이블 지정
          aria-labelledby="slider-id"
          // 6. 슬라이더의 조작 방향 설정
          aria-orientation="horizontal"
          // 7. 초점 이동 가능하도록 설정
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onKeyDown={handleKeyDown} // 8. ~ 13. 키보드 컨트롤
          style={{
            left: `${sliderValue}%`,
          }}
        />
      </div>
      <div className="slider-value">{sliderValue}%</div>
    </div>
  );
}

export default CustomSlider;
