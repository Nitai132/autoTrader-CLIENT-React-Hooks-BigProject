import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import './HomePage.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccountDetailsTable from './AccountDetailsTable';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import ChangeBalanceModal from './ChangeBalanceModal';
import ChooseSymbolsModal from './ChooseSymbolsModal';
import ChooseFinancialModal from './ChooseFinancialModal';
import RiskManagmentModal from './RiskManagmentModal';
import SetTimeModal from './SetTimeModal';
import SetStopLossModal from './SetStopLossModal';
import ExitPositionsModal from './ExitPositionsModal';
import _ from 'lodash';


// פונקציה שמוצאת ברייק פוינטס רספונסיביים ומחלקת אותם לקטגוריות לפי גודל המסך
function getBreakPoint(windowWidth) {
  if (windowWidth) {
    if (windowWidth < 600) {
      return "xs";
    } else if (windowWidth < 960) {
      return "sm";
    } else if (windowWidth < 1280) {
      return "md";
    } else if (windowWidth < 1920) {
      return "lg"
    } else {
      return "xl";
    }
  } else {
    return undefined;
  }
}


function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


//סטיילינג - הוקס
const useStyles = makeStyles((theme) => ({ //שימוש בסטיילינג לפי קלאסים
  root: { //סטייל לרוט דיב
    flexGrow: 1,
    height: '100%'
  },
  Button: { //סטייל לכפתורים
    flexGrow: 0.1,
  },
  title: { //סטייל לכותרות בנאב באר
    flexGrow: 0.12,
    color: 'black'
  },
  tabsRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 500,
    width: '15%',
    float: 'left'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '100%',
    alignItems: 'center'
  },
}));

const HomePage = () => { //פונקציה דף ראשי
  const classes = useStyles(); //שימוש בסטיילינג לקלאסים
  const history = useHistory(); // ריאקט הוקס - ראוטר
  const [activeTradingStatus, setactiveTradingStatus] = useState('Not Active');
  const [value, setValue] = React.useState(0);
  const [currentAccount, setCurrentAccount] = useState('stocks')
  const [activeAccount, setActiveAccount] = useState(false);
  const [sellPositions, setSellPositions] = useState(false);
  const [buyPositions, setBuyPositions] = useState(false);
  const [financialTech, setFinancialTech] = useState({});
  const [riskManagment, setRiskManagment] = useState({});
  const [times, setTimes] = useState({});
  const [stopLoss, setStopLoss] = useState({});
  const [symbols, setSymbols] = useState({ groups: [], notToUse: [] });
  const [tradesPerDay, setTradesPerDay] = useState(0);
  const [stocksRates, setStocksRates] = useState({});
  const [optionsRates, setOptionsRates] = useState({});
  const [futureContractsRates, setFutureContractsRatesRates] = useState({});
  const [futureContractsOptionsRates, setFutureContractsOptionsRatesRates] = useState({});
  const [userFirstName, setUserFirstName] = useState('Guest'); //סטייט של שם המשתמש
  const [userPremission, setUserPremission] = useState(''); //סטייט של הראשות משתמש
  const [userCredits, setUserCredits] = useState(0); //סטייט של קרדיט שיש למשתמש
  const [userEmail, setUserEmail] = useState(''); //סטייט אימייל של המשתמש
  const isWindowClient = typeof window === "object";
  const [windowSize, setWindowSize] = useState(
    isWindowClient
      ? getBreakPoint(window.innerWidth) //👈
      : undefined
  );
  const [openExitModal, setOpenExitModal] = React.useState(false);

  useEffect(() => {
    //הנדלר שנקרא ברגע שיש שינוי בגודל המסך
    function setSize() {
      setWindowSize(getBreakPoint(window.innerWidth)); //👈
    }

    if (isWindowClient) {
      //register the window resize listener
      window.addEventListener("resize", setSize);

      //unregister the listerner on destroy of the hook
      return () => window.removeEventListener("resize", setSize);
    }
  }, [isWindowClient, setWindowSize]);

  const HandleLogout = async (e) => { //פונקציה שמנתקת את המשתמש
    await axios.get('/auth/logout'); // API שמנתק את המשתמש
    window.location.reload() //רענון של הדף
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAccountChange = (value) => {
    if (userFirstName !== 'Guest') {
      setCurrentAccount(value)
    } else {
      alertify.alert('Unsigned User', 'login to change account');
    }
  }

  const handleactiveAccount = (event) => {
    if (event.target.checked) {
      setActiveAccount(true);
      alertify.success(`Changes set. click on save changes to save them`);
    }
    else {
      setActiveAccount(false);
      alertify.success(`Changes set. click on save changes to save them`);

    }
  };

  const handleGetSellPositions = (event) => {
    if (event.target.checked) {
      setSellPositions(true);
      alertify.success(`Changes set. click on save changes to save them`);
    }
    else {
      setSellPositions(false);
      alertify.success(`Changes set. click on save changes to save them`);
    }
  };

  const handleGetBuyPositions = (event) => {
    if (event.target.checked) {
      setBuyPositions(true);
      alertify.success(`Changes set. click on save changes to save them`);

    }
    else {
      setBuyPositions(false);
      alertify.success(`Changes set. click on save changes to save them`);
    }
  };

  const handleTradePerDayChange = (value) => {
    setTradesPerDay(value);
    alertify.success(`Changes set. click on save changes to save them`);
  }

  const handleSetRates = (values) => {
    setStocksRates(values[0]);
    setOptionsRates(values[1]);
    setFutureContractsRatesRates(values[2]);
    setFutureContractsOptionsRatesRates(values[3]);
  }

  const handlePaymentRoute = () => {
    if (userFirstName === 'Guest') {
      alertify.alert('Unsigned User', 'Login to use this button');
    } else {
      history.push('/payment')
    }
  }

  const saveChanges = async () => {
    try {
      if (userFirstName !== 'Guest') {
        const rates = {
          stocks: stocksRates,
          options: optionsRates,
          futureContracts: futureContractsRates,
          futureContractOptions: futureContractsOptionsRates
        }
        await axios.post('/usersSetup/setSetup', {
          userEmail,
          currentAccount,
          activeAccount,
          sellPositions,
          buyPositions,
          financialTechnology: financialTech,
          stopLoss,
          riskManagment,
          times,
          symbols,
          rates,
          tradesPerDay
        }).then(() => {
          alertify.alert('Your changes has been saves successfullyy');
        });
      } else {
        alertify.alert('Unsigned User', 'Login to use this button');
      }
    } catch (err) {
      console.log(err);
    };
  };

  useEffect(async () => { //בעלייה הראשונה של הדף
    const userDetails = await axios.get('/auth/userDetails'); //בודק אם המשתמש מחובר ואם כן מביא את הפרטים שלו
    if (userDetails.data) { //אם המשתמש מחובר
      const userCredits = await axios.get(`/auth/getUserById/${userDetails.data._id}`); //בודק כמה קרדיטים יש למשתמש 
      setUserPremission(userDetails.data.isAdmin); //מציג את ההרשאות של המשתמש
      setUserCredits(userCredits.data.credits); //מציג את כמות הקרדיט של המשתמש לפי הדאטאבייס
      setUserEmail(userDetails.data.email); //מציג את האימייל של המשתמש
      setUserFirstName(userDetails.data.firstName); //מציג את השם הפרטי של המשתמש
    }
    if (userFirstName !== 'Guest') {
      const { data } = await axios.get(`/usersSetup/getSetup/${userDetails.data.email}`);
      setActiveAccount(data[currentAccount].activeAccount);
      setBuyPositions(data[currentAccount].buyPositions);
      setSellPositions(data[currentAccount].sellPositions);
      setFinancialTech(data[currentAccount].financialTechnology);
      setRiskManagment(data[currentAccount].riskManagment);
      setTimes(data[currentAccount].times);
      setStopLoss(data[currentAccount].stopLoss);
      setStocksRates(data[currentAccount].rates.stocks);
      setOptionsRates(data[currentAccount].rates.options);
      setFutureContractsRatesRates(data[currentAccount].rates.futureContracts);
      setFutureContractsOptionsRatesRates(data[currentAccount].rates.futureContractOptions);
      setTradesPerDay(data[currentAccount].tradesPerDay);
    }
  }, [userFirstName]);

  useEffect(async () => { //בעלייה הראשונה של הדף
    if (userEmail.length > 0) {
      const { data } = await axios.get(`/usersSetup/getSetup/${userEmail}`);
      setActiveAccount(data[currentAccount].activeAccount);
      setBuyPositions(data[currentAccount].buyPositions);
      setSellPositions(data[currentAccount].sellPositions);
      setFinancialTech(data[currentAccount].financialTechnology);
      setRiskManagment(data[currentAccount].riskManagment);
      setTimes(data[currentAccount].times);
      setStopLoss(data[currentAccount].stopLoss);
      setStocksRates(data[currentAccount].rates.stocks);
      setOptionsRates(data[currentAccount].rates.options);
      setFutureContractsRatesRates(data[currentAccount].rates.futureContracts);
      setFutureContractsOptionsRatesRates(data[currentAccount].rates.futureContractOptions);
      setTradesPerDay(data[currentAccount].tradesPerDay);
    }
  }, [currentAccount]);

  return (
    <div className={classes.root}>
      <AppBar
        position="relative"
        style={{
          top: 0, height: '170px', margin: 'auto', paddingTop: '45px', backgroundImage: 'url("main-img.jpg")', zIndex: '10',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
        }}
      >
        <Toolbar>
          <Grid container alignItems="center" justifyContent="flex-start" spacing={1}>

            {windowSize !== 'xs' && <Grid item xs={5} sm={2}>
              <img
                src={'/Logo.jpg'}
                style={{
                  width: '215px', position: 'relative', bottom: '21px', left: '10px'
                }}
              />
            </Grid>}

            {userFirstName === 'Guest' && windowSize !== 'xs' && <Grid item xs={5} sm={1}>
              <Typography variant="h5" className={classes.title} style={{ color: 'black', position: 'relative', bottom: '20px' }}>
                Hello Guest
              </Typography>
            </Grid>}

            {userFirstName === 'Guest' && <Grid item xs={5} sm={1}>
              <Typography variant="h5" className={classes.title} style={{ position: 'relative', bottom: '20px' }}>
              </Typography>
            </Grid>}

            {userFirstName === 'Guest' && windowSize === 'xs' && <Grid item xs={5} sm={1}>
              <Typography variant="h5" className={classes.title} style={{ color: 'black', position: 'relative', bottom: '20px' }}>
                Hello Guest
              </Typography>
            </Grid>}

            {userFirstName !== 'Guest' && <Grid item xs={5} sm={1} style={{ position: 'relative', bottom: '20px', right: '20px' }} >
              <Typography variant="h5" className={classes.title} style={{ color: 'black' }}>
                Hello {userFirstName}
              </Typography>
            </Grid>}

            {userFirstName !== 'Guest' && windowSize !== 'xs' && <Grid item xs={5} sm={1} style={{ position: 'relative', right: '20px', bottom: '20px' }}>
              <Typography variant="h5" className={classes.title} style={{ color: 'black' }}>
                balance: {userCredits}
              </Typography>
            </Grid>}

            {userFirstName !== 'Guest' && windowSize === 'xs' && <Grid item xs={5} sm={1} style={{ position: 'relative', right: '20px', position: 'relative', bottom: '20px' }}>
              <Typography variant="h5" className={classes.title} style={{ color: 'black', position: 'relative', left: '40px' }}>
                balance: {userCredits}
              </Typography>
            </Grid>}

            <Paper square
              style={{ position: 'relative', right: '30px', opacity: '90%', bottom: '20px', width: '65%' }}
            >
              <Tabs
                variant="fullWidth"
                value={5}
                style={{ backgroundColor: 'lightgrey', height: '60px', color: 'black' }}
              >
                {activeTradingStatus === 'Not Active' && <Tab label="Start Trading"
                  style={{ height: '60px', backgroundColor: 'green', fontSize: '17px', color: 'white' }}
                  onClick={() => {
                    if (userFirstName !== 'Guest') {
                      setactiveTradingStatus('Active');
                    }
                    else {
                      alertify.alert('Unsigned User', 'Login to use this button');
                    }
                  }}
                />}

                {activeTradingStatus === 'Active' && <Tab label="Stop Trading"
                  style={{ height: '60px', backgroundColor: 'red', fontSize: '17px', color: 'white' }}
                  onClick={() => setactiveTradingStatus('Not Active')}
                />}


                <Tab label="Exit all positions"
                  style={{ height: '60px', backgroundColor: 'white', color: 'black', fontSize: '17px', border: '1px solid black' }}
                />

                <Tab label="Exit specific position"
                  onClick={() => userFirstName !== 'Guest' ? setOpenExitModal(true) : alertify.alert('Unsigned User', 'Login to use this button')}
                  style={{ height: '60px', backgroundColor: 'white', color: 'black', fontSize: '14px', border: '1px solid black' }}
                />

                <Tab label="Buy more credits"
                  onClick={() => handlePaymentRoute()}

                  style={{ height: '60px', backgroundColor: 'white', color: 'black', fontSize: '17px', border: '1px solid black' }}
                />

                <Tab label="Contact us"
                  onClick={() => history.push('/contact')}

                  style={{ height: '60px', backgroundColor: 'white', color: 'black', fontSize: '17px', border: '1px solid black' }}
                />

                {userFirstName !== 'Guest' && <Tab label="Logout"
                  onClick={() => HandleLogout()}
                  style={{ height: '60px', backgroundColor: 'red', fontSize: '17px', color: 'white' }}
                />}
                {userFirstName === 'Guest' && <Tab label="Login"
                  onClick={() => history.push('/login')}
                  style={{ height: '60px', backgroundColor: 'red', fontSize: '17px', color: 'white' }}
                />}
                {userFirstName === 'Guest' && <Tab label="Register"
                  onClick={() => history.push('/register')}
                  style={{ height: '60px', backgroundColor: 'blue', fontSize: '17px', color: 'white' }}
                />}

              </Tabs>
            </Paper>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.tabsRoot}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab onClick={() => handleAccountChange('stocks')} label="Stocks Account" {...a11yProps(0)} style={{ height: '100px', width: '100%', fontSize: '20px' }} />
          <Tab onClick={() => handleAccountChange('bonds')} label="Bonds Account" {...a11yProps(1)} style={{ height: '100px', fontSize: '20px' }} />
          <Tab onClick={() => handleAccountChange('comodity')} label="Comodity Account" {...a11yProps(2)} style={{ height: '100px', fontSize: '20px' }} />
          <Tab onClick={() => handleAccountChange('currencyPairs')} label="Currency pairs Account" {...a11yProps(3)} style={{ height: '100px', fontSize: '20px' }} />
          <Tab onClick={() => handleAccountChange('indexes')} label="Indexes Account" {...a11yProps(4)} style={{ height: '100px', fontSize: '20px' }} />
        </Tabs>
      </div>
      <div style={{ width: '85%', float: 'right', height: '78vh', alignItems: 'center', textAlign: 'center' }}>
        <h2 style={{ display: 'inline', position: 'relative', top: '80px', right: '30px' }}>
          Auto Trader Status:
          {activeTradingStatus === 'Not Active' && <span style={{ marginLeft: '10px', color: 'red' }}>
            {activeTradingStatus} <FiberManualRecordIcon style={{ color: 'red', position: 'relative', top: '7px' }} />
          </span>}
          {activeTradingStatus === 'Active' && <span style={{ marginLeft: '10px', color: 'green' }}>
            {activeTradingStatus} <FiberManualRecordIcon style={{ color: 'green', position: 'relative', top: '7px' }} />
          </span>}
        </h2>
        <AccountDetailsTable userEmail={userEmail} currentAccount={currentAccount} />
        <div
          style={{
            height: '70%', position: 'relative', top: '200px', alignItems: 'center'
          }}>
          <span style={{ fontSize: '20px', position: 'relative', right: '200px' }}>
            Activate {currentAccount} account
            <Switch
              checked={activeAccount}
              onChange={handleactiveAccount}
              name="Activate"
              color="primary"
            />
          </span>
          <span style={{ fontSize: '20px', position: 'relative', right: '30px' }}>
            Get Sell Positions
            <Switch
              checked={sellPositions}
              onChange={handleGetSellPositions}
              name="SellPositions"
              color="primary"
            />
          </span>
          <span style={{ fontSize: '20px', position: 'relative', left: '210px' }}>
            Get Buy Positions
            <Switch
              checked={buyPositions}
              onChange={handleGetBuyPositions}
              name="BuyPositions"
              color="primary"
            />
          </span>
          <br />
          <br />
          <br />
          <ChangeBalanceModal
            currentAccount={currentAccount}
          />
          <ChooseSymbolsModal
            currentAccount={currentAccount}
          />
          <ChooseFinancialModal
            currentAccount={currentAccount}
            setFinancialTech={(values) => setFinancialTech(values)}
            setRates={(values) => handleSetRates(values)}
            defaults={financialTech}
            defaultRates={[stocksRates, optionsRates, futureContractsRates, futureContractsOptionsRates]}
          />
          <RiskManagmentModal
            currentAccount={currentAccount}
            setRiskManagment={(values) => setRiskManagment(values)}
            defaults={riskManagment}
          />
          <SetTimeModal
            currentAccount={currentAccount}
            setTimes={(values) => setTimes(values)}
            defaults={times}
          />
          <SetStopLossModal
            currentAccount={currentAccount}
            setStopLoss={(values) => setStopLoss(values)}
            defaults={stopLoss}
          />
          <ExitPositionsModal
            currentAccount={currentAccount}
            open={openExitModal}
            setOpen={(value) => setOpenExitModal(value)}
            userEmail={userEmail}
          />
          <br />
          <span style={{ fontSize: '20px', position: 'relative', right: '420px', top: '30px' }}>
            Amount of trades per day (1-20)
            <input type="number" style={{ width: '30px' }} min="0" max="20"
              value={tradesPerDay}
              onChange={({ target }) => handleTradePerDayChange(target.value)}
            />
          </span>
          <br />

          <Button variant="contained" color="secondary" style={{ position: 'relative', left: '136px', width: '300px' }}
            onClick={() => saveChanges()}
          >
            Save changes
          </Button>
          <Button variant="contained" style={{ position: 'relative', left: '292px', backgroundColor: 'lightgreen', width: '300px' }}
          >
            Take profits
          </Button>
        </div>
      </div>
    </div>
  )

}

export default HomePage;
