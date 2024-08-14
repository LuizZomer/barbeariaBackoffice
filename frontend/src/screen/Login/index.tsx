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
import { api } from "../../service/api";
import { useAuthProvider } from "../../context/Auth/useAuthContext";

export const Login = () => {
  const {signIn} = useAuthProvider()
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
    await api.post('/auth/login',{
      ...data
    }).then((res) => {
      console.log(res.data.accessToken);
      
      signIn(res.data.accessToken)

    }).finally(() => setLoading(false))
  };

  // console.log(errors);

  return (
    <S.LoginContainer>
      <S.LogoContainer>
        <Image src={logo} alt="logo" />
      </S.LogoContainer>
      <S.ContentContainer>
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
      </S.ContentContainer>
    </S.LoginContainer>
  );
};
