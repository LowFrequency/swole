export const log = ({ message = null, data = null, show = true, level = log } = {}) => {
    if (!message || !data)
        return "No log";

    switch (level) {
        case 'log':
            if (show) {
                console.log(message);
                console.log({ data });
            }
            break;
        case 'warn':
            if (show) {
                console.warn(message);
                console.warn({ data });
            }
            break;
        case 'error':
            if (show) {
                console.error(message);
                console.error({ data });
            }
            break;
        default:
            if (show) {
                console.log(message);
                console.log({ data });
            }
    }

    return "Log saved";

}
