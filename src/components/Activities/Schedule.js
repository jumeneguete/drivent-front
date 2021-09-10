import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Activity from "./Activity";

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
