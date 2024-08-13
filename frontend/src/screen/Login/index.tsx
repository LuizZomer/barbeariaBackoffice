import {
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import * as S from "./styles";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import logo from "/logoBarberShop.png";

export const Login = () => {
  const [show, setShow] = useState(false);

  const schema = z.object({
    email: z.string().min(1, "Campo obrigatório."),
    password: z.string().min(1, "Campo obrigatório."),
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

  const handleLogin = (data: TFormData) => {
    console.log(data);
  };

  console.log(errors);

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
          <FormControl isInvalid={!!errors.email}>
            <Text mb="10px">Email:</Text>
            <Input
              width="100%"
              placeholder="Ex: ola@ola.com"
              {...register("email")}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <Text mb="10px">Password</Text>
            <InputGroup>
              <Input
                width="auto"
                placeholder="Ex: ola@ola.com"
                type={show ? "text" : "password"}
                pr="4.8rem"
                {...register("password")}
              />
              <InputRightElement width="4.5rem" paddingRight="10px">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShow((prev) => !prev)}
                >
                  {show ? "Ocultar" : "Mostrar"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit" width="100%">
            Entrar
          </Button>
        </S.FormContainer>
      </S.ContentContainer>
    </S.LoginContainer>
  );
};
