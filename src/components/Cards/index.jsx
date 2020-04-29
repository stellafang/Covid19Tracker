import React from 'react'
import PropTypes from 'prop-types'

import {Card, CardContent, Typography, Grid} from '@material-ui/core'
import SkeletonBlock from '../../components/SkeletonBlock'
import CountUp from 'react-countup'
import styles from './index.module.css'

const Cards = (props) => {
    const {totals} = props
    const {totalConfirmed, totalDeaths, totalRecovered} = totals || {}
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify={'center'}>
                <Grid className={styles.card} xs={12} md={3} item component={Card}>
                    {totals ? <CardContent>
                        <Typography color="textSecondary" gutterBottom>World Total Confirmed Cases</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={totalConfirmed}
                                duration={1}
                                separator=","
                            />
                        </Typography>
                    </CardContent> : <SkeletonBlock height={'130px'} width={'200px'} />}
                </Grid>
                <Grid className={styles.card} xs={12} md={3} item component={Card}>
                    {totals ? <CardContent>
                        <Typography color="textSecondary" gutterBottom>World Total Deaths</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={totalDeaths}
                                duration={1}
                                separator=","
                            />
                        </Typography>
                    </CardContent> : <SkeletonBlock height={'130px'} width={'200px'} />}
                </Grid>
                <Grid className={styles.card} xs={12} md={3} item component={Card}>
                    {totals ? <CardContent>
                        <Typography color="textSecondary" gutterBottom>World Total Recovered</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={totalRecovered}
                                duration={1}
                                separator=","
                            />
                        </Typography>
                    </CardContent> : <SkeletonBlock height={'130px'} width={'200px'} />}
                </Grid>
            </Grid>
        </div>
    )
}

Cards.propTypes = {
    totals: PropTypes.object
}
export default Cards