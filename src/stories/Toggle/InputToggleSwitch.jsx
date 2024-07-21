import { useState } from "react";

import styles from "./InputToggleSwitch.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function InputToggleSwitch() {
  const [isChecked, setIsChecked] = useState(false);
  /* 스위치 상태를 시각적으로 구분 가능하도록 스타일을 적용하기 위한 포커스 여부 */
  const [isFocused, setFocused] = useState(false);

  const handleKeyDown = (event) => {
    /* 5. Enter 키 눌렀을 때 스위치 상태 변경 */
    if (event.code === "Enter") {
      setIsChecked((prev) => !prev);
    }
  };

  return (
    <>
      <label className={cx("label", { focus: isFocused })}>
        <span>프로필 전체공개 설정</span>
        {/* 4. 초점 이동이 가능한 input 태그 사용 */}
        <input
          type="checkbox"
          /* 1. Toggle 스위치 정의 */
          role="switch"
          checked={isChecked}
          /* 켜짐/꺼짐 상태값 변경 */
          onChange={() => setIsChecked((prev) => !prev)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          /* 3. 스위치 설명 요소 id 참조 */
          aria-describedby="switch-hint-id"
          onKeyDown={handleKeyDown}
        />
        {/* 2. 중복된 정보 전달 방지를 위해 상태 텍스트 요소에 aria-hidden 속성 추가 */}
        <span aria-hidden="true">{isChecked ? "ON" : "OFF"}</span>
      </label>
      <p id="switch-hint-id" className={cx("helper-text")}>
        내 프로필(배경사진 및 동영상, 상태 메시지)을 친구들에게 전체 공개합니다.
      </p>
    </>
  );
}

export default InputToggleSwitch;
