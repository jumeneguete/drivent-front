import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { BiLogIn } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
export default function Schedule({ activitiesOfTheDay }) {
  return (
    <ScheduleBox>
      {activitiesOfTheDay.map((location, i) => (
        <CardWrapper key={location.id}>
          <StyledTypography variant="h6" type={"hotelChoice"}>
            {location.name}
          </StyledTypography>
          <Card isFirst={i === 0}>
            {location.activities.map((activity) => (
              <Activity key={activity.id} {...{ activity }} />
            ))}
          </Card>
        </CardWrapper>
      ))}
    </ScheduleBox>
  );
}

function SignUpButton({ vacancyCount }) {
  return (
    <SignUpWrapper>
      <BiLogIn />
      <p>{vacancyCount} vagas</p>
    </SignUpWrapper>
  );
}

const SignUpWrapper = styled.button`
  color: #078632;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 26px;
  cursor: pointer;

  p {
    font-size: 9px;
    text-align: center;
    padding-left: 5px;
  }
`;

function SoldOff() {
  return (
    <SoldOffWrapper>
      <AiOutlineCloseCircle />
      <p>esgotado</p>
    </SoldOffWrapper>
  );
}

const SoldOffWrapper = styled.button`
  color: #cc6666;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 26px;

  p {
    font-size: 9px;
    text-align: center;
    padding-left: 5px;
  }
`;

function Activity({ activity }) {
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
      <About>
        <ActivityName>{activity.name}</ActivityName>
        <ActivityTime>
          {activity.startsAt} - {activity.endsAt}
        </ActivityTime>
      </About>
      <RightSide>
        {vacancyCount > 0 ? <SignUpButton {...{ vacancyCount }} /> : <SoldOff/>}
      </RightSide>
    </ActivityWrapper>
  );
}

const About = styled.div`
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

const ActivityName = styled.p`
  font-weight: bold;
  margin-bottom: 6px;
`;

const ActivityTime = styled.p`
  font-weight: normal;
`;

const ScheduleBox = styled.section`
  display: flex;
  width: 100%;
`;

const CardWrapper = styled.div`
  flex: 288px 0 1;
`;

const Card = styled.article`
  border: 1px solid #d7d7d7;
  border-left: ${(props) => (!props.isFirst ? "none" : "1px solid #d7d7d7")};
  width: 100%;
  height: 392px;
  padding: 9px;
  flex-direction: column;
  gap: 10px;
  display: flex;
`;

const StyledTypography = styled(Typography)`
  margin: 52px 0 13px 0 !important;
  text-align: center;
  color: ${(props) => (props.variant === "h6" ? "#8E8E8E" : null)}!important;
`;
