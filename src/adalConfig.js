import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
    tenant: 'fbc493a8-0d24-4454-a815-f4ca58e8c09d',
    clientId: '43bcdbfc-7515-45d0-af94-056787c97c87',
    endpoints: {
        api: 'b34dc442-bfcb-442d-b5cd-892826c49171',
    },
    cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
    adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);
