import { useEffect, useState, useRef } from "react";
import classNames from "classnames/bind";

import styles from "./MenuBar2Depth.module.scss";

const cx = classNames.bind(styles);

const MENU_LIST = [
  {
    menuItem: "홈",
  },
  {
    menuItem: "소개",
    subMenu: ["인사말", "조직 및 경영진", "연혁"],
  },
  {
    menuItem: "소식",
    subMenu: ["공지사항", "보도자료"],
  },
  {
    menuItem: "문의",
    subMenu: ["자주 묻는 질문", "고객센터"],
  },
];

/* 초기 하위 메뉴 펼쳐짐 여부 (초기에는 펼쳐진 메뉴 없음) */
const INITIAL_EXPANDED_SUB_MENU = new Array(MENU_LIST.length).fill(false);
const INITIAL_SELECTED_SUB_MENU_ITEM = new Array(MENU_LIST.length).fill(-1);

function MultipleMenuBar() {
  const menubarRef = useRef(null);
  const menuItemRefs = useRef([]);
  const subMenuItemRefs = useRef([]);

  /* 16. 메뉴 항목에 초점이 있는지 여부 */
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    const menubarElement = menubarRef.current;

    if (!menubarElement) {
      return;
    }

    /* 16. 메뉴 항목에 초점이 존재하는지 여부 체크 */
    const checkMenubarHasFocus = () => {
      setHasFocus(menubarElement.contains(document.activeElement));
    };

    /* 18. 메뉴바 외부 영역을 클릭한 경우 모든 드롭다운 메뉴를 닫기 */
    const handleOutsideClick = (event) => {
      if (!menubarElement.contains(event.target)) {
        closeSubMenu();
      }
    };

    menubarElement.addEventListener("focusin", checkMenubarHasFocus);
    menubarElement.addEventListener("focusout", checkMenubarHasFocus);
    window.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      menubarElement.removeEventListener("focusin", checkMenubarHasFocus);
      menubarElement.removeEventListener("focusout", checkMenubarHasFocus);
      window.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  const [expandedSubMenu, setExpandedSubMenu] = useState(
    INITIAL_EXPANDED_SUB_MENU,
  );
  const [canExpandedDropDown, setCanExpandedDropDown] = useState(true);

  /* 15. 활성화된 상위 메뉴 항목 index */
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  /* 8. 선택된 상위 메뉴 항목 index */
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);

  /* 15. 활성화된 하위 메뉴 항목 index */
  const [activeSubMenuItem, setActiveSubMenuItem] = useState(
    INITIAL_SELECTED_SUB_MENU_ITEM,
  );
  /* 13. 상위 메뉴 항목 index에 해당하는 선택된 하위 메뉴 항목 index */
  const [selectedSubMenuItem, setSelectedSubMenuItem] = useState(
    INITIAL_SELECTED_SUB_MENU_ITEM,
  );

  /* 드롭다운 메뉴 펼치기 */
  const openSubMenu = (index) => {
    if (!hasFocus) {
      return;
    }

    const newExpandedSubMenu = [...INITIAL_EXPANDED_SUB_MENU];
    newExpandedSubMenu[index] = true;

    setExpandedSubMenu(newExpandedSubMenu);
  };

  const closeSubMenu = () => {
    setExpandedSubMenu(INITIAL_EXPANDED_SUB_MENU);
  };

  const toggleSubMenu = (index) => {
    const newExpandedSubMenu = [...INITIAL_EXPANDED_SUB_MENU];
    newExpandedSubMenu[index] = !expandedSubMenu[index];

    setExpandedSubMenu(newExpandedSubMenu);
  };

  /* 9. 상위 메뉴 항목 클릭 시 동작 */
  const handleClickMenuItem = (index, hasSubMenu) => {
    if (hasSubMenu) {
      toggleSubMenu(index);
    } else {
      setSelectedMenuItem(index);
      /* 상위 메뉴 항목 선택 시 하위 메뉴 항목 선택 초기화 */
      setSelectedSubMenuItem(INITIAL_SELECTED_SUB_MENU_ITEM);
      closeSubMenu();
    }
  };

  /* 14. 하위 메뉴 항목 클릭 시 동작 */
  const handleClickSubMenuItem = (index) => {
    const newSubMenuItemList = [...INITIAL_SELECTED_SUB_MENU_ITEM];
    newSubMenuItemList[activeMenuItem] = index;

    setSelectedSubMenuItem(newSubMenuItemList);
    setSelectedMenuItem(activeMenuItem);
    closeSubMenu();
  };

  /* 상위 메뉴 항목 활성화 및 초점 이동 */
  const moveFocusToMenuItem = (targetIndex) => {
    if (!hasFocus) {
      return;
    }

    /* 해당 상위 메뉴 항목으로 초점 이동 */
    const targetMenuItem = menuItemRefs.current[targetIndex];
    targetMenuItem.focus();

    /* 상위 메뉴 항목으로 초점이 이동되었을때, 드롭다운 메뉴가 자동으로 열릴 수 있는 상태라면 열기 */
    if (canExpandedDropDown) {
      openSubMenu(targetIndex);
    }
  };

  /* 하위 메뉴 항목 활성화 및 초점 이동 */
  const moveFocusToSubMenuItem = (targetIndex) => {
    if (!hasFocus) {
      return;
    }

    /* 해당 하위 메뉴 항목으로 초점 이동 */
    const targetSubMenuItem =
      subMenuItemRefs.current[activeMenuItem][targetIndex];
    targetSubMenuItem.focus();
  };

  /* 드롭다운 메뉴를 열고난 후 하위 메뉴 항목으로 초점 이동 */
  const moveFocusToSubMenuItemAfterOpenSubMenu = (index) => {
    openSubMenu(activeMenuItem);

    /* 드롭다운 메뉴가 열리고 나서 초점이 이동될 수 있도록 적용 */
    setTimeout(() => moveFocusToSubMenuItem(index));
  };

  /* 19. ~ 27. 상위 메뉴 항목 키보드 컨트롤 */
  const handleKeyDownMenuItem = (event, hasSubMenu) => {
    switch (event.code) {
      /* 19. ArrowLeft 키를 통해 이전 상위 메뉴 항목으로 초점 이동 */
      case "ArrowLeft":
        event.preventDefault();

        const prevIndex =
          activeMenuItem > 0 ? activeMenuItem - 1 : MENU_LIST.length - 1;
        moveFocusToMenuItem(prevIndex);
        break;

      /* 20. ArrowRight 키를 통해 다음 상위 메뉴 항목으로 초점 이동 */
      case "ArrowRight":
        event.preventDefault();

        const nextIndex =
          activeMenuItem < MENU_LIST.length - 1 ? activeMenuItem + 1 : 0;
        moveFocusToMenuItem(nextIndex);
        break;

      /* 21. Home 키를 통해 첫번째 상위 메뉴 항목으로 초점 이동 */
      case "Home":
        event.preventDefault();

        moveFocusToMenuItem(0);
        break;

      /* 22. End 키를 통해 마지막 상위 메뉴 항목으로 초점 이동 */
      case "End":
        event.preventDefault();

        moveFocusToMenuItem(MENU_LIST.length - 1);
        break;

      /* 23. ArrowDown 키를 통해 드롭다운 메뉴를 펼치고, 첫번째 하위 메뉴 항목으로 초점 이동 */
      case "ArrowDown":
        /* 하위 메뉴 항목이 있는 경우에만 적용 */
        if (!hasSubMenu) {
          return;
        }

        event.preventDefault();

        moveFocusToSubMenuItemAfterOpenSubMenu(0);
        setCanExpandedDropDown(true);
        break;

      /* 24. ArrowUp 키를 통해 드롭다운 메뉴를 펼치고, 마지막 하위 메뉴 항목으로 초점 이동 */
      case "ArrowUp":
        /* 하위 메뉴 항목이 있는 경우에만 적용 */
        if (!hasSubMenu) {
          return;
        }

        event.preventDefault();

        moveFocusToSubMenuItemAfterOpenSubMenu(
          MENU_LIST[activeMenuItem].subMenu.length - 1,
        );
        setCanExpandedDropDown(true);
        break;

      /* 25. Esc 키를 통해 드롭다운 메뉴를 닫고, 상위 메뉴 항목으로 초점 이동 */
      case "Escape":
        event.preventDefault();

        /* Esc 키를 통해 드롭다운 메뉴가 닫힌 경우, 드롭다운 메뉴가 자동으로 열릴 수 없는 상태로 변경 */
        setCanExpandedDropDown(false);
        closeSubMenu();

        const targetMenuItem = menuItemRefs.current[activeMenuItem];
        targetMenuItem.focus();
        break;

      /* 26. Tab 키를 통해 드롭다운 메뉴를 닫고, 원래의 Tab키 동작 수행 */
      case "Tab":
        /* Tab 키를 통해 드롭다운 메뉴가 닫힌 경우, 드롭다운 메뉴가 자동으로 열릴 수 없는 상태로 변경 */
        setCanExpandedDropDown(false);
        closeSubMenu();
        break;

      /* 27. Enter 또는 Space 키 동작 */
      case "Enter":
      case "Space":
        event.preventDefault();

        /* 드롭다운 메뉴가 있는 경우 드롭다운 메뉴를 펼치고 첫번째 하위 메뉴 항목으로 초점 이동 */
        if (hasSubMenu) {
          moveFocusToSubMenuItemAfterOpenSubMenu(0);
          setCanExpandedDropDown(true);
        } else {
          /* 드롭다운 메뉴가 없는 경우 해당 메뉴 항목 선택 및 하위 메뉴 항목 선택 초기화 */
          setSelectedMenuItem(activeMenuItem);
          setSelectedSubMenuItem(INITIAL_SELECTED_SUB_MENU_ITEM);
        }
        break;
    }
  };

  /* 28. ~ 36. 하위 메뉴 항목 키보드 컨트롤 */
  const handleKeyDownSubMenuItem = (event) => {
    switch (event.code) {
      /* 28. ArrowUp 키를 통해 이전 하위 메뉴 항목으로 초점 이동 */
      case "ArrowUp":
        event.preventDefault();

        const prevSubMenuIndex =
          activeSubMenuItem[activeMenuItem] > 0
            ? activeSubMenuItem[activeMenuItem] - 1
            : MENU_LIST[activeMenuItem].subMenu.length - 1;
        moveFocusToSubMenuItem(prevSubMenuIndex);
        break;

      /* 29. ArrowDown 키를 통해 다음 하위 메뉴 항목으로 초점 이동 */
      case "ArrowDown":
        event.preventDefault();

        const nextSubMenuIndex =
          activeSubMenuItem[activeMenuItem] <
          MENU_LIST[activeMenuItem].subMenu.length - 1
            ? activeSubMenuItem[activeMenuItem] + 1
            : 0;
        moveFocusToSubMenuItem(nextSubMenuIndex);
        break;

      /* 30. Home 키를 통해 첫번째 하위 메뉴 항목으로 초점 이동 */
      case "Home":
        event.preventDefault();

        moveFocusToSubMenuItem(0);
        break;

      /* 31. End 키를 통해 첫번째 하위 메뉴 항목으로 초점 이동 */
      case "End":
        event.preventDefault();

        moveFocusToSubMenuItem(MENU_LIST[activeMenuItem].subMenu.length - 1);
        break;

      /* 32. ArrowLeft 키를 통해 이전 상위 메뉴 항목으로 초점 이동 */
      case "ArrowLeft":
        event.preventDefault();

        const prevMenuIndex =
          activeMenuItem > 0 ? activeMenuItem - 1 : MENU_LIST.length - 1;
        moveFocusToMenuItem(prevMenuIndex);
        break;

      /* 33. ArrowRight 키를 통해 다음 상위 메뉴 항목으로 초점 이동 */
      case "ArrowRight":
        event.preventDefault();

        const nextMenuIndex =
          activeMenuItem < MENU_LIST.length - 1 ? activeMenuItem + 1 : 0;
        moveFocusToMenuItem(nextMenuIndex);
        break;

      /* 34. Esc 키를 통해 드롭다운 메뉴를 닫고, 상위 메뉴 항목으로 초점 이동 */
      case "Escape":
        event.preventDefault();

        setCanExpandedDropDown(false);
        closeSubMenu();

        const targetMenuItem = menuItemRefs.current[activeMenuItem];
        targetMenuItem.focus();
        break;

      /* 35. Tab 키를 통해 드롭다운 메뉴를 닫고, 원래의 Tab키 동작 수행 */
      case "Tab":
        setCanExpandedDropDown(false);
        closeSubMenu();
        break;

      /* 36. Enter 또는 Space 키를 통해 해당 하위 메뉴 항목 선택 */
      case "Enter":
      case "Space":
        event.preventDefault();

        handleClickSubMenuItem(activeSubMenuItem[activeMenuItem]);
        break;
    }
  };

  return (
    /* 1. <nav> 태그 사용 */
    /* 2. aria-label 추가 (스크린 리더 🔈: 메인, 탐색) */
    <nav aria-label="메인">
      <div
        ref={menubarRef}
        // 3. 메뉴바 역할 명시
        role="menubar"
        // 4. aria-label 추가 (스크린 리더 🔈: 메뉴표시줄 메인 4개의 항목)
        aria-label="메인"
        className={cx("menubar")}
      >
        {MENU_LIST.map(({ menuItem, subMenu }, menuIndex) => {
          const hasSubMenu = !!subMenu;

          return (
            <div key={menuIndex} className={cx("menu-wrap")}>
              <a
                ref={(element) => (menuItemRefs.current[menuIndex] = element)}
                href="#"
                /* 5. menuitem 역할 명시 */
                role="menuitem"
                /* 6. 하위 메뉴 항목을 가지는 경우 aria-haspopup="menu" 속성 추가 */
                aria-haspopup={hasSubMenu ? "menu" : undefined}
                /* 7. 하위 메뉴 항목 펼쳐짐 여부 */
                aria-expanded={
                  hasSubMenu ? expandedSubMenu[menuIndex] : undefined
                }
                /* 8. 하위 메뉴 항목을 가지지 않는 상위 메뉴 항목이 선택되면 aria-current="page" 속성 추가 */
                aria-current={
                  !hasSubMenu && menuIndex === selectedMenuItem
                    ? "page"
                    : undefined
                }
                /* 9. 상위 메뉴 항목 클릭 시 동작 */
                onClick={(event) => {
                  event.preventDefault(); // 링크 동작 제거(스토리북 테스트용)
                  handleClickMenuItem(menuIndex, hasSubMenu);
                }}
                /* 15. 활성화된 메뉴 항목에만 tabindex="0" 추가 */
                tabIndex={menuIndex === activeMenuItem ? 0 : -1}
                /* 17. 상위 메뉴 항목 pointerover 이벤트 발생 시 동작 */
                onPointerOver={() => {
                  openSubMenu(menuIndex);
                  moveFocusToMenuItem(menuIndex);
                }}
                /* 초점을 받은 상위 메뉴 항목 활성화 */
                onFocus={() => setActiveMenuItem(menuIndex)}
                // 19. ~ 27. 상위 메뉴 항목 키보드 컨트롤
                onKeyDown={(event) => handleKeyDownMenuItem(event, hasSubMenu)}
                className={cx(
                  "menuitem",
                  hasSubMenu &&
                    menuIndex === selectedMenuItem &&
                    "has-selected-sub-menuitem",
                )}
              >
                {menuItem}
              </a>
              {hasSubMenu && (
                <div
                  /* 10. 하위 메뉴 항목 그룹에 menu 역할 명시 */
                  role="menu"
                  /* 11. 상위 메뉴 항목의 레이블 추가 */
                  aria-label={menuItem}
                  className={cx("menu")}
                >
                  {subMenu.map((subMenuItem, subMenuIndex) => (
                    <a
                      ref={(element) => {
                        subMenuItemRefs.current[menuIndex] =
                          subMenuItemRefs.current[menuIndex] || [];
                        subMenuItemRefs.current[menuIndex][subMenuIndex] =
                          element;
                      }}
                      key={subMenuIndex}
                      href="#"
                      /* 12. 하위 메뉴 항목에 menuitem 역할 명시 */
                      role="menuitem"
                      /* 13. 선택된 하위 메뉴 항목에 aria-current="page" 속성 추가 */
                      aria-current={
                        subMenuIndex === selectedSubMenuItem[menuIndex]
                          ? "page"
                          : undefined
                      }
                      /* 14. 하위 메뉴 항목 클릭 시 동작 */
                      onClick={(event) => {
                        event.preventDefault(); // 링크 동작 제거(스토리북 테스트용)
                        handleClickSubMenuItem(subMenuIndex);
                      }}
                      /* 15. 활성화된 메뉴 항목에만 tabindex="0" 추가 */
                      tabIndex={
                        subMenuIndex === activeSubMenuItem[menuIndex] ? 0 : -1
                      }
                      /* 17. 상위 메뉴 항목 pointerover 이벤트 발생 시 동작 */
                      onPointerOver={() => moveFocusToSubMenuItem(subMenuIndex)}
                      /* 초점을 받은 하위 메뉴 항목 활성화 */
                      onFocus={() => {
                        const newActiveSubMenuItem = [
                          ...INITIAL_SELECTED_SUB_MENU_ITEM,
                        ];
                        newActiveSubMenuItem[activeMenuItem] = subMenuIndex;

                        setActiveSubMenuItem(newActiveSubMenuItem);
                      }}
                      // 28. ~ 36. 하위 메뉴 항목 키보드 컨트롤
                      onKeyDown={handleKeyDownSubMenuItem}
                      className={cx("sub-menuitem")}
                    >
                      {subMenuItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export default MultipleMenuBar;
