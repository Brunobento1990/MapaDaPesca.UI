import { Tab, Tabs } from "@mui/material";
import { ReactNode, useState } from "react";
import { BoxApp } from "@/component/box/box-app";
import { TextApp } from "@/component/text/text-app";

export interface propsTabApp {
  orientation?: "horizontal" | "vertical";
  tabs: propsTab[];
  marginTop?: string;
}

export interface propsTab {
  titulo: string;
  elemento?: ReactNode;
  iconPosition?: "end" | "start" | "bottom" | "top";
  contador?: number;
}

interface propsUseTab {
  initialTab: number;
  onChange?: (numero: number) => Promise<any>;
}

export function useTab(props?: propsUseTab) {
  const [value, setValue] = useState(props?.initialTab ?? 0);
  const handleChange = async (newValue: number) => {
    setValue(newValue);
    if (props?.onChange) {
      await props.onChange(newValue);
    }
  };

  function Component(props: propsTabApp) {
    const temContador = props.tabs.some((x) => x.contador);
    return (
      <Tabs
        orientation={props.orientation}
        value={value}
        onChange={(_, value) => handleChange(value)}
        sx={{
          boxShadow:
            props.orientation === "vertical"
              ? "2px 0 5px -2px rgba(0,0,0,0.2)"
              : "0 2px 5px -2px rgba(0,0,0,0.2)",
          marginTop: props.marginTop,
          zIndex: 1,
          position: "relative",
          marginBottom: "1rem",
        }}
      >
        {props.tabs.map((tab: any, index: number) => (
          <Tab
            key={index}
            sx={{
              alignItems: temContador ? "start" : "center",
              marginTop: temContador && !tab.contador ? "-3px" : undefined,
            }}
            icon={
              tab.contador ? (
                <BoxApp position="absolute" right="0" top="7px" height="20px">
                  <TextApp
                    titulo={`${tab.contador}`}
                    color="primary"
                    fontSize="16px"
                    fontWeight={600}
                  />
                </BoxApp>
              ) : (
                (tab.elemento as any)
              )
            }
            label={tab.titulo}
            iconPosition={tab.iconPosition}
          />
        ))}
      </Tabs>
    );
  }

  return {
    Component,
    value,
    setValue: handleChange,
  };
}
