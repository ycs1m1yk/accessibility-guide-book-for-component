import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./SemanticSpinButton.module.scss";

const cx = classNames.bind(styles);

const MIN = 0;
const MAX = 100;
const STEP = 1;

function SemanticSpinButton() {
  const [value, setValue] = useState(0);
  const [shouldReadValue, setShouldReadValue] = useState(false);

  /* 4. 사용자가 직접 입력 또는 수정하는 경우에도 선택할 수 있는 값의 범위 제한 */
  useEffect(() => {
    if (value > MAX) {
      setValue(MAX);
    }
    if (value < MIN) {
      setValue(MIN);
    }
  }, [value]);

  const handleClickMinusButton = () => {
    /* 8. 스크린 리더를 통해 현재 값이 안내되도록 처리 */
    setShouldReadValue(true);

    /* 9. 감소 버튼에 의해서는 값이 MIN보다 작아지지 않도록 처리 */
    setValue(Math.max(value - STEP, MIN));
  };

  const handleClickPlusButton = () => {
    /* 8. 스크린 리더를 통해 현재 값이 안내되도록 처리 */
    setShouldReadValue(true);

    /* 9. 증가 버튼에 의해서는 값이 MAX보다 커지지 않도록 처리 */
    setValue(Math.min(value + STEP, MAX));
  };

  /* 8. 스크린 리더를 통해 현재 값 안내 후 DOM에서 제거 */
  useEffect(() => {
    if (setShouldReadValue) {
      setTimeout(() => {
        setShouldReadValue(false);
      }, 100);
    }
  }, [shouldReadValue]);

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
          /* 7. 감소 버튼 레이블 추가 */
          aria-label={`수량 ${STEP}개 빼기`}
          onClick={handleClickMinusButton}
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
          step={STEP}
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          className={cx("spinbutton")}
        />
        <button
          type="button"
          /* 6. 중복된 기능은 키보드 초점 받지 않도록 처리 */
          tabIndex={-1}
          /* 7. 증가 버튼 레이블 추가 */
          aria-label={`수량 ${STEP}개 더하기`}
          onClick={handleClickPlusButton}
          className={cx("button-plus")}
        >
          +
        </button>
        {/* 8. 감소/증가 버튼을 통해 현재 값이 변경될 때, 스크린 리더를 통해 현재 값을 안내 */}
        {shouldReadValue && (
          <span
            aria-live="assertive"
            aria-atomic="true"
            aria-label={`${value}개`}
            className="visually-hidden"
          />
        )}
      </div>
    </>
  );
}

export default SemanticSpinButton;
