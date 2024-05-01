import { useState } from "react";

import styles from "./ToggleButton.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ToggleButton() {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      className={cx("button", { pressed: isPressed })}
      type="button" // 3. 초점 이동이 가능한 button 태그 사용
      aria-pressed={isPressed} // 1. 토글 버튼으로 전환
      aria-label="재생" // 2. 레이블 텍스트 고정
      onClick={() => {
        setIsPressed((prev) => !prev);
      }}
    />
  );
}

export default ToggleButton;
