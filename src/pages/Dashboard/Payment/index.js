import { useEffect, useState } from "react";
import PaymentContainer from "../../../components/Payment/index";
import NoEnrollment from "../../../components/Payment/NoEnrollment";

import useApi from "../../../hooks/useApi";

export default function Payment() {
  const [enrollment, setEnrollment] = useState(undefined);
  const promise = useApi().enrollment.getPersonalInformations();

  useEffect(() => {
    promise.then(({ data }) => setEnrollment(data));
  }, []);

  if(enrollment) {
    return <PaymentContainer/>;
  } else {
    return <NoEnrollment />;
  }
}
