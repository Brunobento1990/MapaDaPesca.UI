"use client";

import { MenuGuiaDePescaApp } from "./menu-guia-de-pesca-app";
import { useContextGeoLocalizacao } from "@/contexts/geolocalizacao-context";
import { BoxApp } from "@/component/box/box-app";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { IconApp } from "@/component/icon/icon-app";
import { listaDeIcones } from "@/config/lista-de-icones";
import { useContext } from "react";
import { AppThemeContext } from "@/contexts/theme-context";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

export function Header() {
  const { permissaoLocalizacao } = useContextGeoLocalizacao();
  const contextTheme = useContext(AppThemeContext);

  return (
    <>
      <BoxApp display="flex" alignItems="center">
        <IconButton aria-label="cart">
          <StyledBadge
            badgeContent={!permissaoLocalizacao ? 1 : 0}
            color="primary"
          >
            <IconApp icon={listaDeIcones.notificacao} color="white" />
          </StyledBadge>
        </IconButton>
        <IconButton onClick={contextTheme.handleMode}>
          <IconApp
            icon={
              contextTheme.mode === "dark"
                ? listaDeIcones.temaDark
                : listaDeIcones.temaLight
            }
            color="white"
          />
        </IconButton>
        <MenuGuiaDePescaApp />
      </BoxApp>
    </>
  );
}
