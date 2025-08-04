"use client";

import { Fragment, ReactNode, useState } from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Header } from "./header";
import { useNavigateApp } from "../hooks/use-navigate-app";
import { useThemeApp } from "@/hooks/use-theme-app";
import { IconApp } from "@/component/icon/icon-app";
import { BoxApp } from "@/component/box/box-app";
import { TextApp } from "@/component/text/text-app";
import { listaDeIcones } from "@/config/lista-de-icones";
import { rotasApp } from "@/config/rotas-app";

const drawerWidth = 240;

interface MainProps {
  open: boolean;
  ismobile: string;
}

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<MainProps>(({ theme, open, ismobile }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open
    ? `0px`
    : ismobile === "true"
    ? "0px"
    : `-${drawerWidth - 64}px`,
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

interface propsLayout {
  children: ReactNode;
  titulo: string;
}

export default function Layout(props: propsLayout) {
  const theme = useTheme();
  const { isMobile } = useThemeApp();
  const { navigate } = useNavigateApp();
  const [open, setOpen] = useState(!isMobile);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  function navegar(url: string) {
    if (isMobile) {
      setOpen(false);
    }
    navigate(url);
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <StyledAppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{
                marginRight: "1rem",
              }}
            >
              <IconApp icon="hugeicons:menu-01" />
            </IconButton>
            <Typography variant="h6" noWrap width="100%">
              {props.titulo}
            </Typography>
            <Header />
          </Toolbar>
        </StyledAppBar>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={open}
          onClose={toggleDrawer}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: open ? drawerWidth : theme.spacing(8),
              boxSizing: "border-box",
              overflowX: "hidden",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: isMobile ? "56px" : "64px",
            }}
          >
            <Fragment></Fragment>
          </Box>
          <Divider />
          <BoxApp height="calc(100vh - 100px)">
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navegar(rotasApp.home)}>
                  <ListItemIcon>
                    <IconApp icon={listaDeIcones.home} />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => navegar(rotasApp.pescaria.paginacao)}
                >
                  <ListItemIcon>
                    <IconApp icon={listaDeIcones.pescaria} />
                  </ListItemIcon>
                  <ListItemText primary="Pescaria" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navegar(rotasApp.agenda)}>
                  <ListItemIcon>
                    <IconApp icon={listaDeIcones.calendario} />
                  </ListItemIcon>
                  <ListItemText primary="Agenda" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => navegar(rotasApp.embarcacao.paginacao)}
                >
                  <ListItemIcon>
                    <IconApp icon={listaDeIcones.barco} />
                  </ListItemIcon>
                  <ListItemText primary="Embarcação" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => navegar(rotasApp.fatura.paginacao)}
                >
                  <ListItemIcon>
                    <IconApp icon={listaDeIcones.financeiro} />
                  </ListItemIcon>
                  <ListItemText primary="Financeiro" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => navegar(rotasApp.galeria.visualizar)}
                >
                  <ListItemIcon>
                    <IconApp icon={listaDeIcones.galeria} />
                  </ListItemIcon>
                  <ListItemText primary="Galeria de troféus" />
                </ListItemButton>
              </ListItem>
            </List>
          </BoxApp>
          <BoxApp
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="1rem"
          >
            {open && <TextApp titulo="Mapa da pesca" />}
          </BoxApp>
        </Drawer>
        <Main
          sx={{ width: `100vw`, overflow: "auto" }}
          open={open}
          ismobile={isMobile.toString()}
        >
          <Toolbar />
          {props.children}
        </Main>
      </Box>
      <footer
        style={{
          textAlign: "center",
          //padding: "1rem",
          width: "100%",
          bottom: 0,
        }}
      >
        <TextApp titulo="© Mapa da pesca. Todos os direitos reservados. (47) 99996-4106" />
      </footer>
    </>
  );
}
