
export const addData = async ({ baseUrl = null, accessToken = null, datasource = null, start = null, finish = null } = {}) => {
    try {
        const url = `${baseUrl}dataSources/${datasource}`;
        const body = {
            "dataSourceId": datasource,
            "maxEndTimeNs": finish,
            "minStartTimeNs": start,
            "point": [
                {
                    "dataTypeName": "com.google.activity.segment",
                    "endTimeNanos": finish,
                    "originDataSourceId": "",
                    "startTimeNanos": start,
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

        return Promise.resolve(response.json());

    } catch (err) {
        const error = `add data error: ${err.message}`;
        return Promise.reject(error);
    }
}