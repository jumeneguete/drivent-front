import { useEffect, useState } from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import PaymentContainer from "../../../components/Payment/index";
import NoEnrollment from "../../../components/Payment/NoEnrollment";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import useApi from "../../../hooks/useApi";
import ConfirmPayment from "../../../components/Payment/ConfirmPayment";

export default function Payment() {
  const [enrollment, setEnrollment] = useState(undefined);
  const promise = useApi().enrollment.getPersonalInformations();
  const match = useRouteMatch();
  
  useEffect(() => {
    promise.then(({ data }) => setEnrollment(data));
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <Switch>
        <Route path={`${match.path}`} exact>
          {enrollment ?
            <PaymentContainer enrollmentId={enrollment.id} />
            :
            <NoEnrollment />
          }
        </Route>
        <Route path={`${match.path}/confirm`} exact>
          <ConfirmPayment />
        </Route>
      </Switch>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
