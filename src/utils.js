/**
 * Transforms the date given in string form 'YYYY-MM-DD'
 * where MM is [1-12], DD is [1-31], YYYY is 4-digits. 
 * Disables Date autocorrect feature.
 * @param {String} dateString 
 * @return {Date} 
 */
export const convertToDate = (dateString) => {
    let [year, month, day] = dateString.split('-')
    year = parseInt(year)
    month = parseInt(month)
    day = parseInt(day)
    if (day < 1 || day > 31 || month < 1 || month > 12 || year.toString().length !== 4) {
        return null
    }
    if (1 <= day <= 31 && 1 <= month <= 12 && year.toString().length === 4) {
        try {
            const date = new Date(year, month - 1, day)
            if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
                return null
            }
            return date
        } catch (e) {
            return null
        }
    }
    return null
}

/**
 * Transforms an array of Date objects to a human readable
 * date in the form `monthName day` (i.e. March 13).
 * @param {Array} dates 
 * @return {Array} 
 */
export const toReadableDates = (dates) => {
    if (!(dates instanceof Array)) return []
    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"]

    return dates.map((date) => {
        const month = date.getMonth()
        const day = date.getDate()
        return `${months[month]} ${day}`
    })
}

/**
 * Calculates the relative number of days between date2 and date1.
 * 
 * @param {Date} date1 
 * @param {Date} date2 
 */
export const getDiffInDays = (date1, date2) => {
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) return null
    const timeDiff = Math.abs(date2 - date1)
    const absDayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    return date2 < date1 ? 0 - absDayDiff : absDayDiff
}

/**
 * Gets a subset of Dates from an array of Dates given a
 * start and end Date assuming the array of dates are in 
 * ascending order and increase stepwise by 1 day.
 * @param {Array<Date>} dates 
 * @param {Date} startDate 
 * @param {Date} endDate 
 */
export const getSubsetDates = (dates, startDate, endDate) => {
    if (dates.length < 0) return []
    const subsetStart = Math.max(getDiffInDays(dates[0], startDate), 0)
    const subsetEnd = Math.min(getDiffInDays(dates[0], endDate) + 1, dates.length)
    return dates.slice(subsetStart, subsetEnd)
}
