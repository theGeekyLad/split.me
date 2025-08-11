
import React, { useState } from "react";

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Home = () => {
  const [dropdownValue, setDropdownValue] = useState('option1');
  const [calendarValue, setCalendarValue] = useState(null);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [userSelectValue, setuserSelectValue] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored === null ? false : stored === 'true';
  });

  const handleDarkModeToggle = () => {
    setDarkMode((prev) => {
      localStorage.setItem('darkMode', !prev);
      return !prev;
    });
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };

  const handleInput1Change = (event) => {
    setInput1(event.target.value);
  };

  const handleInput2Change = (event) => {
    setInput2(event.target.value);
  };

  const handleUserSelectChange = (event) => {
    const { value } = event.target;
    setuserSelectValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const multiSelectOptions = ['Apple', 'Banana', 'Cherry', 'Date'];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2} sx={{ mt: 2, mb: 4 }} alignItems="center">
            <Grid size={2}>
              <DatePicker
                label="Select Date"
                value={calendarValue}
                onChange={setCalendarValue}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid size={8}>
              <FormControl fullWidth>
                <InputLabel id="dropdown-label">Dropdown</InputLabel>
                <Select
                  labelId="dropdown-label"
                  id="dropdown"
                  value={dropdownValue}
                  label="Dropdown"
                  onChange={handleDropdownChange}
                >
                  <MenuItem value={'option1'}>Option 1</MenuItem>
                  <MenuItem value={'option2'}>Option 2</MenuItem>
                  <MenuItem value={'option3'}>Option 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={2}>
              <FormControlLabel
                control={<Switch checked={darkMode} onChange={handleDarkModeToggle} />}
                label={darkMode ? 'Dark' : 'Light'}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              fullWidth
              label="Item"
              variant="outlined"
              type="text"
              value={input1}
              onChange={handleInput1Change}
            />
          </Grid>
          <Grid size={2}>
            <TextField
              fullWidth
              label="Cost"
              variant="outlined"
              type="number"
              value={input2}
              onChange={handleInput2Change}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>
          <Grid size={4}>
            <FormControl fullWidth>
              <InputLabel id="user-label">User</InputLabel>
              <Select
                labelId="user-label"
                id="user"
                multiple
                value={userSelectValue}
                onChange={handleUserSelectChange}
                input={<OutlinedInput label="User" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {multiSelectOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={userSelectValue.indexOf(option) > -1} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
