import { useState, useCallback, forwardRef } from "react";

import styles from "./AccordionItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export const AccordionItem = forwardRef(function AccordionItem(
  { title, content, onFocusChange },
  ref,
) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionKeydown = useCallback(
    (event) => {
      switch (event.code) {
        case "ArrowDown":
          event.preventDefault();
          /* 7. 다음 Accordion 헤더로 초점 이동 */
          onFocusChange("next");

          break;

        case "ArrowUp":
          event.preventDefault();
          /* 8. 이전 Accordion 헤더로 초점 이동 */
          onFocusChange("prev");

          break;

        case "Home":
          event.preventDefault();
          /* 9. 첫 번째 Accordion 헤더로 초점 이동 */
          onFocusChange("first");

          break;

        case "End":
          event.preventDefault();
          /* 10. 마지막 Accordion 헤더로 초점 이동 */
          onFocusChange("last");

          break;

        default:
          break;
      }
    },
    [onFocusChange],
  );

  return (
    <>
      {/* 1. 버튼 태그 사용 */}
      <button
        type="button"
        className={cx("header")}
        /* Accordion 상태 변경 */
        onClick={() => setIsOpen((prev) => !prev)}
        /* 2. Accordion 상태에 따라 aria-expanded 속성값 변경 */
        aria-expanded={isOpen}
        /* 3. 노출되는 Accordion 패널 요소 id 참조 */
        aria-controls={`accordion-panel-${title}-id`}
        /* 4. Accordion 헤더의 id 정의 */
        id={`accordion-header-${title}-id`}
        /* 7. ~ 10. 키보드 컨트롤 */
        onKeyDown={(event) => handleAccordionKeydown(event)}
        ref={ref}
      >
        {title}
      </button>
      <div
        /* 3. Accordion 패널의 id 정의 */
        id={`accordion-panel-${title}-id`}
        className={cx("panel")}
        /* 4. 연관된 Accordion 헤더 요소 id 참조 */
        aria-labelledby={`accordion-header-${title}-id`}
        /* 5. role="region" 명시 */
        role="region"
      >
        {content}
      </div>
    </>
  );
});
