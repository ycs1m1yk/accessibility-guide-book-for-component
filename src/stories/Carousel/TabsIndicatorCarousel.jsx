import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./TabsIndicatorCarousel.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

// 슬라이드 내부 콘텐츠
const SLIDE_CONTENTS = [
  {
    title: "초대할 때마다 포인트 5천원",
    description: "친구 초대하고 최대 5만원 받으세요!",
    imageUrl: "https://example.com/slide1.png",
    imageAlt: "7월 1일~30일 친구초대 이벤트",
  },
  {
    title: "역시즌 세일",
    description: "인기브랜드 미리 준비하는 역시즌 특가!",
    imageUrl: "https://example.com/slide2.png",
    imageAlt: "7월 1일~10일 역시즌 할인 특가",
  },
  {
    title: "여름 디저트 대전",
    description: "시원한 디저트를 먹으면 여름 바캉스 경품까지!",
    imageUrl: "https://example.com/slide3.png",
    imageAlt: "7월 1일~14일 디저트 모음전",
  },
];

const SLIDE_LENGTH = SLIDE_CONTENTS.length; // 전체 슬라이드 개수
const LAST_INDEX = SLIDE_LENGTH - 1; // 마지막 슬라이드의 인덱스
const SLIDE_INTERVAL_TIME = 5000; // 자동 재생 지연 시간: 5초

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0); // 현재 노출되고 있는 슬라이드의 인덱스
  const [isAutoPlay, setIsAutoPlay] = useState(true); // 슬라이드 재생 여부
  const [isRotation, setIsRotation] = useState(isAutoPlay); // 일시정지/재생 버튼 레이블 전환
  const intervalRef = useRef(null);

  const indicatorButtonRefs = useRef(Array.from({ length: SLIDE_LENGTH })); // 인디케이터 버튼 ref 배열 정의

  const playCarousel = useCallback(() => {
    if (!isRotation) {
      return;
    }

    setIsAutoPlay(true);
  }, [isRotation]);

  const moveToNextSlide = useCallback(() => {
    const nextIndex = activeIndex < LAST_INDEX ? activeIndex + 1 : 0;

    setActiveIndex(nextIndex); // 댜음 슬라이드 표시
  }, [activeIndex]);

  useEffect(() => {
    // 캐러셀을 자동 재생하는 경우
    if (isAutoPlay) {
      // 5초 후 다음 슬라이드를 표시
      intervalRef.current = setInterval(moveToNextSlide, SLIDE_INTERVAL_TIME);

      return () => clearInterval(intervalRef.current);
    }
  }, [isAutoPlay, moveToNextSlide]);

  const handleClickControls = useCallback(
    (direction, index) => {
      clearInterval(intervalRef.current); // 사용자가 컨트롤 요소를 조작했을 때, 기존 interval 중단

      switch (direction) {
        case "prev":
          const prevIndex = activeIndex > 0 ? activeIndex - 1 : LAST_INDEX;
          setActiveIndex(prevIndex); // 이전 슬라이드 표시

          break;
        case "next":
          moveToNextSlide(); // 다음 슬라이드 표시

          break;
        default:
          setActiveIndex(index); // 선택한 슬라이드 표시

          break;
      }

      if (isAutoPlay) {
        intervalRef.current = setInterval(moveToNextSlide, SLIDE_INTERVAL_TIME); // interval 재시작
      }
    },
    [activeIndex, isAutoPlay, moveToNextSlide],
  );

  const handleIndicatorKeydown = useCallback((event) => {
    let nextIndex;

    // 현재 초점이 있는 인디케이터의 인덱스
    const currentIndex = indicatorButtonRefs.current.findIndex(
      (ref) => ref === document.activeElement,
    );

    switch (event.code) {
      case "ArrowLeft":
        event.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : LAST_INDEX; // 18. 이전 슬라이드 표시 및 이전 인디케이터 버튼으로 초점 이동

        break;

      case "ArrowRight":
        event.preventDefault();
        nextIndex = currentIndex < LAST_INDEX ? currentIndex + 1 : 0; // 19. 다음 슬라이드 표시 및 다음 인디케이터 버튼으로 초점 이동

        break;

      case "Home":
        event.preventDefault();
        nextIndex = 0; // 20. 첫 번째 슬라이드 표시 및 첫 번쨰 인디케이터 버튼으로 초점 이동

        break;

      case "End":
        event.preventDefault();
        nextIndex = LAST_INDEX; /// 21. 마지막 슬라이드 표시 및 마지막 인디케이터 버튼으로 초점 이동
        break;

      default:
        break;
    }

    if (nextIndex === null || nextIndex === undefined) return;
    setActiveIndex(nextIndex);
    indicatorButtonRefs.current[nextIndex].focus(); // 18. ~ 21. 인디케이터 버튼 초점 이동
  }, []);

  return (
    <div role="region" aria-label="이달의 이벤트">
      {/* 7. 캐러셀 요소에 역할과 설명 제공 */}
      <div className={cx("controls")}>
        {/* 8. 일시정지/재생 버튼을 슬라이드 컨테이너보다 먼저 마크업 */}
        <button
          type="button"
          className={cx("rotation", { paused: !isRotation })}
          onClick={() => {
            setIsAutoPlay((prev) => !prev); // 캐러셀의 일시정지/재생 상태 전환
            setIsRotation((prev) => !prev); // 일시정지/재생 버튼 레이블 전환
          }}
          aria-label={isRotation ? "일시정지" : "재생"} // 1. 캐러셀 재생 상태에 따른 버튼 대체 텍스트 변경
        />

        {/* 9. 이전/다음 슬라이드 이동 버튼을 슬라이드 컨테이너보다 먼저 마크업 */}
        <button
          type="button"
          className={cx("previous")}
          onClick={() => handleClickControls("prev")}
          aria-controls="slide-conatainer-id" // 2. 슬라이드 컨테이너 요소 id 참조
          // 10. 마우스 포인터를 올리거나 초점을 이동한 경우 캐러셀의 재생 상태 전환
          onMouseOver={() => setIsAutoPlay(false)}
          onMouseOut={playCarousel}
          onFocus={() => setIsAutoPlay(false)}
          onBlur={playCarousel}
        >
          이전 슬라이드
        </button>
        <button
          type="button"
          className={cx("next")}
          onClick={() => handleClickControls("next")}
          aria-controls="slide-conatainer-id" // 2. 슬라이드 컨테이너 요소 id 참조
          // 10. 마우스 포인터를 올리거나 초점을 이동한 경우 캐러셀의 재생 상태 전환
          onMouseOver={() => setIsAutoPlay(false)}
          onMouseOut={playCarousel}
          onFocus={() => setIsAutoPlay(false)}
          onBlur={playCarousel}
        >
          다음 슬라이드
        </button>

        {/* 3. 탭 목록 역할 명시 */}
        {/* 5. 인디케이터 컨테이너의 목적 명시*/}
        <div
          className={cx("indicators")}
          role="tablist"
          aria-label="이미지 슬라이드"
        >
          {Array.from({ length: SLIDE_LENGTH }, (_, index) => (
            <button
              type="button"
              key={index}
              role="tab" // 3. 탭 역할 명시
              aria-controls={`slide-item-${index + 1}`} // 6. 인디케이터 버튼과 연관된 슬라이드 요소의 id 참조
              aria-selected={index === activeIndex} // 4. 현재 선택된 슬라이드인 경우 true, 아닌 경우 false
              onClick={() => handleClickControls(_, index)} // 선택한 슬라이드 노출
              // 11. 인디케이터 버튼에 마우스 포인터를 올리거나 초점을 이동한 경우 캐러셀의 재생 상태 전환
              onMouseOver={() => setIsAutoPlay(false)}
              onMouseOut={playCarousel}
              onFocus={() => setIsAutoPlay(false)}
              onBlur={playCarousel}
              ref={(el) => (indicatorButtonRefs.current[index] = el)}
              onKeyDown={(event) => handleIndicatorKeydown(event)}
              tabIndex={activeIndex === index ? undefined : -1} // 12. 현재 표시되는 슬라이드와 연관된 인디케이터 버튼에만 초점 이동 가능
            >
              슬라이드 {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div
        className={cx("slide-container")}
        id="slide-conatainer-id" // 2. 슬라이드 컨테이너의 id 정의
        aria-live={isAutoPlay ? "off" : "polite"} // 4. 자동 재생인 경우 off, 일시정지인 경우 polite
        aria-label="7월 주요 이벤트" // 5. 캐러셀의 콘텐츠 설명하는 레이블 텍스트 제공
      >
        {SLIDE_CONTENTS.map(
          (item, index) =>
            index === activeIndex && (
              <div
                className={cx("slide-item", { active: index === activeIndex })}
                key={index}
                id={`slide-item-${index + 1}`}
                aria-label={`총 ${SLIDE_LENGTH}개의 슬라이드 중 ${
                  index + 1
                }번째 슬라이드`} // 5. 총 3개의 슬라이드 중 어떤 슬라이드가 표시되는지 레이블 텍스트 제공
                role="tabpanel" // 6. 탭 패널 역할 명시
              >
                <a
                  href="/"
                  // 13. 마우스 포인터를 올리거나 초점을 이동한 경우 캐러셀의 재생 상태 전환
                  onMouseOver={() => setIsAutoPlay(false)}
                  onMouseOut={playCarousel}
                  onFocus={() => setIsAutoPlay(false)}
                  onBlur={playCarousel}
                >
                  <img src={item.imageUrl} alt={item.imageAlt} />
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </a>
              </div>
            ),
        )}
      </div>
    </div>
  );
}

export default Carousel;
