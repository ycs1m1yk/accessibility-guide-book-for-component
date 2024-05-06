import { useState, useCallback, forwardRef } from "react";

import styles from "./Accordion.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export const Accordion = forwardRef(function Accordion(
  { title, content, onFocusChange },
  ref,
) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionKeydown = useCallback(
    (event) => {
      switch (event.code) {
        case "ArrowDown":
          event.preventDefault();
          onFocusChange("next"); // 8. 초점을 다음 아코디언 헤더로 이동

          break;

        case "ArrowUp":
          event.preventDefault();
          onFocusChange("prev"); // 9. 초점을 이전 아코디언 헤더로 이동

          break;

        case "Home":
          event.preventDefault();
          onFocusChange("first"); // 10. 초점을 첫 번째 아코디언 헤더로 이동

          break;

        case "End":
          event.preventDefault();
          onFocusChange("last"); // 11. 초점을 마지막 아코디언 헤더로 이동

          break;

        default:
          break;
      }
    },
    [onFocusChange],
  );

  return (
    <>
      <button // 1. 버튼 태그 사용
        type="button"
        className={cx("header")}
        onClick={() => setIsOpen((prevOpen) => !prevOpen)} // 아코디언 상태 변경
        aria-expanded={isOpen} // 2. 아코디언 상태에 따라 aria-expanded 속성값 변경
        aria-controls={`accordion-panel-${title}-id`} // 3. 노출되는 아코디온 패널 요소 id 참조
        id={`accordion-header-${title}-id`} // 4. 아코디언 헤더의 id 정의
        onKeyDown={(event) => handleAccordionKeydown(event)} // 8. ~ 11. 키보드 컨트롤
        ref={ref}
      >
        {title}
      </button>
      <div
        id={`accordion-panel-${title}-id`} // 3. 아코디언 패널의 id 정의
        className={cx("panel")}
        aria-labelledby={`accordion-header-${title}-id`} // 4. 연관된 아코디온 헤더 요소 id 참조
        role="region" // 5. `role="region"` 명시
      >
        {content}
      </div>
    </>
  );
});
