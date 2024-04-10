import { useState } from "react";

import styles from "./InputToggleSwitch.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function InputToggleSwitch() {
  const [isChecked, setIsChecked] = useState(false);

  const handleKeyDown = (event) => {
    // 6. Enter 키 눌렀을 때 스위치 상태 변경
    if (event.code === "Enter") {
      setIsChecked((prev) => !prev);
    }
  };

  return (
    <label className={cx("label")}>
      <span>프로필 전체공개 설정</span>
      {/* 4. 초점 이동이 가능한 input 태그 사용 */}
      <input
        type="checkbox"
        role="switch" // 1. 토글 스위치 정의
        checked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)} // 켜짐/꺼짐 상태값 변경
        onKeyDown={handleKeyDown} // 6. 키보드 컨트롤
      />
      {/* 2. 중복된 정보 전달 방지를 위해 상태 텍스트 요소에 aria-hidden 속성 추가 */}
      <span aria-hidden="true">{isChecked ? "ON" : "OFF"}</span>
    </label>
  );
}

export default InputToggleSwitch;
