import { UserService } from "../../services/user";
import { AxiosClient } from "../../ServiceClients/AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { Title } from "../../components/Text/Title";
import { InfoTable, InfoTableContent } from "../../components/Table";
import { intlNumberFormatter } from "../../utils/functions";
import { Box, Flex } from "@chakra-ui/react";
import { PopoverDelete } from "../../components/Popover";
import { Pencil } from "@phosphor-icons/react";

export const UserList = () => {
  const userService = new UserService(AxiosClient);

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getUserList.bind(userService),
  });

  return (
    <>
      <Flex justify="space-between">
        <Title label="Usuários" />
      </Flex>
      {!isLoading && data && (
        <Box minWidth="100%" pt={10}>
          {data.length > 0 && (
            <InfoTable
              headProps={[
                { label: "Nome" },
                { label: "Email" },
                { label: "Salario" },
                { label: "Permissão" },
                { label: "Carga Horária" },
                { label: "Ações" },
              ]}
            >
              {data.map(({ id, name, email, role, wage, workload }) => (
                <InfoTableContent
                  key={id}
                  colsBody={[
                    { ceil: name },
                    { ceil: email },
                    { ceil: intlNumberFormatter(wage) },
                    { ceil: role },
                    { ceil: workload },
                    {
                      ceil: (
                        <Flex gap="15px">
                          <PopoverDelete section="Usuário" onClick={() => ""} />
                          <Pencil size={22} />
                        </Flex>
                      ),
                    },
                  ]}
                />
              ))}
            </InfoTable>
          )}
        </Box>
      )}
    </>
  );
};
