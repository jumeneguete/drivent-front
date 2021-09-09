import { Typography } from "@material-ui/core";
import styled from "styled-components";
import DaysList from "../../../components/Activities/DaysList";
import { useEffect, useState } from "react";
import OnlineActivities from "../../../components/Activities/OnlineActivities";
import NoPaymentActivities from "../../../components/Activities/NoPaymentActivities";
import useApi from "../../../hooks/useApi";

export default function Activities() {
  const { enrollment, booking } = useApi();
  const [confirmEnrollment, setConfirmEnrollment] = useState(undefined);
  const [confirmBooking, setConfirmBooking] = useState(undefined);

  useEffect(() => {
    enrollment.getPersonalInformations().then(({ data }) => {
      setConfirmEnrollment(data);
      booking.getBookTicketByEnrollmentId(data.id).then(({ data }) => {
        setConfirmBooking(data);
      });
    });
  }, []);

  if(confirmEnrollment && confirmBooking?.isPaid && confirmBooking.ticketOption.type === "Presencial") {
    return (
      <>
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
        <DaysList />
      </>
    );
  } else if(confirmBooking?.isPaid && confirmBooking.ticketOption.type === "Online") {
    return <OnlineActivities />;
  } else {
    return <NoPaymentActivities />;
  }
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
