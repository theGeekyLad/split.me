import React from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useMemo } from "react";

const ExpenseItem = ({
  input1,
  input2,
  userSelectValue,
  handleInput1Change,
  handleInput2Change,
  handleUserSelectChange,
  multiSelectOptions,
  onDelete
}) => {
  const [wasTouched, setWasTouched] = useState(false);

  const effectiveUserSelectValue = useMemo(() => {
    if (!wasTouched) {
      setWasTouched(true);
      return multiSelectOptions
    }
    return userSelectValue;
  }, [userSelectValue]);

  return (
    <Grid container spacing={2} alignItems="center">
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
      <Grid size={3}>
        <FormControl fullWidth>
          <InputLabel id="user-label">User</InputLabel>
          <Select
            labelId="user-label"
            id="user"
            multiple
            value={effectiveUserSelectValue}
            onChange={handleUserSelectChange}
            input={<OutlinedInput label="User" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {multiSelectOptions.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={effectiveUserSelectValue.indexOf(option) > -1} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={1}>
        <IconButton onClick={onDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>

  );
};

export default ExpenseItem;
