import { useEffect, useState, useRef } from "react";
import classNames from "classnames/bind";

import styles from "./MenuBar1Depth.module.scss";

const cx = classNames.bind(styles);

const MENU_LIST = ["홈", "소개", "소식", "문의"];

function MenuBar1Depth() {
  const menubarRef = useRef(null);
  const menuItemRefs = useRef([]);

  /* 9. 메뉴 항목에 초점이 있는지 여부 */
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    const menubarElement = menubarRef.current;

    if (!menubarElement) {
      return;
    }

    /* 9. 메뉴 항목에 초점이 존재하는지 여부 체크 */
    const checkMenubarHasFocus = () => {
      setHasFocus(menubarElement.contains(document.activeElement));
    };

    menubarElement.addEventListener("focusin", checkMenubarHasFocus);
    menubarElement.addEventListener("focusout", checkMenubarHasFocus);

    return () => {
      menubarElement.removeEventListener("focusin", checkMenubarHasFocus);
      menubarElement.removeEventListener("focusout", checkMenubarHasFocus);
    };
  }, []);

  /* 8. 활성화된 메뉴 항목 index */
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  /* 6. 선택된 메뉴 항목 index */
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);

  /* 10. pointerover 이벤트 발생 시 해당 메뉴 항목 활성화 및 초점 이동 */
  const moveFocusToMenuItem = (targetIndex) => {
    if (!hasFocus) {
      return;
    }

    setActiveMenuItem(targetIndex);

    const targetMenuItem = menuItemRefs.current[targetIndex];
    targetMenuItem.focus();
  };

  const handleKeyDownMenuItem = (event) => {
    switch (event.code) {
      /* 11. ArrowLeft 키를 통해 이전 메뉴 항목으로 초점 이동 */
      case "ArrowLeft":
        event.preventDefault();

        const prevIndex =
          activeMenuItem > 0 ? activeMenuItem - 1 : MENU_LIST.length - 1;
        moveFocusToMenuItem(prevIndex);
        break;

      /* 12. ArrowRight 키를 통해 다음 메뉴 항목으로 초점 이동 */
      case "ArrowRight":
        event.preventDefault();

        const nextIndex =
          activeMenuItem < MENU_LIST.length - 1 ? activeMenuItem + 1 : 0;
        moveFocusToMenuItem(nextIndex);
        break;

      /* 13. Home 키를 통해 첫번째 메뉴 항목으로 초점 이동 */
      case "Home":
        event.preventDefault();

        moveFocusToMenuItem(0);
        break;

      /* 14. End 키를 통해 마지막 메뉴 항목으로 초점 이동 */
      case "End":
        event.preventDefault();

        moveFocusToMenuItem(MENU_LIST.length - 1);
        break;

      /* 15. Enter 또는 Spcae 키를 통해 해당 메뉴 항목 선택 */
      case "Enter":
      case "Space":
        event.preventDefault();

        setSelectedMenuItem(activeMenuItem);
        break;
    }
  };

  return (
    /* 1. <nav> 태그 사용 */
    /* 2. aria-label 추가 (스크린 리더 🔈: 메인, 탐색) */
    <nav aria-label="메인">
      <div
        ref={menubarRef}
        /* 3. menubar 역할 명시 */
        role="menubar"
        /* 4. aria-label 추가 (스크린 리더 🔈: 메뉴표시줄 메인 4개의 항목) */
        aria-label="메인"
        className={cx("menubar")}
      >
        {MENU_LIST.map((menuItem, menuIndex) => (
          <a
            ref={(element) => (menuItemRefs.current[menuIndex] = element)}
            key={menuIndex}
            href="#"
            /* 5. menuitem 역할 명시 */
            role="menuitem"
            /* 6. 선택된 메뉴 항목에 aria-current="page" 속성 추가 */
            aria-current={menuIndex === selectedMenuItem ? "page" : undefined}
            /* 7. 메뉴 항목 클릭 시 해당 메뉴 항목 선택 */
            onClick={(event) => {
              event.preventDefault(); // 링크 동작 제거(스토리북 테스트용)
              setSelectedMenuItem(menuIndex);
            }}
            /* 8. 활성화된 메뉴 항목에만 tabindex="0" 추가 */
            tabIndex={menuIndex === activeMenuItem ? 0 : -1}
            /* 10. pointerover 이벤트 발생 시 해당 메뉴 항목으로 초점 이동 */
            onPointerOver={() => moveFocusToMenuItem(menuIndex)}
            /* 11. ~ 15. 키보드 컨트롤 */
            onKeyDown={handleKeyDownMenuItem}
            className={cx("menuitem")}
          >
            {menuItem}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default MenuBar1Depth;
