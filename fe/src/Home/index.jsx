
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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import ExpenseItem from '../ExpenseItem';
import { getGroups, getGroupById, createExpense } from '../services';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { Box, Backdrop, CircularProgress } from "@mui/material";
import Typography from '@mui/material/Typography';

const Home = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [group, setGroup] = useState('');
  const [groups, setGroups] = useState([]);
  const [calendarValue, setCalendarValue] = useState(dayjs());
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

  const handleGroupChange = (event) => {
    setExpenseItems([]); // refresh

    const _selectedGroup = event.target.value;
    setGroup(_selectedGroup);
    const selectedGroup = groups.find(g => g.name === _selectedGroup.name);
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
      { input1: '', input2: '', userSelectValue: [...members] }
    ]);
  };

  const handleExpenseSubmit = () => {
    const expenses = expenseItems.flatMap(e => {
      if (e.input2 === '' || e.input1 === '' || e.userSelectValue.length === 0)
        return []; // Skip invalid items

      const expense = {
        cost: e.input2,
        description: e.input1,
        date: calendarValue.format(),
        repeat_interval: "never",
        currency_code: "USD",
        group_id: group.id,
      }

      const total = parseFloat(e.input2).toFixed(2);
      const share = (total / e.userSelectValue.length).toFixed(2);
      const d = total - share * e.userSelectValue.length;

      e.userSelectValue.map((user, i) => {
        expense[`users__${i}__user_id`] = user.id;
        expense[`users__${i}__paid_share`] = (user.id === userDropdownValue.id) ? total.toString() : "0";
        expense[`users__${i}__owed_share`] = share.toString();
      });

      const randomMember = Math.floor(Math.random() * (e.userSelectValue.length));
      expense[`users__${randomMember}__owed_share`] = (parseFloat(expense[`users__${randomMember}__owed_share`]) + d).toString();

      return [expense];
    });

    console.log('Expenses to submit:', expenses);

    var finalStatus = 200;

    expenses.forEach(async (expense) => {
      try {
        const res = await createExpense(expense);
        console.log('createExpense success:', res);
        finalStatus = res.status;
      } catch (err) {
        console.error('createExpense fail:', err);
        finalStatus = err.response.status;
      }
    });

    setSnackbar({ open: true, message: finalStatus.toString(), severity: finalStatus === 200 ? 'success' : 'error' });
  }

  useEffect(() => {
    // Add global keydown listener for Alt+Enter and Alt+E
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === 'Enter' || e.keyCode === 13)) {
        e.preventDefault();
        setTimeout(() => {
          handleAddExpenseItem();
        }, 0);
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
  }, [members]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && (e.key === 'Enter' || e.keyCode === 13)) {
        e.preventDefault();
        setTimeout(() => {
          handleExpenseSubmit();
        }, 0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [expenseItems]);

  useEffect(() => {
    getGroups()
      .then(data => {
        const groupArr = data.groups;
        if (Array.isArray(groupArr)) {
          setGroups(groupArr);
        }
      })
      .catch(err => {
        console.error('Failed to fetch groups:', err);
      });
  }, []);

  const getFullName = ({ first_name, last_name }) => `${first_name}${last_name ? ' ' + last_name : ''}`;

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
        <Box sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
          <Typography variant="h4" component="h4">
            Split.me
          </Typography>
        </Box>
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
                <InputLabel id="group-label">Group</InputLabel>
                <Select
                  labelId="group-label"
                  id="group"
                  value={group.name}
                  label="Group"
                  onChange={handleGroupChange}
                >
                  {groups.map((group, idx) => (
                    <MenuItem key={idx} value={group}>{group.name}</MenuItem>
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
                  renderValue={(selected) =>
                    getFullName(selected)
                  }
                >
                  {members.map((option, idx) => (
                    <MenuItem key={option.id || idx} value={option}>
                      {getFullName(option)}
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
            <Button variant="text" onClick={handleExpenseSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar(s => ({ ...s, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Box sx={{ width: '100%', textAlign: 'center', py: 2, position: 'fixed', bottom: 0, left: 0, bgcolor: 'background.paper' }}>
        <Typography variant="overline" color="text.secondary">
          Made with <span style={{ color: 'red' }}>❤️</span> by thegeekylad
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
