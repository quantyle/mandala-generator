import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';

import {
    Paper,
    Table as MUITable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material'

const columns = [
    { id: 'first_name', label: 'First Name', minWidth: 170 },
    // { id: 'last_name', label: 'ISO\u00a0Code', minWidth: 100 },
    { id: 'last_name', label: 'Last Name', minWidth: 100 },
    // { id: 'date_created', label: 'Created', minWidth: 100 },

    {
        id: 'date_created',
        label: 'Created',
        minWidth: 170,
        align: 'right',
        format: (value) => {
            const date = new Date(value * 1000)
            return date.toLocaleDateString('en-US',
                {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                }
            )
        },
    },
    {
        id: 'id',
        label: 'UUID',
        minWidth: 170,
        align: 'right',
        // format: (value) => value.toLocaleString('en-US'),
    },
    // {
    //     id: 'density',
    //     label: 'Density',
    //     minWidth: 170,
    //     align: 'right',
    //     format: (value) => value.toFixed(2),
    // },
];



export default function Table(props) {
    const { rows, onClick } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <MUITable stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </MUITable>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}