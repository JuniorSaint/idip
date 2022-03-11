import { api } from "../../services/api";
import * as yup from "yup";

export const createUser = async (value, event) => {
  event.preventDefault();
  try {
    await api
      .post("/users", value)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error.response.request._response));
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (value, event) => {
  event.preventDefault();
  try {
    await api
      .put("/users", value)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error.response.request._response));
  } catch (error) {
    console.error(error);
  }
};

export const userSchema = yup
  .object({
    fullName: yup.string().required("Nome completo é obrigatório"),
    userName: yup.string().required("Nome do usuário é obrigatório"),
    userEmail: yup
      .string()
      .required("Email é obrigatório")
      .email("Formato do email errado"),
    password: yup.string().required("Senha é obrigatório"),
    passwordConfirm: yup
      .string()
      .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
    userImage: yup.string(),
    isActive: yup.bool().required("Situação do usuário deverá ser informada"),
    userType: yup.string().required("Tipo de usuário obrigatorio"),
    birthdayDate: yup.date(),
  })
  .required();
