import {
  Button,
  Heading,
  Image
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "../../components/Form/Input";
import * as S from "./styles";
import logo from "/logoBarberShop.png";
import { useState } from "react";
import { api } from "../../services/api";
import { useAuthProvider } from "../../contexts/Auth/useAuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const {signIn} = useAuthProvider()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const schema = z.object({
    email: z.string().min(1, "Campo obrigatório.").email("Necessario ser um email"),
    password: z.string().min(6, "Campo obrigatório."),
  });

  type TFormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async(data: TFormData) => {
    setLoading(true)
    await api.post('/auth/login', data).then((res) => {      
      signIn(res.data.accessToken)

      navigate('/user')
    }).finally(() => setLoading(false))
  };

  return (
    <S.Container>
      <S.LogoContainer>
        <Image src={logo} alt="logo" />
      </S.LogoContainer>
      <S.ContentContainer>
      <S.LoginContainer>
        <Heading as="h1" size="xl">
          Login
        </Heading>
        <S.FormContainer onSubmit={handleSubmit(handleLogin)}>
          <FormInput {...register('email')} error={errors.email?.message} placeholder="Ex: luiz@luiz.com" />

          <FormInput {...register('password')} type="password" error={errors.password?.message} placeholder="minimo 6 caracteres" />

          <Button type="submit" width="100%" isLoading={loading}>
            Entrar
          </Button>
        </S.FormContainer>
      </S.LoginContainer>
      </S.ContentContainer>
    </S.Container>
  );
};
