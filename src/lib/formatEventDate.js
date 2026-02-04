/**
 * Formats a date string in English
 * @param {string} isoString - The ISO date string to format
 * @param {('full'|'short'|'time')} [format='full'] - The format type to use
 * @param {boolean} [isJakartaTime=false] - Whether the input is already in Jakarta time
 * @returns {string} The formatted date string in English
 *
 * @example
 * // returns "Monday, January 1, 2024"
 * formatEventDate("2024-01-01T00:00:00.000Z", "full")
 *
 * // returns "January 1, 2024"
 * formatEventDate("2024-01-01T00:00:00.000Z", "short")
 *
 * // returns "00:00"
 * formatEventDate("2024-01-01T00:00:00.000Z", "time")
 */
export const formatEventDate = (isoString, format = 'full', isJakartaTime = false) => {
    let date = new Date(isoString);

    // If the timestamp is already in Jakarta time (from API), we need to adjust it
    // because JavaScript Date constructor assumes UTC for ISO strings
    if (isJakartaTime && isoString && !isoString.endsWith('Z')) {
        // Add 'Z' to treat it as UTC, then it will be converted correctly to Jakarta time
        date = new Date(isoString + 'Z');
    }

    const formats = {
        full: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Jakarta'
        },
        short: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Jakarta'
        },
        time: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Jakarta'
        }
    };

    let formatted = date.toLocaleDateString('en-US', formats[format]);

    // Handle time format separately
    if (format === 'time') {
        return date.toLocaleTimeString('en-US', formats[format]);
    }

    return formatted;
};