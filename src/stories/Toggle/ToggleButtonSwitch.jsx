import { useState } from "react";

import styles from "./ToggleButtonSwitch.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ToggleButtonSwitch({ label }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    /* 4. 초점 이동이 가능한 button 태그 사용 */
    <button
      className={cx("button")}
      type="button"
      /* 1. 스위치 역할 정의 */
      role="switch"
      /* 2. 켜짐/꺼짐 상태값 변경 */
      aria-checked={isChecked}
      onClick={() => setIsChecked((prev) => !prev)}
    >
      {label}
      <span className={cx("switch")} />
      {/* 1. 중복된 정보 전달 방지를 위해 상태 텍스트 요소에 aria-hidden 속성 추가 */}
      <span aria-hidden="true">{isChecked ? "ON" : "OFF"}</span>
    </button>
  );
}

export default ToggleButtonSwitch;
