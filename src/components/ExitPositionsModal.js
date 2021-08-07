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
import axios from 'axios';


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

const RiskManagmentModal = ({ currentAccount, open, setOpen, userEmail }) => {
    const classes = useStyles();
    const [positions, setPositions] = React.useState([]);
    const [positionsToClose, setPositionsToClose] = React.useState([]);

    const handleClose = () => {
        setOpen(false);
        alertify.error('Changes canceled')
    };

    const confirmAndClose = () => {
        setOpen(false);
        console.log(positionsToClose);
        alertify.success(`Changes set. click on save changes to save them`);
    };

    const addOrRemovePositions = (value) => {
        const filter = positionsToClose.find((position) => position === value);
        if (!filter) {
            setPositionsToClose([...positionsToClose, value]);
        } else {
            setPositionsToClose(positionsToClose.filter((position) => position !== value));
        }
    }

    useEffect(async () => {
        if (userEmail.length > 0 && open === true) {
            const { data } = await axios.get(`/positions/getUserPositions/${userEmail}`); // API שמביא את הפוזיציות של המשתמש
            const stocks = data[0].stocks.filter((position) => position.active === true).map(({ id }) => id);
            const bonds = data[0].bonds.filter((position) => position.active === true).map(({ id }) => id);
            const comodity = data[0].comodity.filter((position) => position.active === true).map(({ id }) => id);
            const currencyPairs = data[0].currencyPairs.filter((position) => position.active === true).map(({ id }) => id);
            const indexes = data[0].indexes.filter((position) => position.active === true).map(({ id }) => id);
            const activePositions = [];
            for (let i = 0; i < stocks.length; i++) {
                let stocksPositions = await axios.get(`/positions/getstock/${stocks[i]}`);
                activePositions.push(stocksPositions.data[0]);
            }
            for (let i = 0; i < bonds.length; i++) {
                let bondsPositions = await axios.get(`/positions/getbond/${bonds[i]}`);
                console.log(bonds);
                console.log(bondsPositions)
                activePositions.push(bondsPositions.data[0]);
            }
            for (let i = 0; i < comodity.length; i++) {
                let comodityPositions = await axios.get(`/positions/getcomodity/${comodity[i]}`);
                activePositions.push(comodityPositions.data[0]);
            }
            for (let i = 0; i < currencyPairs.length; i++) {
                let currencyPairsPositions = await axios.get(`/positions/getCurrencyPair/${currencyPairs[i]}`);
                activePositions.push(currencyPairsPositions.data[0]);
            }
            for (let i = 0; i < indexes.length; i++) {
                let indexesPositions = await axios.get(`/positions/getrest/${indexes[i]}`);
                activePositions.push(indexesPositions.data[0]);
            }
            console.log(activePositions)
            setPositions(activePositions);
        }
    }, [open]);



    return (
        <div id="modalsContainer">
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle><h3 style={{ textAlign: 'center' }}> Exit {currentAccount} positions` </h3></DialogTitle>
                <DialogContent style={{ textAlign: 'center' }}>
                    <h3>choose the symbols you would like to stop trading and click "close positions" to exit them</h3>
                    {positions && positions.map((position) => {
                        return <p style={{ fontSize: '20px' }}>
                            symbol: {position.symbol} price: {position.startPrice}$
                            <Checkbox
                                //   checked={state.useSystemStopLoss}
                                onClick={(event) => addOrRemovePositions(event.target.name)}
                                name={position._id}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </p>
                    })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary"
                        onClick={() => confirmAndClose()}
                    >
                        Exit Positions
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );


}

export default RiskManagmentModal;