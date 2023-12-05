import React from 'react';
import TextField from '@mui/material/TextField';
import MaskedInput from 'react-text-mask';

const DateTimeInput = ({ id, label, tipo, name, value, onchange, requerido
  , readonly, maxlength, msgvalido, msginvalido, placeholder, rows }) => {
  const dateTimeMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/];

  return (
    <TextField
      fullWidth={true}

      type={tipo}
      id={id}
      label={label}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onchange}
      required={requerido}
      maxLength={maxlength}
      helperText={value === "" && requerido === true ? msginvalido : ' '}
      error={readonly || requerido === false ? false : value === ""}
      InputProps={{
        inputComponent: (props) => (
          <MaskedInput
            {...props}
            mask={dateTimeMask}
            placeholderChar={'\u2000'}
            showMask
          />
        ),
      }}
    />
  );
};

export default DateTimeInput;
