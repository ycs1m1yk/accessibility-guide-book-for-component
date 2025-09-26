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
      const menubarHasFocus =  menubarElement.contains(document.activeElement);
      setHasFocus(menubarHasFocus);
    };

    return () => {
    };
  }, []);

  /* 8. 활성화된 메뉴 항목 index */
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  /* 6. 선택된 메뉴 항목 index */
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);

  /* 10. pointerover 이벤트 발생 시 해당 메뉴 항목 활성화 및 초점 이동 */
  const moveFocusToMenuItem = (targetIndex) => {
  };

  const handleKeyDownMenuItem = (event) => {
  };

  return (
    <nav aria-label="메인">
      <div ref={menubarRef} role="menubar" aria-label="메인" className={cx('menubar')}>
        {MENU_LIST.map((menuName, menuIndex) => (
          <a
            ref={(element) => (menuItemRefs.current[menuIndex] = element)}
            role="menuitem"
            aria-selected={menuIndex === selectedMenuItem}
            aria-current={menuIndex === selectedMenuItem ? 'page' : undefined}
            href="#"
            className={cx('menuitem')}
          >
            {menuName}
          </a>
        )
        )}
      </div>
    </nav>
  );
}

export default MenuBar1Depth;
