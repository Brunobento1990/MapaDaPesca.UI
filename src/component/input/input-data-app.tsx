import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { InputAppProps } from './input-app';

export function InputDataApp(props: InputAppProps) {
  const newValue =
    typeof props.value === 'string' && props.value.length === 0
      ? null
      : props.value;
  return (
    <DatePicker
      format='DD/MM/YYYY'
      value={newValue ? dayjs(newValue) : null}
      onChange={(newValue: any, context) => {
        if (props.onChange) {
          if (newValue?.$d && context?.validationError !== 'invalidDate') {
            props.onChange(props.id ?? '', newValue.$d.toISOString());
          } else if (newValue === null) {
            props.onChange(props.id ?? '', '');
          }
        }
      }}
      onClose={props.onClose}
      autoFocus={props.autoFocus}
      readOnly={props.readonly}
      slotProps={{
        textField: {
          margin: 'normal',
          label: props.label,
          fullWidth: true,
          size: 'small',
          helperText: props.helperText,
          error: props.error,
          required: props.required,
          disabled: props.readonly,
        },
      }}
    />
  );
}