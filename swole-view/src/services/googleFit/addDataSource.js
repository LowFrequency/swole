
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

        const responseJson = response.json();
        if (responseJson.error) {
            const error = `add data source error: ${responseJson.error}`;
            return Promise.reject(error);
        }

        return Promise.resolve(responseJson);

    } catch (err) {
        const error = `add data source error: ${err.message}`;
        return Promise.reject(error);
    }
}