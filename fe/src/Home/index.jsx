
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

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
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ExpenseItem from '../ExpenseItem';
import { getGroups, getGroupById } from '../services';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { Box, Backdrop, CircularProgress } from "@mui/material";

const Home = () => {
  const [dropdownValue, setDropdownValue] = useState('');
  const [groupNames, setGroupNames] = useState([]);
  const [groups, setGroups] = useState([]);
  const [calendarValue, setCalendarValue] = useState(null);
  const [expenseItems, setExpenseItems] = useState([]);
  const [members, setMembers] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored === null ? false : stored === 'true';
  });
  // State for the new dropdown
  const [userDropdownValue, setUserDropdownValue] = useState('');
  const loading = useSelector(state => state.progress.visible);

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
    setExpenseItems([]); // refresh

    const selectedName = event.target.value;
    setDropdownValue(selectedName);
    const selectedGroup = groups.find(g => g.name === selectedName);
    if (selectedGroup) {
      getGroupById(selectedGroup.id)
        .then(data => {
          // Extract member names and set as members
          const members = data.group?.members || [];
          setMembers(members);
        })
        .catch(err => {
          console.error('Failed to fetch group details:', err);
        });
    } else {
      setMembers([]);
    }
  };

  const handleExpenseItemChange = (idx, field, value) => {
    setExpenseItems((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      )
    );
  };

  const handleUserSelectChange = (idx, event) => {
    const { value } = event.target;
    handleExpenseItemChange(idx, 'userSelectValue', typeof value === 'string' ? value.split(',') : value);
  };

  const handleAddExpenseItem = () => {
    setExpenseItems((prev) => [
      ...prev,
      { input1: '', input2: '', userSelectValue: [] }
    ]);
  };

  useEffect(() => {
    console.log('expenseItems', expenseItems);
  }, [expenseItems]);

  useEffect(() => {
    getGroups()
      .then(data => {
        const groupArr = data.groups;
        if (Array.isArray(groupArr)) {
          setGroups(groupArr);
          const names = groupArr.map(g => g.name);
          setGroupNames(names);
        }
      })
      .catch(err => {
        console.error('Failed to fetch groups:', err);
      });

    // Add global keydown listener for Alt+Enter and Alt+E
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === 'Enter' || e.keyCode === 13)) {
        e.preventDefault();
        handleAddExpenseItem();
      } else if (e.altKey && (e.key === 'e' || e.key === 'E' || e.keyCode === 69)) {
        e.preventDefault();
        const itemFields = document.querySelectorAll('.item-name-field input');
        if (itemFields.length > 0) {
          itemFields[itemFields.length - 1].focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(0,0,0,0.4)' }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
            <Grid size={5}>
              <FormControl fullWidth>
                <InputLabel id="dropdown-label">Dropdown</InputLabel>
                <Select
                  labelId="dropdown-label"
                  id="dropdown"
                  value={dropdownValue}
                  label="Dropdown"
                  onChange={handleDropdownChange}
                >
                  {groupNames.map((name, idx) => (
                    <MenuItem key={idx} value={name}>{name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={3}>
              <FormControl fullWidth>
                <InputLabel id="user-dropdown-label">Who Am I</InputLabel>
                <Select
                  labelId="user-dropdown-label"
                  id="user-dropdown"
                  value={userDropdownValue}
                  label="User"
                  onChange={e => setUserDropdownValue(e.target.value)}
                >
                  {members.map((option, idx) => (
                    <MenuItem key={option.id || idx} value={option.id}>
                      {option.first_name}{option.last_name ? ' ' + option.last_name : ''}
                    </MenuItem>
                  ))}
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
        {expenseItems.map((item, idx) => (
          <Box sx={{ mb: 2 }} key={idx}>
            <ExpenseItem
              input1={item.input1}
              input2={item.input2}
              userSelectValue={item.userSelectValue}
              handleInput1Change={e => handleExpenseItemChange(idx, 'input1', e.target.value)}
              handleInput2Change={e => handleExpenseItemChange(idx, 'input2', e.target.value)}
              handleUserSelectChange={e => handleUserSelectChange(idx, e)}
              members={members}
              onDelete={() => setExpenseItems(items => items.filter((_, i) => i !== idx))}
            />
          </Box>
        ))}
        <Grid container sx={{ mt: 2 }} spacing={2} alignItems="center">
          <Grid>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddExpenseItem}>
              Add
            </Button>
          </Grid>
          <Grid>
            <Button variant="text" onClick={() => { }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
