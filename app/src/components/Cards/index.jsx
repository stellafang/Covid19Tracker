import React from 'react'
import PropTypes from 'prop-types'

import {Card, CardContent, Typography, Grid} from '@material-ui/core'
import CountUp from 'react-countup'
import styles from './index.module.css'

const Cards = (props) => {
    const {totals, lastUpdated} = props
    if (!totals)
        return 'Loading...'
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify='center'>
                <Grid className={styles.card} xs={3} md={12} item component={Card}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>World Total Confirmed Cases</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={totals.totalConfirmed}
                                duration={1}
                                separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">{lastUpdated.toDateString()}</Typography>
                    </CardContent>
                </Grid>
                <Grid className={styles.card} xs={3} md={12} item component={Card}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>World Total Confirmed Cases</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={totals.totalConfirmed}
                                duration={1}
                                separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">{lastUpdated.toDateString()}</Typography>
                    </CardContent>
                </Grid>
                <Grid className={styles.card} xs={3} md={12} item component={Card}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>World Total Confirmed Cases</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={totals.totalConfirmed}
                                duration={1}
                                separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">{lastUpdated.toDateString()}</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

Cards.propTypes = {
    totals: PropTypes.object
}
export default Cards