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

export const ModelTable = () => {
    // dummy data for suit models
    const suitModels = [
        {
            id: 1,
            model_number: "1234",
            model_name: "model 1",
            model_description: "model description 1",
            model_image: "image 1",
        },
        {
            id: 2,
            model_number: "1235",
            model_name: "model 2",
            model_description: "model description 2",
            model_image: "image 2",
        },
        {
            id: 3,
            model_number: "1236",
            model_name: "model 3",
            model_description: "model description 3",
            model_image: "image 3",
        },
    ];

    const classes = useStyles();

    const [formOpen, setFormOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        id: null,
        model_number: "",
        model_name: "",
        model_description: "",
        model_image: "",
    });

    return (
        <>
        <Typography variant="h6">Suit Models</Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Model Number</TableCell>
                    <TableCell align="right">Model Name</TableCell>
                    <TableCell align="right">Model Description</TableCell>
                    <TableCell align="right">Model Image</TableCell>
                    <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {suitModels.map((model) => (
                    <TableRow key={model.id}>
                        <TableCell component="th" scope="row">
                        {model.model_number}
                        </TableCell>
                        <TableCell align="right">{model.model_name}</TableCell>
                        <TableCell align="right">{model.model_description}</TableCell>
                        <TableCell align="right">{model.model_image}</TableCell>
                        <TableCell align="right">
                        <IconButton
                            aria-label="delete"
                            className={classes.margin}
                            onClick={() => {
                            setFormValues(model);
                            setFormOpen(true);
                            }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            className={classes.margin}
                            onClick={() => {
                            setFormValues(model);
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

export default ModelTable;