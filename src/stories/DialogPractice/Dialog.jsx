import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Dialog.module.scss";

const cx = classNames.bind(styles);

const INTERACTIVE_ELEMENTS =
  "a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])";

function Dialog() {
  const dialogRef = useRef(null);
  const contentRef = useRef(null);

  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {

  }, [showDialog]);

  return (
    <>
      <button
        aria-haspopup="dialog"
        onClick={() => setShowDialog(true)}
        className={cx('button')}
      >
        모달 열기
      </button>
      {showDialog && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-desc-id"
          aria-describedby="modal-title-id"
          className={cx('dialog')}
        >
          <div ref={contentRef} className={cx('content')} tabIndex="-1">
            <button
              aria-label="모달 닫기"
              onClick={() => setShowDialog(false)}
              className={cx('button-close')}
            ></button>
            <h2 id="modal-title-id" className={cx('title')}>모달 제목</h2>
            <p id="modal-desc-id" className={cx('desc')}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            <button
              onClick={() => setShowDialog(false)}
              className={cx('button-confirm')}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Dialog;
