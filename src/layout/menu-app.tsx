import Drawer from "@mui/material/Drawer";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import { BoxApp } from "@/component/box/box-app";
import { IconButtonApp } from "@/component/icon/icon-button-app";
import { listaDeIcones } from "@/config/lista-de-icones";
import { IconApp } from "@/component/icon/icon-app";
import { rotasApp } from "@/config/rotas-app";

interface propsMenuApp {
  open: boolean;
  close: () => void;
}

export function MenuApp(props: propsMenuApp) {
  const { navigate } = useNavigateApp();

  function navegarMenu(url: string) {
    navigate(url);
    props.close();
  }

  return (
    <Drawer open={props.open} onClose={props.close}>
      <BoxApp width="250px">
        <BoxApp
          display="flex"
          alignItems="center"
          justifyContent="end"
          padding=".5rem"
        >
          <IconButtonApp icon={listaDeIcones.close} onClick={props.close} />
        </BoxApp>
        <BoxApp>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navegarMenu(rotasApp.home)}>
                <ListItemIcon>
                  <IconApp icon={listaDeIcones.home} />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navegarMenu(rotasApp.pescaria.paginacao)}
              >
                <ListItemIcon>
                  <IconApp icon={listaDeIcones.pescaria} />
                </ListItemIcon>
                <ListItemText primary="Pescaria" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navegarMenu(rotasApp.embarcacao.paginacao)}
              >
                <ListItemIcon>
                  <IconApp icon={listaDeIcones.barco} />
                </ListItemIcon>
                <ListItemText primary="Embarcação" />
              </ListItemButton>
            </ListItem>
          </List>
        </BoxApp>
      </BoxApp>
    </Drawer>
  );
}
