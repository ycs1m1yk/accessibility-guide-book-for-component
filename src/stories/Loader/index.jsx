import { useEffect, useState } from "react";

function Loader({ isLoading }) {
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showCompleteMessage, setShowCompleteMessage] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowLoadingMessage(true);

      return;
    }

    // 로딩 완료되면 '로딩 중' 제거
    setShowLoadingMessage(false);

    // 로딩 완료되면 '로딩 완료' 안내
    setShowCompleteMessage(true);

    // '로딩 완료' 안내 후 DOM에서 제거
    const showCompleteMessageTimer = setTimeout(() => {
      setShowCompleteMessage(false);
    }, 500);

    return () => {
      clearTimeout(showCompleteMessageTimer);
    };
  }, [isLoading]);

  return (
    <>
      {!isLoading && <main>로딩 완료 후 렌더링 되는 페이지</main>}

      <div
        // 1. 로딩 상태 메시지를 즉각적으로 안내하도록 ARIA 속성 추가
        aria-live="assertive"
        // 2. 로딩 상태 메시지 전체를 안내하도록 ARIA 속성 추가
        aria-atomic="true"
      >
        {showLoadingMessage && (
          <>
            {/* 로딩을 시각적으로 제공하는 UI */}
            {/* TODO: 빌리 */}
            {/* <Loading /> */}
            로딩
            {/* 3. 로딩 중인 경우 '로딩 중' 메시지 안내 */}
            <span className="visually-hidden">로딩 중</span>
          </>
        )}

        {/* 4. 로딩이 완료되면 '로딩 완료' 메시지 안내 */}
        {showCompleteMessage && (
          <span className="visually-hidden">로딩 완료</span>
        )}
      </div>
    </>
  );
}

export default Loader;
