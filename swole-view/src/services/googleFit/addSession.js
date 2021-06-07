
export const addSession = async ({ baseUrl = null, id = null, accessToken = null, start = null, finish = null, title = null } = {}) => {
    try {
        const activeTime = finish - start;
        const url = `${baseUrl}sessions/${id}`;
        const body = {
            "id": id,
            "name": `Swole: ${title}`,
            "description": "",
            "startTimeMillis": start,
            "endTimeMillis": finish,
            "application": {
                "detailsUrl": "http://swole.lowfrequency.co.nz",
                "name": "Swole",
                "version": "1.0"
            },
            "activityType": 114,
            "activeTimeMillis": activeTime
        };

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${accessToken}`,
            },
            body: JSON.stringify(body)
        });

        const responseJson = response.json();
        if (responseJson.error) {
            const error = `add session error: ${responseJson.error}`;
            return Promise.reject(error);
        }

        return Promise.resolve(responseJson);

    } catch (err) {
        const error = `add session error: ${err.message}`;
        return Promise.reject(error);
    }
}