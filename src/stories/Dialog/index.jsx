import { useEffect, useRef, useState } from "react";

const INTERACTIVE_ELEMENTS =
  "a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])";

function Dialog() {
  const dialogRef = useRef(null);
  const contentRef = useRef(null);

  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!showDialog) {
      return;
    }

    const dialogContent = contentRef.current;

    // 열릴 때 활성화된 요소 저장
    const prevFocusRef = document.activeElement;

    // 5. 열릴 때 내부로 초점 이동
    dialogContent.focus();

    // 다이얼로그 형제 요소들
    const siblingNodes = dialogRef.current.parentNode.childNodes;

    // 다이얼로그 내 초점 가능한 요소들
    const focusableElements =
      dialogContent.querySelectorAll(INTERACTIVE_ELEMENTS);
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
        // 10. 첫번째 요소에서 'Shift + Tab'키 동작 시 마지막 요소로 초점 이동
        if (event.shiftKey && isFirstFocusableElementActive) {
          event.preventDefault();

          lastFocusableElement.focus();
        }

        // 11. 마지막 요소에서 'Tab'키 동작 시 첫번째 요소로 초점 이동
        if (isLastFocusableElementActive) {
          event.preventDefault();

          firstFocusableElement.focus();
        }
      }
    };

    // 7. 다이얼로그 형제 요소들에 aria-hidden="true" 추가
    Array.from(siblingNodes).forEach((child) => {
      if (child !== dialogRef.current) {
        child.setAttribute("aria-hidden", "true");
      }
    });

    // 12. `Esc` 키를 통해 다이얼로그 닫기
    const closeDialog = (event) => {
      if (event.code === "Escape") {
        event.preventDefault();

        setShowDialog(false);
      }
    };

    dialogContent.addEventListener("keydown", focusTrap);
    dialogContent.addEventListener("keydown", closeDialog);

    return () => {
      // 8. 닫힐 때 초점 복귀
      prevFocusRef.focus();

      dialogContent.removeEventListener("keydown", focusTrap);
      dialogContent.removeEventListener("keydown", closeDialog);
    };
  }, [showDialog]);

  return (
    <>
      {/* 다이얼로그를 화면에 나타나게 하는 트리거 요소 */}
      <button
        type="button"
        // 4. 다이얼로그가 나타날 것임을 안내
        aria-haspopup="dialog"
        onClick={() => setShowDialog(true)}
      >
        {/* TODO: 빌리 */}
      </button>
      {showDialog && (
        <div
          ref={dialogRef}
          // 1. dialog 역할 명시
          role="dialog"
          // 2. 모달 형태로 제공
          aria-modal="true"
          // 3. 제목을 나타내는 텍스트 요소 id 참조
          aria-labelledby="dialog-title-id"
          // 3. 설명을 나타내는 텍스트 요소 id 참조
          aria-describedby="dialog-description-id"
        >
          <div ref={contentRef} tabIndex={-1}>
            {/* 9. 다이얼로그 내부 닫기 버튼 */}
            <button type="button" onClick={() => setShowDialog(false)}>
              닫기
            </button>
            <h2 id="dialog-title-id">다이얼로그란?</h2>
            <p id="dialog-description-id">페이지 위에 새로 배치되는 대화상자</p>
            {/* TODO: 빌리 */}
            {/* {...} */}
          </div>
        </div>
      )}
    </>
  );
}

export default Dialog;
