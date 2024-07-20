import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Tab.module.scss";

const cx = classNames.bind(styles);

const TAB_LIST = [
  {
    tab: "경제",
    tabPanel: <EconomyContent />,
  },
  {
    tab: "과학",
    tabPanel: <ScienceContent />,
  },
  {
    tab: "스포츠",
    tabPanel: <SportsContent />,
  },
];

function Tab() {
  const tablistRef = useRef(null);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    const tablistElement = tablistRef.current;
    const tabElements = tablistElement.childNodes;
    const lastIndex = tabElements.length - 1;

    /* targetIndex에 해당하는 Tab으로 초점 이동 */
    const focusToTab = (targetIndex) => {
      const targetTab = tabElements[targetIndex];
      setFocusedIndex(targetIndex);

      targetTab.focus();
    };

    /* 초점 이동 처리 & 키보드 컨트롤 */
    const moveFocus = (event) => {
      switch (event.code) {
        /* 12. 'ArrowLeft' 키를 통해 이전 Tab으로 초점 이동 */
        case "ArrowLeft":
          event.preventDefault();

          const prevIndex = focusedIndex - 1 < 0 ? lastIndex : focusedIndex - 1;

          focusToTab(prevIndex);
          break;

        /* 13. 'ArrowRight' 키를 통해 다음 Tab으로 초점 이동 */
        case "ArrowRight":
          event.preventDefault();

          const nextIndex = focusedIndex + 1 > lastIndex ? 0 : focusedIndex + 1;

          focusToTab(nextIndex);
          break;

        /* 14. 'Home' 키를 통해 첫번째 Tab으로 초점 이동 */
        case "Home":
          event.preventDefault();

          focusToTab(0);
          break;

        /* 15. 'End' 키를 통해 마지막 Tab으로 초점 이동 */
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
      {/* 2. Tab 리스트 레이블 제공 */}
      <strong id="tablist-title-id" className={cx("title")}>
        뉴스
      </strong>
      <div
        ref={tablistRef}
        /* 1. tablist 역할 명시 */
        role="tablist"
        /* 2. 레이블 역할을 하는 요소 id 참조 */
        aria-labelledby="tablist-title-id"
        /* 3. Tab 나열 방향 명시 */
        aria-orientation="horizontal"
        className={cx("tablist")}
      >
        {TAB_LIST.map(({ tab }, index) => {
          const isSelected = selectedIndex === index;

          return (
            <button
              key={index}
              type="button"
              /* 4. Tab 역할 명시 */
              role="tab"
              id={`tab-${index}-id`}
              /* 5. 선택된 Tab인 경우에만 true */
              aria-selected={isSelected}
              /* 6. Tab 패널 id 참조 */
              aria-controls={`tabpanel-${index}-id`}
              /* 클릭 시 해당 Tab 선택 */
              onClick={() => setSelectedIndex(index)}
              /* 9. 키보드 'Tab'키 동작으로는 선택된 Tab으로만 초점 이동 가능하도록 적용 */
              tabIndex={isSelected ? 0 : -1}
              className={cx("tab")}
            >
              {tab}
            </button>
          );
        })}
      </div>
      <div
        /* 7. tabpanel 역할 명시 */
        role="tabpanel"
        id={`tabpanel-${selectedIndex}-id`}
        /* 8.Tab 패널을 나타나게 하는 Tab 요소 id 참조 */
        aria-labelledby={`tab-${selectedIndex}-id`}
        /* 11. Tab 패널이 초점을 받을 수 있도록 처리 */
        tabIndex={0}
        className={cx("tabpanel")}
      >
        {TAB_LIST[selectedIndex].tabPanel}
      </div>
    </>
  );
}

export default Tab;

function EconomyContent() {
  return <div>경제 콘텐츠</div>;
}

function ScienceContent() {
  return <div>과학 콘텐츠</div>;
}

function SportsContent() {
  return <div>스포츠 콘텐츠</div>;
}
