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

const ChooseFinancialModal = ({ 
  currentAccount, 
  setFinancialTech, 
  setRates, 
  defaults, 
  defaultRates
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(defaults);

  const [stocksRates, setStocksRates] = React.useState(defaultRates[0])
  const [optionsRates, setOptionsRates] = React.useState(defaultRates[1])
  const [futureContractsRates, setFutureContractsRates] = React.useState(defaultRates[2])
  const [futureContractsOptionsRates, setFutureContractsOptionsRates] = React.useState(defaultRates[3])


  useEffect(() => {
    setStocksRates(defaultRates[0]);
    setOptionsRates(defaultRates[1]);
    setFutureContractsRates(defaultRates[2]);
    setFutureContractsOptionsRates(defaultRates[3]);
  }, [defaultRates])

  useEffect(() => {
    setState(defaults);
  }, [defaults]);



  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleAmountChange = (event) => {
    setState({ ...state, [event.target.name]: Number(event.target.value) });
  };

  const handleStocksRatesChange = (event) => {
    setStocksRates({ ...stocksRates, [event.target.name]: event.target.checked });
  };

  const handleOptionsRatesChange = (event) => {
    setOptionsRates({ ...optionsRates, [event.target.name]: event.target.checked });
  };

  const handleFutureContractsRatesChange = (event) => {
    setFutureContractsRates({ ...futureContractsRates, [event.target.name]: event.target.checked });
  };

  const handleCFutureContractsOptionsRatesChange = (event) => {
    setFutureContractsOptionsRates({ ...futureContractsOptionsRates, [event.target.name]: event.target.checked });
  };

  const handleClickOpen = () => {
    console.log(defaultRates)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    alertify.error('Changes canceled')
  };

  const confirmAndClose = () => {
    setFinancialTech(state);
    setRates([stocksRates, optionsRates, futureContractsRates, futureContractsOptionsRates])
    setOpen(false);
    alertify.success(`Changes set. click on save changes to save them`);
  };

  return (
    <div id="modalsContainer">

      <Button id="changeBalanceModal" variant="contained" color="primary" style={{ position: 'relative', left: '440px', bottom: '35px', width: '300px'  }}
        onClick={handleClickOpen}
      >
        Choose Financial Technology
      </Button>        <Dialog open={open} onClose={handleClose}>
        <DialogTitle><h3 style={{ textAlign: 'center' }}>Choose the type of financial technology you would like to use</h3></DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          {currentAccount === 'stocks' && <p style={{ fontSize: '20px' }}>
            Stocks
            <Checkbox
              checked={state.Stocks}
              name="Stocks"
              onChange={handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            {state.Stocks === true && <div>
              Stocks rates:
              <br />
              5-100$
              <Checkbox
                checked={stocksRates._5 || false}
                name="_5"
                onChange={handleStocksRatesChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              100-200$
              <Checkbox
                checked={stocksRates._100 || false}
                name="_100"
                onChange={handleStocksRatesChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              200$+
              <Checkbox
                checked={stocksRates._200 || false}
                name="_200"
                onChange={handleStocksRatesChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <br />
              Stocks per trade:
              <input type="number" style={{ width: '50px' }}
                name="StocksAmount"
                value={state.StocksAmount}
                onChange={handleAmountChange}
              />
            </div>}
          </p>}
          <p style={{ fontSize: '20px' }}>
            Options
            <Checkbox
              checked={state.Options}
              name="Options"
              onChange={handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            {state.Options === true && <div>
              Options rates:
              <br />
              5-100$
              <Checkbox
                checked={optionsRates._5 || false}
                name="_5"
                onChange={handleOptionsRatesChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              100-200$
              <Checkbox
                checked={optionsRates._100 || false}
                name="_100"
                onChange={handleOptionsRatesChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              200$+
              <Checkbox
                checked={optionsRates._200 || false}
                name="_200"
                onChange={handleOptionsRatesChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <br />
              Options per trade:
              <input type="number" style={{ width: '50px' }}
                name="OptionsAmount"
                value={state.OptionsAmount}
                onChange={handleAmountChange}
              />
            </div>}
          </p>
          <p style={{ fontSize: '20px' }}>
            Future contracts
            <Checkbox
              checked={state.FutureContract}
              name="FutureContract"
              onChange={handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            {state.FutureContract === true && <div>
              Future Contracts rates:
              <br />
              5-100$
              <Checkbox
                checked={futureContractsRates._5 || false}
                name="_5"
                onChange={handleFutureContractsRatesChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              100-200$
              <Checkbox
                checked={futureContractsRates._100 || false}
                name="_100"
                onChange={handleFutureContractsRatesChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              200$+
              <Checkbox
                checked={futureContractsRates._200 || false}
                name="_200"
                onChange={handleFutureContractsRatesChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <br />
              Future contracts per trade:
              <input type="number" style={{ width: '50px' }}
                name="FutureContractAmount"
                value={state.FutureContractAmount}

                onChange={handleAmountChange}
              />
            </div>}
          </p>
          <p style={{ fontSize: '20px' }}>
            Future contacts options
            <Checkbox
              checked={state.FutureContractOptions}
              name="FutureContractOptions"
              onChange={handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            {state.FutureContractOptions === true && <div>
              Future contract options rates:
              <br />
              5-100$
              <Checkbox
                checked={futureContractsOptionsRates._5 || false}
                name="_5"
                onChange={handleCFutureContractsOptionsRatesChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              100-200$
              <Checkbox
                checked={futureContractsOptionsRates._100 || false}
                name="_100"
                onChange={handleCFutureContractsOptionsRatesChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              200$+
              <Checkbox
                checked={futureContractsOptionsRates._200 || false}
                name="_200"
                onChange={handleCFutureContractsOptionsRatesChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <br />
              Future contract options per trade:
              <input type="number" style={{ width: '50px' }}
                name="FutureContractOptionsAmount"
                value={state.FutureContractOptionsAmount}
                onChange={handleAmountChange}
              />
            </div>}
          </p>
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

export default ChooseFinancialModal;