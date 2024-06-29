import { Controller } from "react-hook-form";

import TextField from "@mui/material/TextField";

export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  disabled?: boolean;
}

export const FormInputText = ({
  name,
  control,
  label,
  disabled = false,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          disabled={disabled}
        />
      )}
    />
  );
};
