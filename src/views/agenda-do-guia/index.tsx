"use client";

import { BoxApp } from "@/component/box/box-app";
import { TextApp } from "@/component/text/text-app";
import { useThemeApp } from "@/hooks/use-theme-app";

export function AgendaDoGuiaView() {
  const { backgroundColor } = useThemeApp();
  return (
    <BoxApp
      width="100vw"
      overflowx="hidden"
      overflowy="auto"
      height="100vh"
      padding="1rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor={backgroundColor.default}
    >
      <TextApp titulo="Agenda do Guia" fontWeight={600} />
    </BoxApp>
  );
}
