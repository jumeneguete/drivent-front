import { Form, Label, Message, Row } from "../Auth";
import Button from "../Form/Button";

export default function Confirmation({ submit, email, setConfirmation }) {
  return (
    <Row>
      <Label>Recuperação de senha</Label>
      <Form onSubmit={submit}>
        <Message>
          Um E-mail será enviado para <br/> 
          <bold className="gradient-text" onClick={() => setConfirmation(false)}>
            {email || "Digite um email"}
          </bold> <br />
        </Message>
          
        <Button type="submit" color="primary" fullWidth >Confirmar</Button>
      </Form>
    </Row>
  );
}
