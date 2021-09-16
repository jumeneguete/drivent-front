import styled from "styled-components";
import SignUpButton from "./SignUpButton";
import SoldOff from "./SoldOff";
import useApi from "../../hooks/useApi";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "react-loader-spinner";
import Enrolled from "./Enrolled";
import { toast } from "react-toastify";

export default function Activity({ activity }) {
  const { activities, enrollment, booking } = useApi();
  const [vacancyCount, setVacancyCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    getActivities();
    const intervalId = setInterval(() => getActivities(), 3000);
    return () => clearInterval(intervalId);
  }, []);

  async function getActivities() {
    const { data } = await activities.getAllActivities();
    const singleActivity = data.find((a) => a.id === activity.id);
    const vaccancy = singleActivity.maxParticipants - singleActivity.activityBookings.length;
    const bookingId = await getBookingId();
    findBookingOnActivity(singleActivity.activityBookings, bookingId);
    setVacancyCount(vaccancy);
  }

  function findBookingOnActivity(array, bookingId) {
    if(array.find(ab => ab.bookingId === bookingId)) {
      setIsEnrolled(true);
    }
  }

  function transformToDecimal(timeText) {
    const splitTime = timeText.split(":");
    splitTime[0] = parseInt(splitTime[0]);
    splitTime[1] = parseInt((parseInt(splitTime[1]) * 100) / 60) / 100;
    return splitTime[0] + splitTime[1];
  }

  async function getBookingId() {
    const { data } = await enrollment.getPersonalInformations();
    const bookingInfo = await booking.getBookTicketByEnrollmentId(data.id);
    return bookingInfo.data.id;
  }

  async function postEnrollment() {
    setIsLoading(true);
    const body = {
      activityId: activity.id,
      bookingId: await getBookingId()
    };
    activities.postActivityEnrollment(body).then(async() => {
      await getActivities();
      setIsLoading(false);
    }).catch(err => {
      //eslint-disable-next-line no-console
      console.error(err);
      toast(err.response.data.message);
      setIsLoading(false);
    });
  }

  const startTime = transformToDecimal(activity.startsAt);
  const endTime = transformToDecimal(activity.endsAt);
  let blockHeight = 80 * (endTime - startTime);
  const additionalHeight = (Math.ceil(endTime - startTime) - 1) * 10;
  blockHeight += additionalHeight;

  return (
    <ActivityWrapper {...{ blockHeight, isEnrolled }}>
      <LeftSide {...{ isEnrolled }}>
        <ActivityName>{activity.name}</ActivityName>
        <ActivityTime>
          {activity.startsAt} - {activity.endsAt}
        </ActivityTime>
      </LeftSide>
      <RightSide>
        {isLoading ? <Loader color="#FA4098" height={20} width={45} style={{ paddingLeft: "12px" }} type="ThreeDots"/> : 
          isEnrolled ? 
            <Enrolled /> :
            vacancyCount > 0 ? (
              <SignUpButton {...{ vacancyCount, postEnrollment }} />
            ) : (
              <SoldOff />
            )}
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
  border-right: 1px solid ${props => props.isEnrolled ? "#99E8A1" : "#CFCFCF"};
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
  background-color: ${(props => props.isEnrolled ? "#D0FFDB" :"#f1f1f1")};
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
