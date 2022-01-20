import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const PREFIX = 'Modal';
const classes = {
  root: `${PREFIX}-root`,
  content: `${PREFIX}-content`,
  actions: `${PREFIX}-actions`,
};

const Root = styled(Dialog)(({ theme }) => ({
  [`&.${classes.root}`]: {
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(2),
      justifyContent: 'space-between',
    },
  },
  [`& .${classes.content}`]: {
    borderTop: 'none',
    borderBottom: 'none',
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  [`& .${classes.actions}`]: {
    display: 'flex',
    justifyContent: 'center !important'
  },
}));

const Modal = ({
  open,
  handelCloseModal,
  children,
}) => {
  return (
    <Root
      className={classes.root}
      open={open}
      onClose={() => handelCloseModal(false)}
      maxWidth="xs"
      fullWidth
    >
      <DialogContent dividers className={classes.content}>
        {children}
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button onClick={() => handelCloseModal(true)}>Ok</Button>
      </DialogActions>
    </Root>
  );
};

export default Modal;
