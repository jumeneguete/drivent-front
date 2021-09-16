import { useContext } from "react";
import EventInfoContext from "../../contexts/EventInfoContext";

import AuthLayout from "../../layouts/Auth";
import { Row, Title, Label, Form } from "../../components/Auth";

import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import { useHistory, useParams } from "react-router";
import { useState } from "react";
import styled from "styled-components";
import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";
import Finalization from "../../components/NewPassword/Finalization";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [finalization, setFinalization] = useState(false);
  
  const params = useParams();

  const { user } = useApi();

  const { eventInfo } = useContext(EventInfoContext);

  function submit(event) {
    event.preventDefault();

    const body = {
      password,
      confirmPassword,
      token: params.token
    };

    user.createNewPassword(body)
      .then(() => {
        setFinalization(true);
      })
      .catch(err => {
        //eslint-disable-next-line no-console
        console.error(err);

        if(err.response.status === 400) {
          toast(err.response.data.message);
          setPassword("");
          setConfirmPassword("");
        }
      });
  }

  return (
    <AuthLayout background={eventInfo.backgroundImage}>
      <Row>
        <img onClick={() => useHistory().push("/sign-in")} src={eventInfo.logoImage} alt="Event Logo" />
        <Title>{eventInfo.eventTitle}</Title>
      </Row>
      {
        finalization ? <Finalization {...{ label: "Nova senha", text: "Senha alterada :)" }}/> :
          <StyledRow>
            <Label>Nova senha</Label>
            <Form onSubmit={submit}>
              <Input label="Nova senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
              <Input label="Confirmar senha" type="password" fullWidth value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              <Button type="submit" color="primary" fullWidth>Criar nova senha</Button>
            </Form>
          </StyledRow>
      }
    </AuthLayout>
  );
}

const StyledRow = styled(Row)`
  margin: auto 0;
`;
