import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Tab.module.scss";

const cx = classNames.bind(styles);

const TAB_LIST = ["경제", "과학", "스포츠"];

function Tab() {
  const tablistRef = useRef(null);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    const tablistElement = tablistRef.current;
    const tabElements = tablistElement.childNodes;
    const lastIndex = tabElements.length - 1;

    // targetIndex에 해당하는 탭으로 초점 이동
    const focusToTab = (targetIndex) => {
      const targetTab = tabElements[targetIndex];
      setFocusedIndex(targetIndex);

      targetTab.focus();
    };

    // 초점 이동 처리 & 키보드 컨트롤
    const moveFocus = (event) => {
      switch (event.code) {
        // 12. 'ArrowLeft' 키를 통해 이전 탭으로 초점 이동
        case "ArrowLeft":
          event.preventDefault();

          const prevIndex = focusedIndex - 1 < 0 ? lastIndex : focusedIndex - 1;

          focusToTab(prevIndex);
          break;

        // 13. 'ArrowRight' 키를 통해 다음 탭으로 초점 이동
        case "ArrowRight":
          event.preventDefault();

          const nextIndex = focusedIndex + 1 > lastIndex ? 0 : focusedIndex + 1;

          focusToTab(nextIndex);
          break;

        // 14. 'Home' 키를 통해 첫번째 탭으로 초점 이동
        case "Home":
          event.preventDefault();

          focusToTab(0);
          break;

        // 15. 'End' 키를 통해 마지막 탭으로 초점 이동
        case "End":
          event.preventDefault();

          focusToTab(lastIndex);
          break;
      }
    };

    tablistElement.addEventListener("keydown", moveFocus);

    return () => {
      tablistElement.removeEventListener("keydown", moveFocus);
    };
  }, [focusedIndex]);

  return (
    <>
      {/* 2. 탭 리스트 레이블 제공 */}
      <strong id="tablist-title-id" className={cx("title")}>
        뉴스
      </strong>
      <div
        ref={tablistRef}
        // 1. tablist 역할 명시
        role="tablist"
        // 2. 레이블 역할을 하는 요소 id 참조
        aria-labelledby="tablist-title-id"
        // 3. 탭 나열 방향 명시
        aria-orientation="horizontal"
        className={cx("tablist")}
      >
        {TAB_LIST.map((item, index) => {
          const isSelected = selectedIndex === index;

          return (
            <button
              key={index}
              type="button"
              // 4. tab 역할 명시
              role="tab"
              id={`tab-${index}-id`}
              // 5. 선택된 탭인 경우에만 true
              aria-selected={isSelected}
              // 6. 탭 패널 id 참조
              aria-controls={`tabpanel-${index}-id`}
              // 클릭 시 해당 탭 선택
              onClick={() => setSelectedIndex(index)}
              // 9. 키보드 'Tab'키 동작으로는 선택된 탭으로만 초점 이동 가능하도록 적용
              tabIndex={isSelected ? 0 : -1}
              className={cx("tab")}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div
        // 7. tabpanel 역할 명시
        role="tabpanel"
        id={`tabpanel-${selectedIndex}-id`}
        // 8. 탭 패널을 나타나게 하는 탭 요소 id 참조
        aria-labelledby={`tab-${selectedIndex}-id`}
        // 11. 탭 패널이 초점을 받을 수 있도록 처리
        tabIndex={0}
        className={cx("tabpanel")}
      >
        {TAB_LIST[selectedIndex]} 콘텐츠 영역
      </div>
    </>
  );
}

export default Tab;
