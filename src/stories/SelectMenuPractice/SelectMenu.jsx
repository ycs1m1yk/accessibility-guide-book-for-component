import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "./SelectMenu.module.scss";

const cx = classNames.bind(styles);

const OPTIONS = [
  "가나",
  "그리스",
  "나이지리아",
  "네덜란드",
  "네팔",
  "노르웨이",
  "뉴질랜드",
  "대한민국",
  "독일",
  "러시아",
  "룩셈부르크",
  "말레이시아",
  "멕시코",
  "미국",
  "베트남",
  "벨기에",
  "브라질",
  "수리남",
  "스웨덴",
  "스위스",
  "스페인",
  "아르헨티나",
  "오스트레일리아",
  "이탈리아",
  "일본",
  "중국",
  "체코",
  "캄보디아",
  "캐나다",
  "태국",
  "포르투갈",
  "프랑스",
];

function SelectMenu() {
  const comboboxRef = useRef(null);
  const listboxRef = useRef(null);

  /* 옵션 목록 팝업 열림/닫힘 여부 */
  const [isExpanded, setIsExpanded] = useState(false);
  /* 활성화된 옵션 index */
  const [activeIndex, setActiveIndex] = useState(0);
  /* 선택된 옵션 index */
  const [selectedIndex, setSelectedIndex] = useState(0);
  /* 14. 옵션을 클릭하는 중인지 여부 */
  const [isOptionPointerDown, setIsOptionPointerDown] = useState(false);

  /* 10. 콤보박스 클릭 시 동작 */
  const handleClickCombobox = () => {
    setIsExpanded(!isExpanded);
    comboboxRef.current.focus();
  };

  /* 11. 초점이 콤보박스를 벗어날 시 동작 */
  const handleBlurCombobox = () => {
    if (isOptionPointerDown || !isExpanded) {
      return;
    }
    setIsExpanded(false);
    setSelectedIndex(activeIndex);
  };

  /* 13. 옵션 클릭 시 동작 */
  const handleClickOption = (index) => {
    setActiveIndex(index);
    setSelectedIndex(index);
    setIsExpanded(false);
    comboboxRef.current.focus();
  };

  /* step 크기만큼 이전 옵션 활성화 */
  const activePrevOption = (activeIndex, step = 1) => {
    const newActiveIndex = Math.max(activeIndex - step, 0);
    setActiveIndex(newActiveIndex);
  };

  /* step 크기만큼 다음 옵션 활성화 */
  const activeNextOption = (activeIndex, step = 1) => {
    const newActiveIndex = Math.min(activeIndex + step, OPTIONS.length - 1);
    setActiveIndex(newActiveIndex);
  };

  const handleKeyDownCombobox = (event) => {
    if (isExpanded) {
      switch (event.code) {
        case 'ArrowUp':
          event.preventDefault();

          activePrevOption(activeIndex);
          break;
        case 'ArrowDown':
          event.preventDefault();

          activeNextOption(activeIndex);
          break;
        case 'Home':
          event.preventDefault();

          setActiveIndex(0);
          break;
        case 'End':
          event.preventDefault();

          setActiveIndex(OPTIONS.length - 1);
          break;
        case 'PageUp':
          event.preventDefault();

          activePrevOption(activeIndex, 10);
          break;
        case 'PageDown':
          event.preventDefault();

          activeNextOption(activeIndex, 10);
          break;
        case 'Space':
          event.preventDefault();

          setSelectedIndex(activeIndex);
          setIsExpanded(false);
          break;
        case 'Escape':
          event.preventDefault();

          setIsExpanded(false);
          break;
        }
    } else {
      switch (event.code) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'Space':
        case 'Enter':
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

    const optionElements = listboxRef.current.childNodes;
    const activeOption = optionElements[activeIndex];
    activeOption.scrollIntoView({block: 'center', container: 'nearest'});

    return () => {};
  }, [activeIndex]);

  return (
    <>
      <button
        ref={comboboxRef}
        role="combobox"
        aria-haspopup="true"
        aria-expanded={isExpanded}
        aria-controls="country-listbox"
        aria-activedescendant={`country-option-${activeIndex}`}
        onBlur={handleBlurCombobox}
        onClick={handleClickCombobox}
        onKeyDown={handleKeyDownCombobox}
        className={cx('combobox', {'expanded': isExpanded})}
      >
        {OPTIONS[selectedIndex]}
      </button>
      {isExpanded && (
        <div
          ref={listboxRef}
          role="listbox"
          id="country-listbox"
          className={cx('listbox')}
        >
          {OPTIONS.map((option, index) => (
            <button
              role="option"
              aria-selected={index === selectedIndex}
              tabIndex={-1}
              onClick={() => handleClickOption(index)}
              onPointerDown={() => setIsOptionPointerDown(true)}
              onPointerUp={() => setIsOptionPointerDown(false)}
              id={`country-option-${index}`}
              className={cx('option', {'is-active': index === activeIndex})}
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
