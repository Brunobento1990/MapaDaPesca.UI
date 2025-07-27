import { ReactNode } from 'react';
import { alignItems, justifyContent } from '../box/box-app';
import Grid from '@mui/material/Grid';

interface propsGridApp {
  children: ReactNode;
  spacing?: number;
  xs?: number;
  sm?: number;
  container?: boolean;
  marginTop?: string;
  padding?: string;
  item?: boolean;
  width?: string;
  height?: string;
  alignItems?: alignItems;
  justifyContent?: justifyContent;
  md?: number;
  className?: string;
}

export function GridApp(props: propsGridApp) {
  const size = { xs: props.xs, sm: props.sm, md: props.md };
  const sx = {
    marginTop: props.marginTop,
    padding: props.padding,
    justifyContent: props.justifyContent,
    alignItems: props.alignItems,
    width: props.width,
    height: props.height,
  };

  return (
    <Grid
      sx={sx}
      size={size}
      container={props.container}
      spacing={props.spacing}
      className={props.className}
      height={props.height}
    >
      {props.children}
    </Grid>
  );
}