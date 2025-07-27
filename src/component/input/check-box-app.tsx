import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';
import { useThemeApp } from '@/hooks/use-theme-app';
import { TextApp } from '../text/text-app';

export interface propsCheckBox {
  value?: boolean;
  onChange?: (key: string,value: boolean) => void;
  label?: string;
  required?: boolean;
  readonly?: boolean;
  id?: string;
  minWidth?: string;
  marginLeft?: string;
  width?: string;
  destacar?: boolean;
  padding?: string;
}

export function CheckBoxApp(props: propsCheckBox) {
  const { cores, borderRadius } = useThemeApp();
  return (
    <FormGroup
      sx={{
        minWidth: props.minWidth,
        marginLeft: props.marginLeft,
        color: props.destacar ? cores.primary.main : cores.text.primary,
        width: props.width,
        backgroundColor: props.destacar ? '#dbdbdb' : undefined,
        borderRadius: borderRadius,
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            required={props.required}
            readOnly={props.readonly}
            disabled={props.readonly}
            checked={props.value ?? false}
            sx={{
              padding: props.padding,
            }}
            onChange={(e) => {
              if (props.onChange && props.id) {
                props.onChange(props.id, e.target.checked);
              }
            }}
          />
        }
        sx={{
          '&:hover': {
            color: cores.primary.main,
          },
        }}
        label={
          <TextApp
            hover={{ color: cores.primary.main }}
            titulo={props.label ?? ''}
          />
        }
        color={cores.text.primary}
      />
    </FormGroup>
  );
}