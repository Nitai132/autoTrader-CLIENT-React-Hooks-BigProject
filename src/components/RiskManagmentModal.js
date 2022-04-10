import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    display: 'flex',
  },
}));

const RiskManagmentModal = ({ currentAccount, setRiskManagment, defaults, unSavedChangesFlag }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(defaults);

  useEffect( ()=> {
    setState(defaults);
  }, [defaults]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    alertify.error('Changes canceled')
  };

  const confirmAndClose = () => {
    setRiskManagment(state);
    unSavedChangesFlag(true);
    setOpen(false);
    alertify.success(`Changes set. click on save changes to save them`);
  };

  const setPositionsInput = state.usePositionsRisk
    ? <p>
      please set your Risk managment by amount of failed trades
      <input type="number"
        name="positionsRisk"
        value={state.positionsRisk}
        onChange={({ target }) => setState({ ...state, [target.name]: Number(target.value) })}
      />
    </p>
    : null;

  const setDollarsInput = state.useDollarsRisk
    ? <p>
      please set your Risk managment by amount of dollars lost
      <input type="number"
        name="dollarsRisk"
        value={state.dollarsRisk}

        onChange={({ target }) => setState({ ...state, [target.name]: Number(target.value) })}
      />
    </p>
    : null;

    const setRatesInput = state.useRatesRisk
    ? <p>
      please set the rates risk managment by precentage (%) of dollars ($) that was lost from your total balance
      <input type="number"
        name="ratesRisk"
        value={state.ratesRisk}

        onChange={({ target }) => setState({ ...state, [target.name]: Number(target.value) })}
      />
    </p>
    : null;

  return (
    <div id="modalsContainer">

      <Button id="changeBalanceModal" variant="contained" color="primary" style={{ position: 'relative', left: '440px', bottom: '50px', width: '300px'  }}
        onClick={handleClickOpen}
      >
        Set Risk Managment
      </Button>       
       <Dialog open={open} onClose={handleClose}>
        <DialogTitle><h3 style={{ textAlign: 'center' }}>Set Your {currentAccount} risk managment</h3></DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          <h3 style={{ position: 'relative', bottom: '20px' }}>
            We have two kinds of risk managment settings: {<br />}
            by amount of failed trades (per day) {<br />}
            and by amount of money lost.

          </h3>
          <p style={{ fontSize: '20px' }}>
            Would You like to use failed trades risk managment?
            <Checkbox
              checked={state.usePositionsRisk}
              name="usePositionsRisk"
              onChange={handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </p>
          {setPositionsInput}
          <p style={{ fontSize: '20px' }}>
            Would You like to use money lost risk managment?
            <Checkbox
              checked={state.useDollarsRisk}
              name="useDollarsRisk"
              onChange={handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </p>
          {setDollarsInput}
          <p style={{ fontSize: '20px' }}>
            Would You like to use balance rates risk managment?
            <Checkbox
              checked={state.useRatesRisk}
              name="useRatesRisk"
              onChange={handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </p>
          {setRatesInput}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary"
            onClick={() => confirmAndClose()}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );


}

export default RiskManagmentModal;