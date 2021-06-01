
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

        return Promise.resolve(response.json());

    } catch (err) {
        const error = `get Data Source error: ${err.message}`;
        return Promise.reject(error);
    }
}