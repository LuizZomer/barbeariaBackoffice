import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "../../../../components/Form/Input";
import { FormSelect } from "../../../../components/Form/Select";
import { AxiosClient } from "../../../../ServiceClients/AxiosClient";
import { PermissionService } from "../../../../services/permission";
import { unmaskValue, valueMask } from "../../../../utils/functions";
import { UserService } from "../../../../services/user";
import { TUserPost } from "../../../../utils/types";

interface IModalProps {
  onClose: () => void;
  isOpen: boolean;
  onSave: () => void;
}

export const ModalCreateUser = ({ isOpen, onClose, onSave }: IModalProps) => {
  const permissionService = new PermissionService(AxiosClient);
  const userService = new UserService(AxiosClient);

  const handleClose = () => {
    reset();
    onClose();
  };

  const { data: permissionList } = useQuery({
    queryKey: ["permission"],
    queryFn: () => permissionService.getPermissionSelect(),
  });

  const mutation = useMutation({
    mutationFn: userService.post.bind(userService),
    onSuccess: () => {
      handleClose();
      onSave();
    },
  });

  const schema = z
    .object({
      name: z.string().min(3, "No minimo 3 caracteres"),
      password: z
        .string()
        .min(6, "No minimo 6 caracteres")
        .regex(/\d/, "A senha deve conter pelo menos um número")
        .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula"),
      confirmPassword: z.string(),
      email: z
        .string()
        .email("Precisa ser um email")
        .min(1, "Campo obrigatório"),
      workload: z.string().min(1, "Campo obrigatório"),
      wage: z.string().min(1, "Campo obrigatório"),
      role: z.string().min(1, "Campo obrigatório"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas devem ser iguais",
      path: ["confirmPassword"],
    });

  type TFormData = z.infer<typeof schema>;

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      role: "",
      wage: "",
      workload: "",
    },
  });

  const handleCreate = (data: TFormData) => {
    const user: TUserPost = {
      ...data,
      wage: unmaskValue(data.wage),
    };

    mutation.mutate(user);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastrar Usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleCreate)}>
            <Flex direction="column" gap="10px">
              <FormInput
                label="Nome"
                {...register("name")}
                error={errors.name?.message}
                placeholder="Ex: josé da silva"
              />

              <FormInput
                label="Email"
                {...register("email")}
                error={errors.email?.message}
                placeholder="Ex: josesilva@exemplo.com"
              />

              <Controller
                name="wage"
                control={control}
                render={({ field }) => (
                  <FormInput
                    label="Salario"
                    {...field}
                    error={errors.wage?.message}
                    placeholder="Ex: 1.200,00"
                    onChange={(evt) => {
                      const formatedValue = valueMask(evt.target.value);

                      field.onChange(formatedValue);
                    }}
                  />
                )}
              />

              <FormInput
                label="Carga Horária"
                {...register("workload")}
                error={errors.workload?.message}
                placeholder="Ex: 8h"
              />

              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    label="Permissões"
                    error={errors.role?.message}
                    {...field}
                  >
                    <option value="">Selecione</option>
                    {permissionList?.map(({ name, role }) => (
                      <option key={role} value={role}>
                        {name}
                      </option>
                    ))}
                  </FormSelect>
                )}
              />

              <FormInput
                label="Senha"
                {...register("password")}
                error={errors.password?.message}
                placeholder="No minimo 6 digitos"
                type="password"
              />

              <FormInput
                label="Confirme a senha"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
                placeholder="Confirme sua senha"
                type="password"
              />

              <Button type="submit" mb={5}>
                Cadastrar
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
