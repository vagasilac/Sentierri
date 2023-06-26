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

export const StockTable = () => {
    // dummy data for raw material stock table
    const rawMaterials = [
        {
            id: 1,
            material_number: "1234",
            material_name: "material 1",
            material_description: "material description 1",
            material_image: "image 1",
            material_quantity: 10,
            material_unit: "m",
        },
        {
            id: 2,
            material_number: "1235",
            material_name: "material 2",
            material_description: "material description 2",
            material_image: "image 2",
            material_quantity: 20,
            material_unit: "m",
        },
        {
            id: 3,
            material_number: "1236",
            material_name: "material 3",
            material_description: "material description 3",
            material_image: "image 3",
            material_quantity: 30,
            material_unit: "m",
        },
    ];

    const classes = useStyles();

    const [formOpen, setFormOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        id: null,
        material_number: "",
        material_name: "",
        material_description: "",
        material_image: "",
        material_quantity: 0,
        material_unit: "",
    });

    return (
        <>
        <Typography variant="h6">Raw Materials</Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Material Number</TableCell>
                    <TableCell align="right">Material Name</TableCell>
                    <TableCell align="right">Material Description</TableCell>
                    <TableCell align="right">Material Image</TableCell>
                    <TableCell align="right">Material Quantity</TableCell>
                    <TableCell align="right">Material Unit</TableCell>
                    <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rawMaterials.map((material) => (
                    <TableRow key={material.id}>
                        <TableCell component="th" scope="row">
                        {material.material_number}
                        </TableCell>
                        <TableCell align="right">{material.material_name}</TableCell>
                        <TableCell align="right">{material.material_description}</TableCell>
                        <TableCell align="right">{material.material_image}</TableCell>
                        <TableCell align="right">{material.material_quantity}</TableCell>
                        <TableCell align="right">{material.material_unit}</TableCell>
                        <TableCell align="right">
                        <IconButton
                            aria-label="delete"
                            className={classes.margin}
                            onClick={() => {
                            setFormValues(material);
                            setFormOpen(true);
                            }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            className={classes.margin}
                            onClick={() => {
                            setFormValues(material);
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

export default StockTable;