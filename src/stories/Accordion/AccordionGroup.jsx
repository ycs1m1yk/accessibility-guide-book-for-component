import { useRef } from "react";
import { Accordion } from "./Accordion";

// 아코디언 콘텐츠
const ACCORDION_CONTENTS = [
  {
    title: "회원가입은 어떻게 해야하나요?",
    content: "회원유형은 통합회원, 간편회원, 법인회원 3가지가 있습니다...",
  },
  {
    title: "회원탈퇴는 어떻게 하나요?",
    content:
      "사이트에서 회원탈퇴 유의사항 확인 후 회원탈퇴를 직접하실 수 있습니다...",
  },
  {
    title: "휴면회원 복원은 어떻게 하나요?",
    content:
      "최근 1년 이상 서비스를 이용하지 않은 경우 소중한 개인정보 보호를 위해 휴면회원으로 자동 전환됩니다...",
  },
];

function AccordionGroup() {
  const accordionHeaderRefs = useRef([]); // 아코디언 헤더 ref 배열 정의

  const handleFocusChange = (direction) => {
    let focusIndex;

    // 현재 초점이 있는 아코디언 헤더의 인덱스
    const currentIndex = accordionHeaderRefs.current.findIndex(
      (ref) => ref === document.activeElement,
    );

    switch (direction) {
      case "next":
        focusIndex =
          currentIndex < ACCORDION_CONTENTS.length - 1 ? currentIndex + 1 : 0; // 8. 초점을 다음 아코디언 헤더로 이동
        break;

      case "prev":
        focusIndex =
          currentIndex > 0 ? currentIndex - 1 : ACCORDION_CONTENTS.length - 1; // 9. 초점을 이전 아코디언 헤더로 이동
        break;

      case "first":
        focusIndex = 0; // 10. 초점을 첫 번째 아코디언 헤더로 이동
        break;

      case "last":
        focusIndex = ACCORDION_CONTENTS.length - 1; // 11. 초점을 마지막 아코디언 헤더로 이동
        break;

      default:
        return;
    }

    accordionHeaderRefs.current[focusIndex].focus(); // 아코디언 헤더 초점 이동
  };

  return ACCORDION_CONTENTS.map(({ title, content }, index) => (
    <Accordion
      key={index}
      id={index}
      title={title}
      content={content}
      ref={(el) => (accordionHeaderRefs.current[index] = el)}
      onFocusChange={handleFocusChange} // 키보드 이벤트
    />
  ));
}

export default AccordionGroup;
