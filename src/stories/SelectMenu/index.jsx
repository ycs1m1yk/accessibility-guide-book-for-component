import { useEffect, useRef, useState } from "react";

const OPTIONS = ["미국", "일본", "한국"];

function SelectMenu() {
  const comboboxRef = useRef(null);
  const listboxRef = useRef(null);

  // 옵션 목록 팝업 열림/닫힘 여부
  const [isExpanded, setIsExpanded] = useState(false);
  // 활성화된 옵션 index
  const [activeIndex, setActiveIndex] = useState(0);
  // 선택된 옵션 index
  const [selectedIndex, setSelectedIndex] = useState(0);
  // 14. 옵션을 클릭하는 중인지 여부
  const [isOptionPointerDown, setIsOptionPointerDown] = useState(false);

  // 10. 콤보박스 클릭 시 동작
  const handleClickCombobox = () => {
    // 옵션 목록 팝업 열림/닫힘 토글
    setIsExpanded(!isExpanded);
    // 초점은 콤보박스에 유지
    comboboxRef.current.focus();
  };

  // 11. 초점이 콤보박스를 벗어날 시 동작
  const handleBlurCombobox = () => {
    // 14. isOptionPointerDown 인 경우 > 11. 초점이 콤보박스를 벗어날 시 동작 무시
    if (isOptionPointerDown || !isExpanded) {
      return;
    }

    // 현재 활성화된 옵션 선택
    setSelectedIndex(activeIndex);
    // 옵션 목록 팝업 닫기
    setIsExpanded(false);
  };

  // 13. 옵션 클릭 시 동작
  const handleClickOption = (index) => {
    setSelectedIndex(index);
    setActiveIndex(index);
    setIsExpanded(false);
    comboboxRef.current?.focus();
  };

  // step 크기만큼 이전 옵션 활성화
  const activePrevOption = (activeIndex, step = 1) => {
    const prevIndex = Math.max(0, activeIndex - step);

    setActiveIndex(prevIndex);
  };

  // step 크기만큼 다음 옵션 활성화
  const activeNextOption = (activeIndex, step = 1) => {
    const nextIndex = Math.min(LAST_INDEX, activeIndex + step);

    setActiveIndex(nextIndex);
  };

  const handleKeyDownCombobox = (event) => {
    // 옵션 목록 팝업이 열려있는 경우 키보드 컨트롤
    if (isExpanded) {
      switch (event.code) {
        // 16. 'ArrowUp' 키를 통해 이전 옵션 활성화
        case "ArrowUp":
          event.preventDefault();

          activePrevOption(activeIndex);
          break;

        // 17. 'ArrowDown' 키를 통해 다음 옵션 활성화
        case "ArrowDown":
          event.preventDefault();

          activeNextOption(activeIndex);
          break;

        // 18. 'Home' 키를 통해 첫번째 옵션 활성화
        case "Home":
          event.preventDefault();

          setActiveIndex(0);
          break;

        // 19. 'Home' 키를 통해 마지막 옵션 활성화
        case "End":
          event.preventDefault();

          setActiveIndex(OPTIONS.length - 1);
          break;

        // 20. 'PageDown' 키를 통해 현재 활성화된 옵션에서 10번째 이전 옵션 활성화
        case "PageDown":
          event.preventDefault();

          activeNextOption(activeIndex, 10);
          break;

        // 21. 'PageUp' 키를 통해 현재 활성화된 옵션에서 10번째 다음 옵션 활성화
        case "PageUp":
          event.preventDefault();

          activePrevOption(activeIndex, 10);
          break;

        // 22. 'Space', 'Enter' 키를 통해 현재 활성화된 옵션을 선택하고 옵션 목록 팝업 닫기
        case "Space":
        case "Enter":
          event.preventDefault();

          setSelectedIndex(activeIndex);
          setIsExpanded(false);
          break;

        // 23. 'Esc', 키를 통해 옵션 목록 팝업 닫기
        case "Escape":
          event.preventDefault();

          setIsExpanded(false);
          break;
      }
    }
    // 옵션 목록 팝업이 닫혀있는 경우 키보드 컨트롤
    else {
      switch (event.code) {
        case "ArrowDown":
        case "ArrowUp":
        case "Space":
        case "Enter":
          event.preventDefault();

          setIsExpanded(true);
          break;
      }
    }
  };

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    // 24. 활성화된 옵션이 시각적으로 보여지도록 처리
    const listboxElement = listboxRef.current;
    const options = listboxElement.childNodes;
    const activeOption = options[activeIndex];

    const listboxHeight = listboxElement.offsetHeight;
    const optionHeight = activeOption.offsetHeight;
    const scrollTop = listboxElement.scrollTop;
    const activeOptionTop = activeIndex * optionHeight;

    // 활성화된 옵션이 스크롤 위쪽에 가려져 있는 경우
    const isOptionHiddenAtTopSide = activeOptionTop < scrollTop;
    // 활성화된 옵션이 스크롤 아래쪽에 가려져 있는 경우
    const isOptionHiddenAtBottomSide =
      activeOptionTop + optionHeight > scrollTop + listboxHeight;

    if (isOptionHiddenAtTopSide) {
      listboxElement.scrollTo(0, activeOptionTop);
    }
    if (isOptionHiddenAtBottomSide) {
      listboxElement.scrollTo(
        0,
        activeOptionTop - listboxHeight + optionHeight,
      );
    }
  }, [isExpanded, activeIndex]);

  return (
    <>
      <button
        ref={comboboxRef}
        type="button"
        // 1. combobox 역할 명시
        role="combobox"
        // 2. listbox가 노출될 것을 명시
        aria-haspopup="listbox"
        // 3. 옵션 목록 팝업의 열림/닫힘 상태 여부
        aria-expanded={isExpanded}
        // 4. 옵션 목록 팝업 id값 참조
        aria-controls="listbox-id"
        // 5. 활성화된 옵션 id값 참조
        aria-activedescendant={`option-${activeIndex}-id`}
        // 10. 콤보박스 클릭 시 동작
        onClick={() => handleClickCombobox()}
        // 11. 초점이 콤보박스를 벗어날 시 동작
        onBlur={handleBlurCombobox}
        // 15. ~ 23. 키보드 컨트롤
        onKeyDown={handleKeyDownCombobox}
      >
        {OPTIONS[selectedIndex]}
      </button>
      {isExpanded && (
        <div
          ref={listboxRef}
          // 6. listbox 역할 명시
          role="listbox"
          id="listbox-id"
          // 7. 옵션 나열 방향 명시
          aria-orientation="vertical"
        >
          {OPTIONS.map((option, index) => (
            <button
              key={index}
              type="button"
              // 8. option 역할 명시
              role="option"
              id={`option-${index}-id`}
              // 9. 옵션이 선택되었는지 여부
              aria-selected={index === selectedIndex}
              // 12. 키보드 'Tab' 동작으로 인한 초점 이동 방지
              tabIndex={-1}
              // 13. 옵션 클릭 시 동작
              onClick={() => handleClickOption(index)}
              // 14. 옵션을 클릭하는 동작 중에는 11. 초점이 콤보박스를 벗어날 시 동작 무시
              onPointerDown={() => setIsOptionPointerDown(true)}
              onPointerUp={() => setIsOptionPointerDown(false)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default SelectMenu;
