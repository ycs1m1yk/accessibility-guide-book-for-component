import ButtonToggleSwitch from "./ButtonToggleSwitch";

function ButtonToggleGroup() {
  return (
    <>
      {/* 3. 토글 버튼 컴포넌트를 감싸는 컨테이너 요소의 id 참조 */}
      <div role="group" aria-labelledby="toggle-buttons-id">
        <h3 id="toggle-buttons-id">설정</h3>

        <ButtonToggleSwitch label="프로필 전체 공개" />
        <ButtonToggleSwitch label="얼굴 인식 사용" />
      </div>
    </>
  );
}

export default ButtonToggleGroup;
