import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

export default function Schedule({ activitiesOfTheDay }) {
  return (
    <ScheduleBox>
      {activitiesOfTheDay.map((location) => (
        <CardWrapper>
          <StyledTypography variant="h6" type={"hotelChoice"}>
            {location.name}
          </StyledTypography>
          <Card>
            {location.activities.map(activity => activity.name)}
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
  -webkit-margin-collapse: collapse;
  border: 1px solid #d7d7d7;
  width: 100%;
  height: 392px;
`;

const StyledTypography = styled(Typography)`
  margin: 52px 0 13px 0 !important;
  text-align: center;
  color: ${(props) => (props.variant === "h6" ? "#8E8E8E" : null)}!important;
`;
