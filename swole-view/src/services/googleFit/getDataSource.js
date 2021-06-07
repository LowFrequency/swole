
export const getDataSource = async ({ baseUrl = null, accessToken = null } = {}) => {
    try {
        const url = `${baseUrl}dataSources`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${accessToken}`,
            }
        });

        const responseJson = response.json();
        if (responseJson.error) {
            const error = `get Data Source error: ${responseJson.error}`;
            return Promise.reject(error);
        }

        return Promise.resolve(responseJson);

    } catch (err) {
        const error = `get Data Source error: ${err.message}`;
        return Promise.reject(error);
    }
}