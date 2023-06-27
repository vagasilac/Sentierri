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

export const QualityIssues_dummy = () => {
    const classes = useStyles();

    const [formOpen, setFormOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        id: null,
        issue: "",
        reported_date: "",
        status: "",
    });

    const qualityIssues = [
        {
            id: 1,
            issue: "Issue 1",
            reported_date: "2023-05-01",
            status: "Open",
        },
        {
            id: 2,
            issue: "Issue 2",
            reported_date: "2023-05-02",
            status: "Closed",
        },
        {
            id: 3,
            issue: "Issue 3",
            reported_date: "2023-05-03",
            status: "Open",
        },
    ];            

    return (
        <>
        <Typography variant="h6">Quality Issues</Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Issue</TableCell>
                    <TableCell align="right">Reported Date</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {qualityIssues.map((issue) => (
                    <TableRow key={issue.id}>
                        <TableCell component="th" scope="row">
                        {issue.issue}
                        </TableCell>
                        <TableCell align="right">{issue.reported_date}</TableCell>
                        <TableCell align="right">{issue.status}</TableCell>
                        <TableCell align="right">
                        <IconButton
                            aria-label="edit"
                            className={classes.margin}
                            onClick={() => {
                            setFormValues(issue);
                            setFormOpen(true);
                            }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            className={classes.margin}
                            onClick={() => {
                            setFormValues(issue);
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
