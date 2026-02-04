export const formatEventDate = (isoString, format = 'full', isJakartaTime = false) => {
    let date = new Date(isoString);

    if (isJakartaTime && isoString && !isoString.endsWith('Z')) {
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

    if (format === 'time') {
        return date.toLocaleTimeString('en-US', formats[format]);
    }

    return formatted;
};
