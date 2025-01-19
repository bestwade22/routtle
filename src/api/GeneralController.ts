import ApiController from './ApiController';

const GeneralApi = async (payload: any, apiPath: string): Promise<any> => {
  const apiInstance = ApiController.getInstance();
  try {
    const response = await apiInstance.fetchData({
      path: apiPath,
      payload: payload,
    });
    if (response.errCode === '0' || !response.errCode) {
      return { result: 'Success', data: response };
    }
    return { result: 'Error', error: response };
  } catch (error: any) {
    // Handle login error
    return { result: 'Fetch Fail', error };
  }
};

export default GeneralApi;
