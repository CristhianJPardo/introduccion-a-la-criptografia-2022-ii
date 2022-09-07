import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function FormPropsTextFields() {

  return (

    <Box
      sx={{
        // border: "1px solid red",
        display: 'flex',
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Box>
        <TextField
          id="outlined-helperText"
          label="Enter the number of shifts"
          placeholder="1"
          helperText="Must be an integer"
          sx={{ width: "300px" }}
        />

      </Box>
      <Box sx={{ mb: 5 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 0.5, ml: 0.5 }}
        >
          Set parameters
        </Button>
        <Button variant="contained" color="secondary">
          Reset
        </Button>
      </Box>
      {/* <Divider /> */}
      <Box>
        <TextField
          id="outlined-inputText"
          label="Enter the text you want to cipher"
          placeholder="attack at down"
          helperText="Must be only alphabetic characters (also space)"
        />
      </Box>
    </Box>
  );
}