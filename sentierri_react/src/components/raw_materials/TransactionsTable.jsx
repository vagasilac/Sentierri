import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export const TransactionsTable = () => {
    // dummy data for raw material transactions
    const [transactions, setTransactions] = useState([
        {
            id: 1,
            date: "2021-09-01",
            raw_material: "Raw Material 1",
            quantity: 100,
            unit: "kg",
            price: 10,
            total: 1000,
            action: "edit",
        },
        {
            id: 2,
            date: "2021-09-02",
            raw_material: "Raw Material 2",
            quantity: 200,
            unit: "kg",
            price: 20,
            total: 4000,
            action: "edit",
        },
        {
            id: 3,
            date: "2021-09-03",
            raw_material: "Raw Material 3",
            quantity: 300,
            unit: "kg",
            price: 30,
            total: 9000,
            action: "edit",
        },
    ]);

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="raw materials transactions table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Raw Material</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Unit</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell component="th" scope="row">
                                {transaction.date}
                            </TableCell>
                            <TableCell>{transaction.raw_material}</TableCell>
                            <TableCell>{transaction.quantity}</TableCell>
                            <TableCell>{transaction.unit}</TableCell>
                            <TableCell>{transaction.price}</TableCell>
                            <TableCell>{transaction.total}</TableCell>
                            <TableCell>
                                <IconButton aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TransactionsTable;