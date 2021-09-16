export default function Reject({ error }) {
  function NoCertificateBeforeEndDate() {
    return (
      <p>
        Não é possível gerar certificado
        <br />
        Antes do fim do evento
      </p>
    );
  }

  const errorCode = error?.response?.data?.driventCode;
  const isBeforeEndDate = errorCode === "5";

  return (
    <>
      {isBeforeEndDate ? (
        <NoCertificateBeforeEndDate />
      ) : (
        "Entre em contato com a organização do evento"
      )}
    </>
  );
}
