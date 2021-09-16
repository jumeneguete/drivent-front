import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useApi from "../../../hooks/useApi";
import CertificateHolder from "../../../components/Dashboard/Certificate";

class CertificateStateEntity {
  constructor(error, certificate) {
    this.error = error;
    this.value = certificate;
  }
}

export default function Certificate() {
  const api = useApi();
  const [certificateState, setCertificateState] = useState(
    new CertificateStateEntity(true, null)
  );

  useEffect(() => {
    api.certificate
      .get()
      .then(({ data }) => {
        setCertificateState(new CertificateStateEntity(false, data));
      })
      .catch((err) => {
        setCertificateState(new CertificateStateEntity(err, null));
        toast(err?.response?.data?.details || "Entre em contato com o suporte");
      });
  }, []);

  return <CertificateHolder {...{ certificateState }} />;
}
