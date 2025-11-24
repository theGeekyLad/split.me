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
import { useEffect } from "react";

const ExpenseItem = ({
  input1,
  input2,
  userSelectValue,
  handleInput1Change,
  handleInput2Change,
  handleUserSelectChange,
  members,
  onDelete
}) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={{xs: 12, md: 6}}>
        <TextField
          fullWidth
          className="item-name-field"
          label="Item"
          variant="outlined"
          type="text"
          value={input1}
          onChange={handleInput1Change}
        />
      </Grid>
      <Grid size={{xs: 12, md: 2}}>
        <TextField
          fullWidth
          label="Cost"
          variant="outlined"
          type="text"
          value={input2}
          onChange={handleInput2Change}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Grid>
      <Grid size={{xs: 12, md: 3}}>
        <FormControl fullWidth>
          <InputLabel id="user-label">User</InputLabel>
          <Select
            labelId="user-label"
            id="user"
            multiple
            value={userSelectValue}
            onChange={handleUserSelectChange}
            input={<OutlinedInput label="User" />}
            renderValue={(selected) =>
              members
                .filter(option => selected.includes(option))
                .map(option => option.first_name + (option.last_name ? ' ' + option.last_name : ''))
                .join(', ')
            }
          >
            {members.map((option) => (
              <MenuItem key={option.id} value={option}>
                <Checkbox checked={userSelectValue.indexOf(option) > -1} />
                <ListItemText primary={option.first_name + (option.last_name ? ' ' + option.last_name : '')} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{xs: 12, md: 1}}>
        <IconButton onClick={onDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>

  );
};

export default ExpenseItem;
