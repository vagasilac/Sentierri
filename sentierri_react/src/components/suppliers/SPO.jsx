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

export const SPO = () => {
    const classes = useStyles();

    const [formOpen, setFormOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        id: null,
        order_number: "",
        order_date: "",
        delivery_date: "",
        status: "",
        total: "",
        currency: "",
    });

    const supplierOrders = [
        {
            id: 1,
            order_number: "1234",
            order_date: "2021-01-01",
            delivery_date: "2021-01-01",
            status: "Pending",
            total: 100,
            currency: "USD",
        },
        {
            id: 2,
            order_number: "1235",
            order_date: "2021-01-01",
            delivery_date: "2021-01-01",
            status: "Pending",
            total: 100,
            currency: "USD",
        },
        {
            id: 3,
            order_number: "1236",
            order_date: "2021-01-01",
            delivery_date: "2021-01-01",
            status: "Pending",
            total: 100,
            currency: "USD",
        },
    ];

    return (
        <>
        <Typography variant="h6">Supplier Orders</Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Order Number</TableCell>
                    <TableCell align="right">Order Date</TableCell>
                    <TableCell align="right">Delivery Date</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Currency</TableCell>
                    <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {supplierOrders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell component="th" scope="row">
                        {order.order_number}
                        </TableCell>
                        <TableCell align="right">{order.order_date}</TableCell>
                        <TableCell align="right">{order.delivery_date}</TableCell>
                        <TableCell align="right">{order.status}</TableCell>
                        <TableCell align="right">{order.total}</TableCell>
                        <TableCell align="right">{order.currency}</TableCell>
                        <TableCell align="right">
                        <IconButton
                            aria-label="delete"
                            className={classes.margin}
                            onClick={() => {
                            setFormValues(order);
                            setFormOpen(true);
                            }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            className={classes.margin}
                            onClick={() => {
                            setFormValues(order);
                            setFormOpen(true);
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};