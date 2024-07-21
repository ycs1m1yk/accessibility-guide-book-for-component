import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./SemanticSpinButton.module.scss";

const cx = classNames.bind(styles);

const MIN = 0;
const MAX = 100;

function SemanticSpinButton() {
  const [value, setValue] = useState(0);

  /* 4. 사용자가 직접 입력 또는 수정하는 경우에도 선택할 수 있는 값의 범위 제한 */
  useEffect(() => {
    if (value > MAX) {
      setValue(MAX);
    }
    if (value < MIN) {
      setValue(MIN);
    }
  }, [value]);

  return (
    <>
      {/* 2. SpinButton 요소 레이블 제공 */}
      <label htmlFor="spinbutton-id" className={cx("label")}>
        수량
      </label>
      <div className={cx("spinbutton-wrap")}>
        <button
          type="button"
          /* 6. 중복된 기능은 키보드 초점 받지 않도록 처리 */
          tabIndex={-1}
          /* 7. 스크린 리더를 통해 접근하지 못하도록 처리 */
          aria-hidden="true"
          /* 8. 감소 버튼에 의해서는 값이 MIN보다 작아지지 않도록 처리 */
          onClick={() => setValue(Math.max(value - 1, MIN))}
          className={cx("button-minus")}
        >
          -
        </button>
        {/* 1. 시맨틱 태그를 사용하여 SpinButton 제공 */}
        <input
          type="number"
          id="spinbutton-id"
          /* 3. 선택할 수 있는 최소값 지정 */
          min={MIN}
          /* 3. 선택할 수 있는 최대값 지정 */
          max={MAX}
          /* 5. 한번에 감소/증가 시킬 크기 지정 */
          step={1}
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          className={cx("spinbutton")}
        />
        <button
          type="button"
          /* 6. 중복된 기능은 키보드 초점 받지 않도록 처리 */
          tabIndex={-1}
          /* 7. 스크린 리더를 통해 접근하지 못하도록 처리 */
          aria-hidden="true"
          /* 8. 증가 버튼에 의해서는 값이 MAX보다 커지지 않도록 처리 */
          onClick={() => setValue(Math.min(value + 1, MAX))}
          className={cx("button-plus")}
        >
          +
        </button>
      </div>
    </>
  );
}

export default SemanticSpinButton;
