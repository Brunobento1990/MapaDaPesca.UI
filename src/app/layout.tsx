"use client";

import "./globals.css";
import { useSnackbar } from "@/component/snack-bar/use-snack-bar";
import { GuiaDePescaProvider } from "@/contexts/guia-pe-pesca-context";
import { GeoLocalizacaoProvider } from "@/contexts/geolocalizacao-context";
import { useModal } from "@/component/modal/use-modal";
import { AppThemeProvider } from "@/contexts/theme-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { Componet: Snack } = useSnackbar();
  const { Component: Modal } = useModal();
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <title>{`Mapa da pesca`}</title>
        <meta
          name="description"
          content={`Agendamentos e controle de pesca esportiva.`}
        />
      </head>
      <AppThemeProvider>
        <body>
          <GeoLocalizacaoProvider>
            <GuiaDePescaProvider>
              <Snack />
              <Modal />
              {children}
            </GuiaDePescaProvider>
          </GeoLocalizacaoProvider>
        </body>
      </AppThemeProvider>
    </html>
  );
}
