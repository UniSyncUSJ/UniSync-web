import {
  FormControl,
  InputLabel,
  OutlinedInput,
  type OutlinedInputProps
} from '@mui/material';

type UniSyncInputProps = {
  label: string;
  id: string;
} & OutlinedInputProps;

export default function UniSyncInput({
  label,
  id,
  fullWidth = true,
  size = 'small',
  ...rest
}: UniSyncInputProps) {
  return (
    <FormControl
      variant="outlined"
      fullWidth={fullWidth}
      size={size}
      sx={{
        '& label': {
          color: 'gray',
        },
        '& label.Mui-focused': {
          color: '#671fd8',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'gray',
          },
          '&:hover fieldset': {
            borderColor: '#671fd8',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#671fd8',
          },
        },
      }}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        label={label}
        fullWidth={fullWidth}
        size={size}
        {...rest}
      />
    </FormControl>
  );
}
