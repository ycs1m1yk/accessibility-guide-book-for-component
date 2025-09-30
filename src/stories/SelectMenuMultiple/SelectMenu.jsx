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
  const [selectedIndexes, setSelectedIndexes] = useState([0]);
  /* 14. 옵션을 클릭하는 중인지 여부 */
  const [isOptionPointerDown, setIsOptionPointerDown] = useState(false);

  /* 10. 콤보박스 클릭 시 동작 */
  const handleClickCombobox = () => {
  };

  /* 11. 초점이 콤보박스를 벗어날 시 동작 */
  const handleBlurCombobox = () => {
  };

  /* 13. 옵션 클릭 시 동작 */
  const handleClickOption = (index) => {
  };

  /* step 크기만큼 이전 옵션 활성화 */
  const activePrevOption = (activeIndex, step = 1) => {
  };

  /* step 크기만큼 다음 옵션 활성화 */
  const activeNextOption = (activeIndex, step = 1) => {
  };

  const handleKeyDownCombobox = (event) => {
  };

  useEffect(() => {
    // listbox 스크롤 이동
  }, [activeIndex]);

  return (
    <>
      <button
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isExpanded}
        className={cx('combobox', {'expanded': isExpanded})}
      >
        {OPTIONS[selectedIndex]}
      </button>
      {isExpanded && (
        <div
          role="listbox"
          className={cx('listbox')}
        >
          {OPTIONS.map((option, index) => (
            <button
              role="option"
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
