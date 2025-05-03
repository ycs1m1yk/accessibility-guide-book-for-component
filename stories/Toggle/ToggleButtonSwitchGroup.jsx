import ToggleButtonSwitch from "./ToggleButtonSwitch";

function ToggleButtonSwitchGroup() {
  return (
    <>
      {/* 3. Toggle 버튼 컴포넌트를 감싸는 컨테이너 요소의 id 참조 */}
      <div role="group" aria-labelledby="toggle-buttons-id">
        <h3 id="toggle-buttons-id">설정</h3>

        <ToggleButtonSwitch label="프로필 전체 공개" />
        <ToggleButtonSwitch label="얼굴 인식 사용" />
      </div>
    </>
  );
}

export default ToggleButtonSwitchGroup;
