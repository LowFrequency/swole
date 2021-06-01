
export const addDataSource = async ({ baseUrl = null, accessToken = null } = {}) => {
    try {
        const url = `${baseUrl}dataSources`;
        const body = {
            "dataStreamName": "Swole",
            "name": "Swole App",
            "type": "derived",
            "application": {
                "detailsUrl": "swole.lowfrequency.co.nz",
                "name": "Swole App",
                "version": "1"
            },
            "dataType": {
                "name": "com.google.activity.segment"
            }
        };

        const response = await fetch(url, {
            method: 'POST',
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