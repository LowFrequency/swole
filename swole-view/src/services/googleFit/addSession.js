
export const addSession = async ({ baseUrl = null, id = null, accessToken = null, start = null, finish = null, title = null } = {}) => {
    try {
        const url = `${baseUrl}sessions/${id}`;
        const body = {
            "id": id,
            "name": `Swole: ${title}`,
            "description": "",
            "startTimeMillis": start,
            "endTimeMillis": finish,
            "version": 1,
            "lastModifiedToken": "exampleToken",
            "application": {
                "detailsUrl": "http://swole.lowfrequency.co.nz",
                "name": "Swole",
                "version": "1.0"
            },
            "activityType": 114
        };

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${accessToken}`,
            },
            body: JSON.stringify(body)
        });

        return Promise.resolve(response.json());

    } catch (err) {
        const error = `add session error: ${err.message}`;
        return Promise.reject(error);
    }
}