import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Title } from "../../components/Text/Title";
import { IconButton } from "../../components/IconButton";
import { Pencil, PlusCircle } from "@phosphor-icons/react";
import { ModalCreateCustomer } from "./utils/ModalCreateCustomer";
import { InfoTable, InfoTableContent } from "../../components/Table";
import { CustomerService } from "../../services/customer";
import { AxiosClient } from "../../ServiceClients/AxiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DateFormater } from "../../utils/functions";
import { ICustomer } from "../../utils/types";
import { PopoverDelete } from "../../components/Popover";
import { useState } from "react";

export const Customer = () => {
  const customerService = new CustomerService(AxiosClient);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();

  const {
    data: customerList,
    isLoading,
    refetch,
  } = useQuery<ICustomer[]>({
    queryKey: ["customer"],
    queryFn: () => customerService.getCustomerList(),
  });

  const { mutate } = useMutation({
    mutationFn: (id: string) => customerService.delete(id),
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <>
      {isOpen && (
        <ModalCreateCustomer
          isOpen={isOpen}
          onClose={onClose}
          onSave={refetch}
        />
      )}
      <Flex justify="space-between">
        <Title label="Clientes" />
        <IconButton
          icon={<PlusCircle size={26} />}
          label="Cadastrar"
          onClick={onOpen}
        />
      </Flex>
      <Box mt="10px">
        {!isLoading && customerList && (
          <InfoTable
            headProps={[
              { label: "Nome" },
              { label: "Email" },
              { label: "Data de criação" },
            ]}
          >
            {customerList.map((customer) => (
              <InfoTableContent
                key={customer.customerId}
                colsBody={[
                  { ceil: customer.name },
                  { ceil: customer.email },
                  { ceil: DateFormater(customer.createdAt) },
                  {
                    ceil: (
                      <Flex>
                        <PopoverDelete
                          section="Cliente"
                          onClick={() => mutate(customer.customerId)}
                        />
                        <Button
                          variant="none"
                          onClick={() => {
                            setSelectedCustomer(customer);
                          }}
                        >
                          <Pencil size={22} />
                        </Button>
                      </Flex>
                    ),
                  },
                ]}
              />
            ))}
          </InfoTable>
        )}
      </Box>
    </>
  );
};
