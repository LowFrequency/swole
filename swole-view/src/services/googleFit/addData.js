
export const addData = async ({ baseUrl = null, accessToken = null, datasource = null, start = null, finish = null } = {}) => {
    try {

        const url = `${baseUrl}dataSources/${datasource}/datasets/${start * 1000000}-${finish * 1000000}`;
        const body = {
            "dataSourceId": datasource,
            "maxEndTimeNs": finish * 1000000,
            "minStartTimeNs": start * 1000000,
            "point": [
                {
                    "dataTypeName": "com.google.activity.segment",
                    "endTimeNanos": finish * 1000000,
                    "startTimeNanos": start * 1000000,
                    "value": [
                        {
                            "intVal": 114
                        }
                    ]
                }
            ]
        };

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${accessToken}`,
            },
            body: JSON.stringify(body)
        });

        const responseJson = response.json();
        if (responseJson.error) {
            const error = `add data error: ${responseJson.error}`;
            return Promise.reject(error);
        }

        return Promise.resolve(responseJson);

    } catch (err) {
        const error = `add data error: ${err.message}`;
        return Promise.reject(error);
    }
}