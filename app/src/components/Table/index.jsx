import React from 'react';
import PropTypes from 'prop-types'
import styles from './index.module.css'
import {Paper, Table as MaterialTable, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Grid} from '@material-ui/core'

const Table = (props) => {
    const {rows, columns, rowColorByFirstColumnMap} = props
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    return (
        <Grid className={styles.container} container item xs={12} md={9} justify='center'>
            <Paper className={styles.root}>
                <TableContainer>
                    <MaterialTable stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns && columns.map((column, i) => (
                                    <TableCell
                                        key={column.id}
                                        align={i === 0 ? 'left' : 'right'}
                                        style={{minWidth: Math.max(680 / columns.length, 100)}}
                                    >
                                        {column.label || ''}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow
                                        style={{
                                            backgroundColor: rowColorByFirstColumnMap ?
                                                rowColorByFirstColumnMap[row[columns[0].id]] : '#00000'
                                        }}
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row[columns[0].id]}>
                                        {columns.map((column, i) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={`${row.code}-${column.id}=${value}`}
                                                    align={i === 0 ? 'left' : 'right'}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </MaterialTable>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={(event, newPage) => setPage(newPage)}
                    onChangeRowsPerPage={(event) => {
                        setPage(0)
                        setRowsPerPage(event.target.value)
                    }}
                />
            </Paper>
        </Grid >
    )
}

Table.propTypes = {
    /**
     * An array of rows represented by an object of keys for each column and their accompanying value.
     */
    rows: PropTypes.array.isRequired,

    /**
     * List of column objects that each have an an `id` and `label`.
     */
    columns: PropTypes.array.isRequired,
    /**
     * Map of the first column value to a rgb color for that row.
     */
    rowColorByFirstColumnMap: PropTypes.object
}

export default Table
