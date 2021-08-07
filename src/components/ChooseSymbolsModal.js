import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';



const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const ChooseSymbolsModal = ({ currentAccount }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [addCredits, setAddCredits] = useState(0);
  const [addDollars, setAddDollars] = useState(0)


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDollarsChange = (value) => {
    setAddDollars(Number(value))
  }

  const handleCreditsChange = (value) => {
    setAddCredits(Number(value))
  }

  const confirmChanges = () => {
    setAddDollars(0);
    setAddCredits(0);
    setOpen(false);
  }

  return (
    <div id="modalsContainer">

      <Button id="changeBalanceModal" variant="contained" color="primary" style={{ position: 'relative', right: '10px', width: '300px' }}
        onClick={handleClickOpen}
      >
        Choose {currentAccount} symbols
      </Button>        <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Choose {currentAccount} symbols</DialogTitle>
        <DialogContent>
          <p style={{ fontSize: '20px' }}>
            your current {currentAccount} credits balance is: 0
          </p>
          <br />
          <br />
          <span style={{ fontSize: '20px' }}>
            add credits
          </span>
          <Input
            id="standard-number"
            label="Number"
            InputProps={{
              inputProps: {
                type: 'number',
                min: 0
              },
            }}
            defaultValue="0"
            minValue="0"
            value={addCredits}
            onChange={({ target }) => handleCreditsChange(target.value)}
            style={{
              width: '70px',
              marginLeft: '20px'
            }}
          />
          <p style={{ fontSize: '20px' }}>
            your current {currentAccount} dollars balance is: 0
          </p>
          <br />
          <br />
          <span style={{ fontSize: '20px' }}>
            add dollars
          </span>
          <Input
            id="standard-number"
            label="Number"
            InputProps={{
              inputProps: {
                type: 'number',
                min: 0
              },
            }} defaultValue="0"
            min="0"
            value={addDollars}
            onChange={({ target }) => handleDollarsChange(target.value)}
            style={{
              width: '70px',
              marginLeft: '20px'
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmChanges} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );


}

export default ChooseSymbolsModal;