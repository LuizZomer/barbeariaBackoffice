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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "../../../../components/Form/Input";
import { useMutation } from "@tanstack/react-query";
import { CustomerService } from "../../../../services/customer";
import { AxiosClient } from "../../../../ServiceClients/AxiosClient";

interface IModalProps {
  onClose: () => void;
  isOpen: boolean;
  onSave: () => void;
}

export const ModalCreateCustomer = ({
  isOpen,
  onClose,
  onSave,
}: IModalProps) => {
  const customerService = new CustomerService(AxiosClient);

  const schema = z
    .object({
      name: z.string().min(1, "Campo obrigatório"),
      email: z
        .string()
        .min(1, "Campo obrigatório")
        .email("Precisa ser um email"),
      password: z.string().min(6, "No minimo 6 caracteres"),
      confirmPassword: z.string().min(1, "Campo obrigatório"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas devem ser iguais",
      path: ["confirmPassword"],
    });

  type TFormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      password: "",
      name: "",
    },
  });

  const handleClose = () => {
    onSave();
    reset();
    onClose();
  };

  const { mutateAsync } = useMutation({
    mutationFn: customerService.createCustomer.bind(customerService),
    onSuccess: () => {
      handleClose();
    },
  });

  const handleCreate = async (data: TFormData) => {
    await mutateAsync(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastrar cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleCreate)}>
            <Flex direction="column" gap="10px">
              <FormInput
                label="Nome"
                {...register("name")}
                error={errors.name?.message}
                placeholder="Ex: Carlos Silva"
              />

              <FormInput
                label="Email"
                {...register("email")}
                error={errors.email?.message}
                placeholder="Ex: carlossilva@gmail.com"
              />

              <FormInput
                label="Senha"
                {...register("password")}
                error={errors.password?.message}
                placeholder="Minimo 6 dígitos"
              />

              <FormInput
                label="Confirme sua senha"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
                placeholder="Precisa ser igual a senha"
              />
              <Button type="submit" mb={5} width="100%">
                Cadastrar
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
