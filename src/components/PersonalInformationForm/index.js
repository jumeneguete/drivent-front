import { useState, useEffect } from "react";
import styled from "styled-components";
import DateFnsUtils from "@date-io/date-fns";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";

import useApi from "../../hooks/useApi";
import { useForm } from "../../hooks/useForm";

import Input from "../Form/Input";
import Button from "../Form/Button";
import Select from "../../components/Form/Select";
import { FormWrapper } from "./FormWrapper";
import { CustomDatePicker } from "./CustomDatePicker";
import { InputWrapper } from "./InputWrapper";
import { ErrorMsg } from "./ErrorMsg";
import { ufList } from "./ufList";
import FormValidations from "./FormValidations";

dayjs.extend(CustomParseFormat);

export default function PersonalInformationForm() {
  const [dynamicInputIsLoading, setDynamicInputIsLoading] = useState(false);
  const [fileValue, setFileValues] = useState(null);
  const { enrollment, cep } = useApi();

  const {
    handleSubmit,
    handleChange,
    data,
    errors,
    setData,
    customHandleChange,
  } = useForm({
    validations: FormValidations,

    onSubmit: (data) => {
      const newData = {
        name: data.name,
        cpf: data.cpf,
        birthday: data.birthday,
        image: data.imageFile,
        address: {
          cep: data.cep,
          street: data.street,
          city: data.city,
          number: data.number,
          state: data.state,
          neighborhood: data.neighborhood,
          addressDetail: data.addressDetail,
        },
        phone: data.phone
          .replace(/[^0-9]+/g, "")
          .replace(/^(\d{2})(9?\d{4})(\d{4})$/, "($1) $2-$3"),
      };

      enrollment
        .save(newData)
        .then(() => {
          toast("Salvo com sucesso!");
        })
        .catch((error) => {
          if (error.response?.data?.details) {
            for (const detail of error.response.data.details) {
              toast(detail);
            }
          } else {
            toast("Não foi possível");
          }
          /* eslint-disable-next-line no-console */
          console.log(error);
        });
    },

    initialValues: {
      cpf: "",
      name: "",
      birthday: null,
      phone: "",
      cep: "",
      street: "",
      city: "",
      number: "",
      state: "",
      neighborhood: "",
      addressDetail: "",
      image: "",
    },
  });

  useEffect(() => {
    enrollment.getPersonalInformations().then((response) => {
      if (response.status !== 200) {
        return;
      }

      const { name, cpf, birthday, phone, address, image } = response.data;
      console.log(response.data);

      setData({
        name,
        cpf,
        birthday,
        phone,
        image,
        cep: address.cep,
        street: address.street,
        city: address.city,
        state: address.state,
        number: address.number,
        neighborhood: address.neighborhood,
        addressDetail: address.addressDetail,
        imageFile: null,
      });
    });
  }, []);

  function updateFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.toString();
      const newData = { ...data };
      newData.imageFile = base64String;
      setData(newData);
    };
    reader.readAsDataURL(file);
  }

  function isValidCep(cep) {
    return cep.length === 8;
  }

  function handleCepChanges(event) {
    const { name, value } = event.target;

    const valueWithoutMask = value.replace("-", "");

    if (isValidCep(valueWithoutMask)) {
      const newDataValues = {
        ...data,
        [name]: value,
      };

      setDynamicInputIsLoading(true);
      cep.getAddress(valueWithoutMask).then(({ data }) => {
        setDynamicInputIsLoading(false);
        setData({
          ...newDataValues,
          street: data.logradouro,
          city: data.localidade,
          neighborhood: data.bairro,
          state: data.uf,
        });
      });
    }
  }

  return (
    <>
      <EnrollmentsData>
        <StyledTypography variant="h4">Suas Informações</StyledTypography>
        {data.image ? (
          <img src={data.image} alt="avatar" />
        ) : (
          <img src="https://w7.pngwing.com/pngs/527/663/png-transparent-logo-person-user-person-icon-rectangle-photography-computer-wallpaper-thumbnail.png" />
        )}
      </EnrollmentsData>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormWrapper onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              label="Nome Completo"
              name="name"
              type="text"
              value={data.name || ""}
              onChange={handleChange("name")}
            />
            {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              name="cpf"
              label="CPF"
              type="text"
              maxLength="14"
              mask="999.999.999-99"
              value={data.cpf || ""}
              onChange={handleChange("cpf")}
            />
            {errors.cpf && <ErrorMsg>{errors.cpf}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <CustomDatePicker
              name="birthday"
              error={false}
              helperText={null}
              format="dd-MM-yyyy"
              label="Data de Nascimento"
              inputVariant="outlined"
              clearable
              value={
                data.birthday && dayjs(data.birthday, "DD-MM-YYYY").toString()
              }
              onChange={(date) => {
                customHandleChange(
                  "birthday",
                  (d) => d && dayjs(d).format("DD-MM-YYYY")
                )(date);
              }}
            />
            {errors.birthday && <ErrorMsg>{errors.birthday}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Telefone"
              mask={
                data.phone.length < 15 ? "(99) 9999-99999" : "(99) 99999-9999"
              } // o 9 extra no primeiro é para permitir digitar um número a mais e então passar pra outra máscara - gambiarra? temos
              name="phone"
              value={data.phone || ""}
              onChange={handleChange("phone")}
            />
            {errors.phone && <ErrorMsg>{errors.phone}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="CEP"
              name="cep"
              mask="99999-999"
              value={data.cep || ""}
              onChange={(e) => {
                handleChange("cep")(e);
                handleCepChanges(e);
              }}
            />
            {errors.cep && <ErrorMsg>{errors.cep}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Select
              label="Estado"
              name="state"
              id="state"
              value={data.state || ""}
              onChange={handleChange("state")}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {ufList.map((uf) => (
                <MenuItem value={uf.name} key={uf.id}>
                  <em>{uf.name}</em>
                </MenuItem>
              ))}
            </Select>
            {errors.state && <ErrorMsg>{errors.state}</ErrorMsg>}
          </InputWrapper>

          <InputWrapper>
            <Input
              label="Cidade"
              name="city"
              value={data.city || ""}
              onChange={handleChange("city")}
              disabled={dynamicInputIsLoading}
            />
            {errors.city && <ErrorMsg>{errors.city}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Rua"
              name="street"
              value={data.street || ""}
              onChange={handleChange("street")}
              disabled={dynamicInputIsLoading}
            />
            {errors.street && <ErrorMsg>{errors.street}</ErrorMsg>}
          </InputWrapper>

          <InputWrapper>
            <Input
              label="Número"
              name="number"
              value={data.number || ""}
              onChange={handleChange("number")}
            />
            {errors.number && <ErrorMsg>{errors.number}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Bairro"
              name="neighborhood"
              value={data.neighborhood || ""}
              onChange={handleChange("neighborhood")}
              disabled={dynamicInputIsLoading}
            />
            {errors.neighborhood && <ErrorMsg>{errors.neighborhood}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Complemento"
              name="addressDetail"
              value={data.addressDetail || ""}
              onChange={handleChange("addressDetail")}
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="imageFile">
              <input
                style={{ display: "none" }}
                id="imageFile"
                name="imageFile"
                type="file"
                onChange={(e) => updateFile(e)}
              />

              <Fab
                color="secondary"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
                style={{
                  backgroundColor: "#DDDDDD",
                  color: "#000000",
                  marginTop: "15px",
                  padding: "15px",
                  borderRadius: "5px",
                  backgroundColor: "#FFEED2",
                }}
              >
                Imagem de Perfil
              </Fab>
            </label>
          </InputWrapper>

          <SubmitContainer>
            <Button type="submit" disabled={dynamicInputIsLoading}>
              Salvar
            </Button>
          </SubmitContainer>
        </FormWrapper>
      </MuiPickersUtilsProvider>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;

const EnrollmentsData = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    margin-right: 30px;
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }
`;
