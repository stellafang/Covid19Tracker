import {getDates, getCountries, getWorldTotals, getConfirmedByCountry, getCountryTotalsInDateRange} from './api'
const mockResponse = {
    "Afghanistan": [
        {
            "date": "2020-1-22",
            "confirmed": 0,
            "deaths": 0,
            "recovered": 0
        },
        {
            "date": "2020-1-23",
            "confirmed": 5,
            "deaths": 3,
            "recovered": 3
        },
        {
            "date": "2020-1-24",
            "confirmed": 10,
            "deaths": 3,
            "recovered": 4
        },
        {
            "date": "2020-1-25",
            "confirmed": 20,
            "deaths": 3,
            "recovered": 6
        }
    ],
    "Canada": [
        {
            "date": "2020-1-22",
            "confirmed": 3,
            "deaths": 0,
            "recovered": 0
        },
        {
            "date": "2020-1-23",
            "confirmed": 10,
            "deaths": 1,
            "recovered": 0
        },
        {
            "date": "2020-1-24",
            "confirmed": 15,
            "deaths": 3,
            "recovered": 4
        },
        {
            "date": "2020-1-25",
            "confirmed": 30,
            "deaths": 3,
            "recovered": 8
        }
    ],
    "China": [
        {
            "date": "2020-1-22",
            "confirmed": 5,
            "deaths": 4,
            "recovered": 0
        },
        {
            "date": "2020-1-23",
            "confirmed": 14,
            "deaths": 5,
            "recovered": 8
        },
        {
            "date": "2020-1-24",
            "confirmed": 20,
            "deaths": 10,
            "recovered": 13
        },
        {
            "date": "2020-1-25",
            "confirmed": 23,
            "deaths": 15,
            "recovered": 19
        }
    ]
}

describe('API', () => {
    const expectedDates = [new Date(2020, 0, 22), new Date(2020, 0, 23), new Date(2020, 0, 24), new Date(2020, 0, 25)]
    test('getDates', async () => {
        const dates = await getDates(mockResponse)
        expect(dates).toEqual(expectedDates)
    })

    test('getCountries', async () => {
        const countries = await getCountries(mockResponse)
        expect(countries).toEqual(['Afghanistan', 'Canada', 'China'])
    })

    test('getWorldTotals', async () => {
        const totals = await getWorldTotals(mockResponse)
        expect(totals).toEqual({
            totalConfirmed: 73,
            totalDeaths: 21,
            totalRecovered: 33
        })
    })

    test('getConfirmedByCountry', async () => {
        const confirmedByCountry = await getConfirmedByCountry(mockResponse)
        expect(confirmedByCountry).toEqual({
            "Afghanistan": [0, 5, 10, 20],
            "Canada": [3, 10, 15, 30],
            "China": [5, 14, 20, 23]
        })
    })

    test('getCountryTotalsInDateRange', () => {
        const totals = getCountryTotalsInDateRange(mockResponse, expectedDates, new Date(2020, 0, 24), new Date(2020, 0, 25))
        expect(totals).toEqual([{
            country: "Afghanistan",
            totalConfirmed: 15,
            totalDeaths: 0,
            totalRecovered: 3
        }, {
            country: "Canada",
            totalConfirmed: 20,
            totalDeaths: 2,
            totalRecovered: 8
        }, {
            country: "China",
            totalConfirmed: 9,
            totalDeaths: 10,
            totalRecovered: 11
        }])
    })
}) 