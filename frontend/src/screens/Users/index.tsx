import { UserService } from "../../services/user";
import { AxiosClient } from "../../ServiceClients/AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { Title } from "../../components/Text/Title";
import { InfoTable, InfoTableContent } from "../../components/Table";
import { intlNumberFormatter } from "../../utils/functions";
import {
  Box,
  Button,
  Flex,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { PopoverDelete } from "../../components/Popover";
import { Pencil, PlusCircle } from "@phosphor-icons/react";
import { PermissionService } from "../../services/permission";
import { useState } from "react";
import { IconButton } from "../../components/IconButton";
import { ModalCreateUser } from "./utils/ModalCreateUser";

export const UserList = () => {
  const userService = new UserService(AxiosClient);
  const permissionService = new PermissionService(AxiosClient);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [selectedPermission, setSelectedPermission] = useState("");

  const {
    data: userList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getUserList({ role: selectedPermission }),
  });

  const { data: permissionList } = useQuery({
    queryKey: ["permission"],
    queryFn: () => permissionService.getPermissionSelect(),
  });

  return (
    <>
      {<ModalCreateUser isOpen={isOpen} onClose={onClose} onSave={refetch} />}
      <Flex justify="space-between">
        <Title label="Usuários" />
        <IconButton
          icon={<PlusCircle size={26} />}
          label="Cadastrar"
          onClick={onOpen}
        />
      </Flex>
      <Box bgColor="#f9f9f988" borderRadius={5} p={5} mt={5}>
        <Text as="h4" fontSize="xl">
          Filtros
        </Text>
        <Flex mt={5} gap={5}>
          <Select
            width="300px"
            bgColor="white"
            onChange={(evt) => setSelectedPermission(evt.target.value)}
            placeholder="Selecione a permissão"
          >
            <option value="">Todas</option>
            {permissionList?.map(({ name, role }) => (
              <option key={role} value={role}>
                {name}
              </option>
            ))}
          </Select>
          <Button onClick={() => refetch()}>Filtrar</Button>
        </Flex>
      </Box>
      {!isLoading && userList && (
        <Box minWidth="100%" pt={10}>
          {userList.length > 0 && (
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
              {userList.map(({ id, name, email, role, wage, workload }) => (
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
                        <Flex>
                          <PopoverDelete section="Usuário" onClick={() => ""} />
                          <Button variant="none">
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
      )}
    </>
  );
};
