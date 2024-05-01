import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Alert.module.scss";

const cx = classNames.bind(styles);

function Alert() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert) {
      // 2. 5초 뒤 alert 제거
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
      {/* alert 요소를 화면에 노출시키는 트리거 버튼 */}
      <button
        type="button"
        onClick={() => setShowAlert(true)}
        className={cx("button")}
      >
        Alert 노출
      </button>
      {showAlert && (
        <p role="alert" className={cx("alert")}>
          업데이트가 완료되었습니다.
        </p>
      )}
    </>
  );
}

export default Alert;
