import React, {useEffect} from 'react';
import PropTypes from 'prop-types'
import styles from './index.module.css'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@material-ui/core'
import {getCountryTotalsInDateRangeSync} from '../../api'

//TODO: background color for each row!!

const columns = [
    {id: 'country', label: 'Country', minWidth: 170},
    {
        id: 'totalConfirmed',
        label: 'Confirmed',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'totalDeaths',
        label: 'Death',
        minWidth: 170,
        align: 'right'
    },
    {
        id: 'totalRecovered',
        label: 'Recovered',
        minWidth: 170,
        align: 'right'
    },
];

const CustomTable = (props) => {
    const {countryTotals} = props
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    let rows = countryTotals || []
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={styles.root}>
            <TableContainer className={styles.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            )
                        }) : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

CustomTable.propTypes = {
    all: PropTypes.object
}

export default CustomTable
