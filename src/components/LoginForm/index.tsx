import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router";
import { ButtonContainer, Container } from "./styles";
import { useAuth } from "../../Provider/Auth";

interface UserData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { signIn } = useAuth();

  const history = useHistory();

  const formSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("E-mail obrigatório"),
    password: yup
      .string()
      .min(8, "Mínimo 8 caracteres")
      .matches(
        /^((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-zA-Z]){1}).*$/,
        "Senha deve conter letras, números e ao menos um caracter especial"
      )
      .required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({ resolver: yupResolver(formSchema) });

  const handleForm = (data: UserData) => {
    signIn(data);
    history.push("/dashboard");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handleForm)}>
        <TextField
          label="E-mail"
          margin="normal"
          variant="standard"
          size="small"
          color="secondary"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Senha"
          margin="normal"
          variant="standard"
          size="small"
          color="secondary"
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <ButtonContainer>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </ButtonContainer>
      </form>
    </Container>
  );
};
export default LoginForm;
