import { useState, useEffect } from "react";
import classNames from "classnames/bind";

import styles from "./AriaSpinButton.module.scss";

const cx = classNames.bind(styles);

const MIN = 0;
const MAX = 100;
const STEP = 1;
/* 15. ~ 16. 키보드 Page Down, Page Up 키를 통해 감소, 증가시킬 간격 (1보다 크게 지정) */
const PAGE_STEP = 5;

function AriaSpinButton() {
  const [value, setValue] = useState(0);
  const [shouldReadValue, setShouldReadValue] = useState(false);

  const handleClickMinusButton = () => {
    /* 7. 스크린 리더를 통해 현재 값이 안내되도록 처리 */
    setShouldReadValue(true);

    /* 8. 감소 버튼에 의해서는 값이 MIN보다 작아지지 않도록 처리 */
    setValue(Math.max(value - STEP, MIN));
  };

  const handleClickPlusButton = () => {
    /* 7. 스크린 리더를 통해 현재 값이 안내되도록 처리 */
    setShouldReadValue(true);

    /* 8. 증가 버튼에 의해서는 값이 MAX보다 커지지 않도록 처리 */
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

  const handleKeyDown = (event) => {
    switch (event.code) {
      /* 11. Arrow Down 키를 통해 현재 값을 1만큼 감소 */
      case "ArrowDown":
        event.preventDefault();

        setValue(Math.max(value - STEP, MIN));
        break;

      /* 12. Arrow Up 키를 통해 현재 값을 1만큼 증가 */
      case "ArrowUp":
        event.preventDefault();

        setValue(Math.min(value + STEP, MAX));
        break;

      /* 13. Home 키를 통해 현재 값을 최소값으로 지정 */
      case "Home":
        event.preventDefault();

        setValue(MIN);
        break;

      /* 14. End 키를 통해 현재 값을 최대값으로 지정 */
      case "End":
        event.preventDefault();

        setValue(MAX);
        break;

      /* 15. Page Down 키를 통해 현재 값을 5만큼 감소 */
      case "PageDown":
        event.preventDefault();

        setValue(Math.max(value - PAGE_STEP, MIN));
        break;

      /* 16. Page Up 키를 통해 현재 값을 5만큼 증가 */
      case "PageUp":
        event.preventDefault();

        setValue(Math.min(value + PAGE_STEP, MAX));
        break;
    }
  };

  return (
    <>
      {/* 2. SpinButton 요소 레이블 제공 */}
      <strong id="spinbutton-label-id" className={cx("label")}>
        수량
      </strong>
      <div className={cx("spinbutton-wrap")}>
        <button
          type="button"
          /* 6. 감소 버튼 레이블 추가 */
          aria-label={`수량 ${STEP}개 빼기`}
          onClick={handleClickMinusButton}
          /* 10. 중복된 기능은 키보드 초점 받지 않도록 처리 */
          tabIndex={-1}
          className={cx("button-minus")}
        >
          -
        </button>
        <div
          /* 1. SpinButton 역할 명시 */
          role="spinbutton"
          /* 2. 레이블 역할을 하는 요소 id 참조 */
          aria-labelledby="spinbutton-label-id"
          /* 3. 현재 값 */
          aria-valuenow={value}
          /* 4. 현재 값을 명확한 텍스트 형식으로 제공 */
          aria-valuetext={`${value}개`}
          /* 5. 최소값 */
          aria-valuemin={MIN}
          /* 5. 최댓값 */
          aria-valuemax={MAX}
          /* 9. SpinButton이 초점을 받을 수 있도록 처리 */
          tabIndex={0}
          /* 11. ~ 16. 키보드 컨트롤 동작 */
          onKeyDown={handleKeyDown}
          className={cx("spinbutton-custom")}
        >
          {value}
        </div>
        <button
          type="button"
          /* 6. 증가 버튼 레이블 추가 */
          aria-label={`수량 ${STEP}개 더하기`}
          onClick={handleClickPlusButton}
          /* 10. 중복된 기능은 키보드 초점 받지 않도록 처리 */
          tabIndex={-1}
          className={cx("button-plus")}
        >
          +
        </button>
        {/* 7. 감소/증가 버튼을 통해 현재 값이 변경될 때, 스크린 리더를 통해 현재 값을 안내 */}
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

export default AriaSpinButton;
