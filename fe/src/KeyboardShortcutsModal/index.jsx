import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const KeyboardShortcutsDialog = ({ open, handleClose }) => {
  return (
    <>
      <BootstrapDialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Keyboard Shortcuts
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid container spacing={2} alignItems="center">
            <Grid container size={12} spacing={1}>
              <Grid size={{ xs: 12, md: 3 }}>
                <Chip label="Shift + /" />
              </Grid>
              <Grid size={{ xs: 12, md: 9 }}>
                <Typography>
                  Open this dialog to view all keyboard shortcuts
                </Typography>
              </Grid>
            </Grid>

            <Grid container size={12} spacing={1}>
              <Grid size={{ xs: 12, md: 3 }}>
                <Chip label="Alt + R" />
              </Grid>
              <Grid size={{ xs: 12, md: 9 }}>
                <Typography>
                  Add a new expense item
                </Typography>
              </Grid>
            </Grid>

            <Grid container size={12} spacing={1}>
              <Grid size={{ xs: 12, md: 3 }}>
                <Chip label="Alt + E" />
              </Grid>
              <Grid size={{ xs: 12, md: 9 }}>
                <Typography>
                  Focus on the latest expense item
                </Typography>
              </Grid>
            </Grid>

            <Grid container size={12} spacing={1}>
              <Grid size={{ xs: 12, md: 3 }}>
                <Chip label="Ctrl + Enter" />
              </Grid>
              <Grid size={{ xs: 12, md: 9 }}>
                <Typography>
                  Submit all expenses
                </Typography>
              </Grid>
            </Grid>

            <Grid container size={12} spacing={1}>
              <Grid size={{ xs: 12, md: 3 }}>
                <Chip label="Tab" />
              </Grid>
              <Grid size={{ xs: 12, md: 9 }}>
                <Typography>
                  Navigate to the next input field to the right
                </Typography>
              </Grid>
            </Grid>

            <Grid container size={12} spacing={1}>
              <Grid size={{ xs: 12, md: 3 }}>
                <Chip label="Shift + Tab" />
              </Grid>
              <Grid size={{ xs: 12, md: 9 }}>
                <Typography>
                  Navigate to the previous input field to the left
                </Typography>
              </Grid>
            </Grid>

            <Grid container size={12} spacing={1}>
              <Grid size={{ xs: 12, md: 3 }}>
                <Chip label="Enter" />
              </Grid>
              <Grid size={{ xs: 12, md: 9 }}>
                <Typography>
                  Expand a dropdown / select a dropdown item
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog >
    </>
  );
}

export default KeyboardShortcutsDialog;