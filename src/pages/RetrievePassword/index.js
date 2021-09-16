import { useState, useContext } from "react";

import AuthLayout from "../../layouts/Auth";

import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import Link from "../../components/Link";
import { Row, Title, Label, Form } from "../../components/Auth";
import { toast } from "react-toastify";

import EventInfoContext from "../../contexts/EventInfoContext";

import useApi from "../../hooks/useApi";
import Finalization from "../../components/NewPassword/Finalization";
import Confirmation from "../../components/NewPassword/Confirmation";

export default function RetrievePassword() {
  const [email, setEmail] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [sent, setSent] = useState(false);

  const { user } = useApi();
  const { eventInfo } = useContext(EventInfoContext);

  function submit(event) {
    event.preventDefault();

    if(!confirmation) {
      setConfirmation(true);
      return;
    }

    user.requestNewPassword(email)
      .then(() => {
        setSent(true);
      })
      .catch(err => {
        //eslint-disable-next-line no-console
        console.error(err);
        if(err.response.status === 400)
          toast("O endereço de email não é válido");
        setConfirmation(false);
      });
  }

  return (
    <AuthLayout background={eventInfo.backgroundImage}>
      <Row>
        <img src={eventInfo.logoImage} alt="Event Logo" />
        <Title>{eventInfo.eventTitle}</Title>
      </Row>
      {
        sent ? 
          <Finalization {...{ label: "Recuperar senha", text: "E-mail enviado!" }} /> 
          : confirmation ? 
            <Confirmation {...{ submit, email, setConfirmation }}/>
            :
            <Row>
              <Label>Recuperação de senha</Label>
              <Form onSubmit={submit}>
                <Input 
                  label="E-mail" 
                  helperText="Digite o E-mail cadastrado no evento" 
                  type="text" 
                  fullWidth={true} 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
          
                <Button type="submit" color="primary" fullWidth disabled={!email}>Solicitar Nova Senha</Button>
              </Form>
            </Row>
      }
      <Row>
        <Link hidden={!!sent} to="/sign-in">Voltar</Link>
      </Row>
    </AuthLayout>
  );
}
