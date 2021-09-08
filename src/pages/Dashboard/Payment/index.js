import { useEffect, useState } from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import PaymentContainer from "../../../components/Payment/index";
import NoEnrollment from "../../../components/Payment/NoEnrollment";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import useApi from "../../../hooks/useApi";
import ConfirmPayment from "../../../components/Payment/ConfirmPayment";
import Loader from "../../../components/Loading";

export default function Payment() {
  const { enrollment, payment } = useApi();
  const [confirmEnrollment, setConfirmEnrollment] = useState(undefined);
  const [confirmPayment, setConfirmPayment] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const promise = enrollment.getPersonalInformations();
  const match = useRouteMatch();
  
  useEffect(() => {
    promise.then(({ data }) => {
      setConfirmEnrollment(data);
      payment.getPaymentConfirmation(data.id)
        .then(({ data }) => {
          setConfirmPayment(data);
          setLoading(false);
        })
        .catch(err => {
          //eslint-disable-next-line no-console
          console.error(err);
          setLoading(false);
        });
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  if(loading) {
    return <Loader message={"Carregando"}/>;
  }

  if(confirmPayment?.isPaid) {
    return <ConfirmPayment isAlreadyPaid={true} confirmPayment={confirmPayment}/>; 
  }
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <Switch>
        <Route path={`${match.path}`} exact>
          {confirmEnrollment ?
            <PaymentContainer enrollmentId={confirmEnrollment.id} />
            :
            <NoEnrollment />
          }
        </Route>
        <Route path={`${match.path}/confirm`} exact>
          <ConfirmPayment isPaid={false}/>
        </Route>
      </Switch>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
