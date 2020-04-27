import React, {useState, useEffect} from 'react'
import {fetchData} from '../../api'
import {CountryColorPicker} from '../../components'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'

const Settings = () => {
    const [data, setData] = useState({})
    const getData = async () => {
        const res = await fetchData()
        setData(res)
    }
    useEffect(() => {
        getData()
    }, [])

    // TODO: split up the Country Color Picker into it's separate components in the settings page??
    // TODO: maintain a list of countries to their color
    return (
        <div>
            <h1>Settings Page!</h1>
            <CountryColorPicker countries={data.countries} />
            <Button component={Link} to='/' variant='contained' color='primary'>
                Back To Main Page
            </Button>
        </div>)
}

export default Settings