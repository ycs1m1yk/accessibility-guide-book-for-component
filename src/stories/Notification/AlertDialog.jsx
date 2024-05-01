import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "./AlertDialog.module.scss";

const cx = classNames.bind(styles);

const INTERACTIVE_ELEMENTS =
  "a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])";

function AlertDialog() {
  const alertDialogRef = useRef(null);
  const contentRef = useRef(null);

  const [showAlertDialog, setShowAlertDialog] = useState(false);

  useEffect(() => {
    if (!showAlertDialog) {
      return;
    }

    const alertDialogContent = contentRef.current;

    // 열릴 때 활성화된 요소 저장
    const prevFocusRef = document.activeElement;

    // 5. 열릴 때 내부로 초점 이동
    alertDialogContent.focus();

    // alertdialog 형제 요소들
    const siblingNodes = alertDialogRef.current.parentNode.childNodes;

    // alertdialog 내 초점 가능한 요소들
    const focusableElements =
      alertDialogContent.querySelectorAll(INTERACTIVE_ELEMENTS);
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    // 6. 내부 초점 순환
    const focusTrap = (event) => {
      const currentFocusElement = document.activeElement;
      const isFirstFocusableElementActive =
        currentFocusElement === firstFocusableElement;
      const isLastFocusableElementActive =
        currentFocusElement === lastFocusableElement;

      if (event.code === "Tab") {
        // 9. 첫번째 요소에서 'Shift + Tab'키 동작 시 마지막 요소로 초점 이동
        if (event.shiftKey && isFirstFocusableElementActive) {
          event.preventDefault();

          lastFocusableElement.focus();
        }

        // 10. 마지막 요소에서 'Tab'키 동작 시 첫번째 요소로 초점 이동
        if (isLastFocusableElementActive) {
          event.preventDefault();

          firstFocusableElement.focus();
        }
      }
    };

    // 7. alertdialog 형제 요소들에 aria-hidden="true" 추가
    Array.from(siblingNodes).forEach((child) => {
      if (child !== alertDialogRef.current) {
        child.setAttribute("aria-hidden", "true");
      }
    });

    // 11. `Esc` 키를 통해 alertdialog 닫기
    const close = (event) => {
      if (event.code === "Escape") {
        event.preventDefault();

        setShowAlertDialog(false);
      }
    };

    alertDialogContent.addEventListener("keydown", focusTrap);
    alertDialogContent.addEventListener("keydown", close);

    return () => {
      // 8. 닫힐 때 초점 복귀
      prevFocusRef.focus();

      alertDialogContent.removeEventListener("keydown", focusTrap);
      alertDialogContent.removeEventListener("keydown", close);
    };
  }, [showAlertDialog]);

  return (
    <>
      <button
        type="button"
        // 4. dialog가 나타날 것임을 안내
        aria-haspopup="dialog"
        onClick={() => setShowAlertDialog(true)}
        className={cx("button")}
      >
        AlertDialog 노출
      </button>
      {showAlertDialog && (
        <div
          ref={alertDialogRef}
          // 1. alertdialog 역할 명시
          role="alertdialog"
          // 2. 모달 형태로 제공
          aria-modal="true"
          // 3. 제목을 나타내는 텍스트 요소 id 참조
          aria-labelledby="alertdialog-title-id"
          // 3. 설명을 나타내는 텍스트 요소 id 참조
          aria-describedby="alertdialog-description-id"
          className={cx("dialog")}
        >
          <div ref={contentRef} tabIndex={-1} className={cx("content")}>
            <h2 id="alertdialog-title-id" className={cx("title")}>
              메시지 삭제
            </h2>
            <p id="alertdialog-description-id" className={cx("desc")}>
              정말 삭제하시겠습니까?
            </p>
            <button
              type="button"
              onClick={() => setShowAlertDialog(false)}
              className={cx("control-button")}
            >
              아니오
            </button>
            <button type="button" className={cx("control-button")}>
              네, 삭제합니다
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AlertDialog;
