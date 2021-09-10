import styled from "styled-components";
import SignUpButton from "./SignUpButton";
import SoldOff from "./SoldOff";

export default function Activity({ activity }) {
  function transformToDecimal(timeText) {
    const splitTime = timeText.split(":");
    splitTime[0] = parseInt(splitTime[0]);
    splitTime[1] = parseInt((parseInt(splitTime[1]) * 100) / 60) / 100;
    return splitTime[0] + splitTime[1];
  }

  const startTime = transformToDecimal(activity.startsAt);
  const endTime = transformToDecimal(activity.endsAt);
  let blockHeight = 80 * (endTime - startTime);
  const additionalHeight = (Math.ceil(endTime - startTime) - 1) * 10;
  blockHeight += additionalHeight;

  const vacancyCount = activity.maxParticipants - activity.participantCount;

  return (
    <ActivityWrapper {...{ blockHeight }}>
      <LeftSide>
        <ActivityName>{activity.name}</ActivityName>
        <ActivityTime>
          {activity.startsAt} - {activity.endsAt}
        </ActivityTime>
      </LeftSide>
      <RightSide>
        {vacancyCount > 0 ? <SignUpButton {...{ vacancyCount }} /> : <SoldOff/>}
      </RightSide>
    </ActivityWrapper>
  );
}

const ActivityName = styled.p`
  font-weight: bold;
  margin-bottom: 6px;
`;

const ActivityTime = styled.p`
  font-weight: normal;
`;

const LeftSide = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  border-right: 1px solid #cfcfcf;
  padding-right: 10px;
`;

const RightSide = styled.div`
  width: 66px;
  flex-shrink: 0;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 26px;
`;

const ActivityWrapper = styled.div`
  height: ${(props) => `${props.blockHeight}px`};
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 12px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 1px;
  color: #343434;
  font-family: "Roboto", sans-serif;
  display: flex;
  justify-content: space-between;
`;
