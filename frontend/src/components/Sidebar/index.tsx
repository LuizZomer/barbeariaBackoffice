import { Divider, Image, Text } from "@chakra-ui/react";
import compactLogo from "/compactLogo.png";
import * as S from "./styles";
import { House, User, Users } from "@phosphor-icons/react";
import { Outlet, useNavigate } from "react-router-dom";

interface ISidebarOption {
  icon: React.ReactNode;
  title: string;
  url: string;
  permission?: string;
}

export const Sidebar = () => {
  const navigate = useNavigate();

  const sidebarOptions: ISidebarOption[] = [
    { icon: <House size={28} color="white" />, title: "Home", url: "/home" },
    { icon: <User size={28} color="white" />, title: "Usuários", url: "/user" },
    {
      icon: <Users size={28} color="white" />,
      title: "Clientes",
      url: "/customer",
    },
  ];

  return (
    <S.Container>
      <S.SidebarContainer>
        <S.LogoContainer>
          <Image src={compactLogo} />
        </S.LogoContainer>
        <Divider />
        <S.OptionsContainer>
          {sidebarOptions.map(({ icon, title, url }) => (
            <S.OneOptionContainer
              key={title}
              onClick={() => navigate(url)}
              $isActive={window.location.pathname === url}
            >
              {icon}
              <Text color="white" fontSize={10}>
                {title}
              </Text>
            </S.OneOptionContainer>
          ))}
        </S.OptionsContainer>
      </S.SidebarContainer>
      <S.Content>
        <Outlet />
      </S.Content>
    </S.Container>
  );
};
