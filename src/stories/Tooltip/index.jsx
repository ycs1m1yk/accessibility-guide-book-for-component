import { useEffect, useState } from "react";

import styles from "./Tooltip.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Tooltip() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // 5. 툴팁이 열린 경우, `Esc` 키를 통해 툴팁 닫기
    if (showTooltip) {
      const escKeyHandler = (event) => {
        if (event.code === "Escape") {
          setShowTooltip(false);
        }
      };

      window.addEventListener("keydown", escKeyHandler);

      return () => window.removeEventListener("keydown", escKeyHandler);
    }
  }, [showTooltip]);

  return (
    <div className={cx("detail")}>
      <p>제주 3,000원, 도서산간 3,000원 추가</p>
      <button
        type="button"
        aria-label="도움말"
        onClick={() => {
          setShowTooltip((prev) => !prev);
        }}
        // 2. 툴팁 요소 id 참조
        aria-describedby="tooltip-container-id"
        // 3. 마우스를 트리거 요소 위에 올린 경우 툴팁 열기
        onMouseEnter={() => setShowTooltip(true)}
        // 3. 마우스를 트리거 요소 위에 올리지 않은 경우 툴팁 닫기
        onMouseLeave={() => setShowTooltip(false)}
        // 4. 초점이 트리거 요소로 이동하면 툴팁 열기
        onFocus={() => setShowTooltip(true)}
        // 4. 초점이 트리거 외의 요소로 이동하면 툴팁 닫기
        onBlur={() => setShowTooltip(false)}
      />

      {showTooltip && (
        <div
          // 1. 툴팁 역할 명시
          role="tooltip"
          className={cx("tooltip-container")}
          id="tooltip-container-id"
          // 3. 마우스를 툴팁 위에 올린 경우 툴팁 열기
          onMouseEnter={() => setShowTooltip(true)}
          // 3. 마우스를 툴팁 위에 올리지 않은 경우 툴팁 닫기
          onMouseLeave={() => setShowTooltip(false)}
        >
          장바구니에서 제주/도서산간 배송비 확인 가능
        </div>
      )}
    </div>
  );
}

export default Tooltip;
