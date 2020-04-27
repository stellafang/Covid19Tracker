/**
 * Transforms an array of Date objects to a human readable
 * date in the form `monthName day` (i.e. March 13).
 * @param {*} dates 
 * @return {Array} 
 */
export const toReadableDates = (dates) => {
    if (dates.length < 0) return []
    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"]

    return dates.map((date) => {
        const month = date.getMonth()
        const day = date.getDate()
        return `${months[month]} ${day}`
    })
}

/**
 * Calculates the number of days between date2 and date1.
 * @param {Date} date1 
 * @param {Date} date2 
 */
export const getDiffInDays = (date1, date2) => {
    const timeDiff = Math.abs(date2 - date1)
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
}

/**
 * Gets a subset of Dates from an array of Dates given a
 * start and end Date. 
 * @param {*} dates 
 * @param {*} startDate 
 * @param {*} endDate 
 */
export const getSubsetDates = (dates, startDate, endDate) => {
    if (dates.length < 0) return []
    const subsetStart = Math.max(getDiffInDays(dates[0], startDate), 0)
    const subsetEnd = Math.min(getDiffInDays(dates[0], endDate) + 1, dates.length - 1)
    return dates.slice(subsetStart, subsetEnd)
}