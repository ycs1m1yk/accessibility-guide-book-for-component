import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Alert.module.scss";

const cx = classNames.bind(styles);

function Alert() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert) {
      /* 2. 5초 뒤 Alert 제거 */
      const showAlertTimer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => {
        clearTimeout(showAlertTimer);
      };
    }
  }, [showAlert]);

  return (
    <>
      {/* Alert 요소를 화면에 노출시키는 트리거 버튼 */}
      <button
        type="button"
        onClick={() => setShowAlert(true)}
        className={cx("button")}
      >
        Alert 노출
      </button>
      {showAlert && (
        /* 2. Alert 역할 명시 */
        <p role="alert" className={cx("alert")}>
          네트워크 오류가 발생했습니다.
        </p>
      )}
    </>
  );
}

export default Alert;
