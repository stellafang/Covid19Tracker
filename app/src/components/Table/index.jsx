import React, {useState} from 'react';
import PropTypes from 'prop-types'
import styles from './index.module.css'
import {Paper, Table as MaterialTable, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Grid} from '@material-ui/core'

const BodyTableRow = (props) => {
    const {row, columns, color} = props
    const firstColId = columns && columns.length > 0 && columns[0].id

    return (row && columns.length > 0 &&
        <TableRow
            style={{backgroundColor: color}}
            hover
            tabIndex={-1}
            key={row[firstColId]}>
            {columns.map((column, i) => <TableCell
                key={`row-${row[firstColId]}${column.id}`}
                align={i === 0 ? 'left' : 'right'}>
                {row[column.id]}
            </TableCell>
            )}
        </TableRow>)
}

BodyTableRow.propTypes = {
    row: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    color: PropTypes.string
}

const Table = (props) => {
    const {rows, columns, rowColorByFirstColumnMap} = props
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    return (
        <Grid className={styles.container} container item xs={12} md={9} justify='center'>
            <Paper className={styles.root}>
                <TableContainer>
                    <MaterialTable size='small' stickyHeader aria-label="sticky table" >
                        <TableHead>
                            <TableRow>
                                {columns && columns.map((column, i) => (
                                    <TableCell
                                        key={column.id}
                                        align={i === 0 ? 'left' : 'right'}>
                                        {column.label || ''}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) =>
                                <BodyTableRow key={`body-table-row-${i}`} row={row} columns={columns} color={rowColorByFirstColumnMap ?
                                    rowColorByFirstColumnMap[row[columns[0].id]] : '#00000'} />
                            )}
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
     * An array of rows represented by an object of keys for each column and its accompanying value.
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
