import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button'
import io from "socket.io-client";
import axios from 'axios';
import _ from 'lodash';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


const AccountDetailsTable = ({ currentAccount, userEmail }) => {
    const [info, setInfo] = useState({
        investedBalance: { credits: 0, dollars: 0 },
        currentBalance: { credits: 0, dollars: 0 },
        profitLoss: { credits: 0, dollars: 0 },
        tradesAmount: { buy: 0, sell: 0 },
    });
    const [gatewayStatus, setGatewayStatus] = useState();
    const [userType, setUserType] = useState();

    useEffect(() => {
        const socket = io("http://localhost:4423/api/socket", {
            cors: {
                origin: "http://localhost:4423",
                methods: ["GET", "POST"]
            }
        });
        socket.on('mongoStream', (data) => {
            if (
                data.documentKey._id === userEmail &&
                data.ns.coll === 'AutoUsersInfo' &&
                Object.keys(data.updateDescription.updatedFields)[0] === 'gatewayStatus'
            ) {
                setGatewayStatus(data.updateDescription.updatedFields.gatewayStatus);
            }

            if (
                data.documentKey._id === userEmail &&
                data.ns.coll === 'AutoUsersInfo' &&
                Object.keys(data.updateDescription.updatedFields)[0] === 'userType'
            ) {
                setUserType(data.updateDescription.updatedFields.userType);
            }

            if (
                data.documentKey._id === userEmail &&
                data.ns.coll === 'AutoUsersInfo' &&
                Object.keys(data.updateDescription.updatedFields)[0] === currentAccount
            ) {
                setInfo(data.updateDescription.updatedFields[currentAccount]);
            }
        });
    }, [userEmail]);

    useEffect(async () => {
        if (userEmail.length > 0) {
            const { data } = await axios.get(`/usersInfo/getUserInfo/${userEmail}`);
            setInfo(data[currentAccount]);
            setGatewayStatus(data.gatewayStatus);
            setUserType(data.userType);
        }
    }, [userEmail]);

    useEffect(async () => {
        if (userEmail) {
            const { data } = await axios.get(`/usersInfo/getUserInfo/${userEmail}`);
            setInfo(data[currentAccount]);
        }
    }, [currentAccount]);

    return (
        <div>
            <h2 style={{ display: 'inline', position: 'relative', right: '350px', top: '50px' }}>
                Gateway Status:
                {gatewayStatus === false && <span style={{ marginLeft: '10px', color: 'red' }}>
                    Dissconnected <FiberManualRecordIcon style={{ color: 'red', position: 'relative', top: '5px' }} />
                </span>}
                {gatewayStatus === true && <span style={{ marginLeft: '10px', color: 'green' }}>
                    Connected <FiberManualRecordIcon style={{ color: 'green', position: 'relative', top: '5px' }} />
                </span>}
            </h2>

            <h2 style={{ display: 'inline', position: 'relative', top: '50px', left: '170px' }}>
                User type:
                {userType === 'Simulation' && <span style={{ color: 'red' }}> Simulation</span>}
                {userType === 'Real' && <span style={{ color: 'green' }}> Real Account</span>}
            </h2>
            <table style={{ marginLeft: 'auto', marginRight: 'auto', position: 'relative', top: '100px' }}>
                <tbody>

                    <tr>
                        <th style={{ fontSize: '25px', padding: '20px' }}>Invested balance</th>
                        <th style={{ fontSize: '25px', padding: '20px' }}>Current balance</th>
                        <th style={{ fontSize: '25px', padding: '20px' }}>Profit/Loss</th>
                        <th style={{ fontSize: '25px', padding: '20px' }}>Number of trades</th>
                        <th style={{ fontSize: '25px', padding: '20px' }}>Positions details</th>
                    </tr>
                    <tr>
                        <td style={{ fontSize: '20px' }}>
                            {info.investedBalance.dollars} $
                        </td>
                        <td style={{ fontSize: '20px' }}>
                            {info.currentBalance.dollars} $
                        </td>
                        <td style={{ fontSize: '20px' }}>
                            {info.profitLoss.dollars} $
                        </td>
                        <td style={{ fontSize: '20px' }}>
                            sell: {info.tradesAmount.sell} trades
                        </td>
                        <td >
                            <Button variant="contained" color="secondary"
                                onClick={() => window.open(`/positions`, '_blank')}
                            >
                                Click Here to See info
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td style={{ fontSize: '20px' }}>
                            buy: {info.tradesAmount.buy} trades
                        </td>
                        <td>
                        <Button variant="contained" color="secondary"
                            >
                                Click Here to see reports
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AccountDetailsTable;