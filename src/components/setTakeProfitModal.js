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

const RiskManagmentModal = ({ currentAccount, setTakeProfit, defaults, unSavedChangesFlag }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(defaults);


  useEffect(() => {
    console.log(defaults)
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
    setTakeProfit(state);
    setOpen(false);
    unSavedChangesFlag(true);
    alertify.success(`Changes set. click on save changes to save them`);
  };

  const useTakeProfit = state.useTakeProfit
    ?
    <p>
      <span>
        Would You like to use Trading And Coffee's Take profit system?
        <Checkbox
          checked={state.systemTakeProfit}
          name="systemTakeProfit"
          onChange={handleChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </span>
      {state.systemTakeProfit === false && <span>
        if not, you can set here your own take profit by precentage (%). <br></br>
        <input type="number"
          name="userTakeProfit"
          value={state.userTakeProfit}
          onChange={({ target }) => setState({ ...state, userTakeProfit: Number(target.value) })}
        />
      </span>}
    </p>
    :
    null
    ;


  return (
    <div id="modalsContainer">

      <Button id="changeBalanceModal" variant="contained" color="primary"
        style={{ position: 'relative', bottom: '96px', width: '300px' }}
        onClick={handleClickOpen}
      >
        Set Take Profit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><h3 style={{ textAlign: 'center' }}>Set Your {currentAccount} Take profit</h3></DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
         <p style={{ fontSize: '20px' }}>
            Would You like to use Take profit?
            <Checkbox
              checked={state.useTakeProfit || ''}
              name="useTakeProfit"
              onChange={handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </p>
          {useTakeProfit}
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