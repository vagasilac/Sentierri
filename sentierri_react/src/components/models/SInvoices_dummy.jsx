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

export const SInvoices_dummy = () => {
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

    const supplierInvoices = [
        {
            id: 1,
            invoice_number: "1234",
            invoice_date: "2021-01-01",
            due_date: "2021-01-01",
            status: "Pending",
            total: 100,
            currency: "USD",
        },
        {
            id: 2,
            invoice_number: "1235",
            invoice_date: "2021-01-01",
            due_date: "2021-01-01",
            status: "Pending",
            total: 100,
            currency: "USD",
        },
        {
            id: 3,
            invoice_number: "1236",
            invoice_date: "2021-01-01",
            due_date: "2021-01-01",
            status: "Pending",
            total: 100,
            currency: "USD",
        },
    ];            

    return (
        <>
        <Typography variant="h6">Supplier Invoices</Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Invoice Number</TableCell>
                    <TableCell align="right">Invoice Date</TableCell>
                    <TableCell align="right">Due Date</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Currency</TableCell>
                    <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {supplierInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell component="th" scope="row">
                        {invoice.invoice_number}
                        </TableCell>
                        <TableCell align="right">{invoice.invoice_date}</TableCell>
                        <TableCell align="right">{invoice.due_date}</TableCell>
                        <TableCell align="right">{invoice.status}</TableCell>
                        <TableCell align="right">{invoice.total}</TableCell>
                        <TableCell align="right">{invoice.currency}</TableCell>
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