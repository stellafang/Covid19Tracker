import {convertToDate, toReadableDates, getDiffInDays, getSubsetDates} from './utils'

describe('convertToDate', () => {
    test('YYYY-MM-DD converts to correct Date', () => {
        const date = convertToDate('2020-01-02')
        expect(date.getMonth()).toEqual(0) // month is [0-11]
        expect(date.getDate()).toEqual(2)
        expect(date.getFullYear()).toEqual(2020)
    })
    test('Given MM in YYYY-MM-DD is between 1 and 12', () => {
        expect(convertToDate('2020-00-02')).toBeNull()
        expect(convertToDate('2020-13-02')).toBeNull()
        expect(convertToDate('2020-01-02')).not.toBeNull()
        expect(convertToDate('2020-12-02')).not.toBeNull()
    })
    test('Given DD in YYYY-MM-DD is between 1 and 31', () => {
        expect(convertToDate('2020-10-00')).toBeNull()
        expect(convertToDate('2020-10-32')).toBeNull()
        expect(convertToDate('2020-10-01')).not.toBeNull()
        expect(convertToDate('2020-10-31')).not.toBeNull()
    })
    test('Given YYYY in YYYY-MM-DD should be 4 digits', () => {
        expect(convertToDate('0202-10-00')).toBeNull()
        expect(convertToDate('20-10-32')).toBeNull()
        expect(convertToDate('2020-10-01')).not.toBeNull()
        expect(convertToDate('2020-10-31')).not.toBeNull()
    })
    test('Other out of range dates not autocorrected', () => {
        expect(convertToDate('1999-02-30')).toBeNull()
        expect(convertToDate('2000-04-31')).toBeNull()
    })
})


describe('toReadableDates', () => {
    test('Returns empty array if array not provided', () => {
        expect(toReadableDates('2020-01-02')).toEqual([])
        expect(toReadableDates(new Date(2020, 1, 2))).toEqual([])
    })
    test('Returns each Date as human readable string "{month} {day}"', () => {
        expect(toReadableDates([new Date(2020, 3, 11)])).toEqual(['April 11'])
        expect(toReadableDates([new Date(1992, 1, 15)])).toEqual(['February 15'])
    })
})

describe('getDiffInDays', () => {
    test('Gets correct number of days difference', () => {
        expect(getDiffInDays(new Date(2020, 1, 2), new Date(2020, 1, 2))).toEqual(0)
        expect(getDiffInDays(new Date(2020, 1, 2), new Date(2020, 1, 4))).toEqual(2)
    })
    test('Returns a negative difference if date2 is less than date1', () => {
        expect(getDiffInDays(new Date(2020, 1, 4), new Date(2020, 1, 2))).toEqual(-2)
    })
    test('Returns null if inputs are not Date objects', () => {
        expect(getDiffInDays('2020-01-02', new Date(2020, 1, 2))).toBeNull()
        expect(getDiffInDays(new Date(2020, 1, 2), '2020-01-02')).toBeNull()
    })
})

describe('getSubsetDates', () => {
    const date1 = new Date(2020, 1, 2)
    const date2 = new Date(2020, 1, 3)
    const date3 = new Date(2020, 1, 4)
    const date4 = new Date(2020, 1, 5)
    const dates = [date1, date2, date3, date4]
    test('Gets correct subset for dates within the range', () => {
        expect(getSubsetDates(dates, date1, date2)).toEqual([date1, date2])
        expect(getSubsetDates(dates, date2, date4)).toEqual([date2, date3, date4])
        expect(getSubsetDates(dates, date2, date3)).toEqual([date2, date3])
        expect(getSubsetDates(dates, date1, date4)).toEqual([date1, date2, date3, date4])
    })
    test('Allows start date and end date to be outside subset range', () => {
        expect(getSubsetDates(dates, new Date(2020, 1, 2), date4)).toEqual([date1, date2, date3, date4])
        expect(getSubsetDates(dates, date3, new Date(2020, 1, 6))).toEqual([date3, date4])
        expect(getSubsetDates(dates, new Date(2020, 1, 1), new Date(2020, 1, 6))).toEqual([date1, date2, date3, date4])
    })
})
