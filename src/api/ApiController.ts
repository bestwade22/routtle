import axios, { AxiosRequestConfig } from 'axios';

class ApiController {
  private static instance: ApiController;
  private authToken: string | null = null;

  private constructor() {
    // Private constructor to prevent external instantiation
    (axios as any).interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: any) => {
        // Handle other errors here
        return Promise.reject(error);
      }
    );
  }

  static getInstance(): ApiController {
    if (!ApiController.instance) {
      ApiController.instance = new ApiController();
    }
    return ApiController.instance;
  }

  setAuthToken(authToken: string): void {
    this.authToken = authToken;
  }

  async fetchData({
    path = '',
    payload = {},
    method = 'POST',
    axiosConfigParams = {},
    headers = {
      'Content-Type': 'application/json',
    },
  }): Promise<any> {
    const axiosConfig: AxiosRequestConfig = {
      url: path,
      method: method, // Example HTTP method
      headers: headers,
      withCredentials: true,
      ...(method === 'POST' && { data: payload }), // Include the payload in the request body
      ...axiosConfigParams, // Include params
    };
    const response = await axios.request(axiosConfig);
    return response.data;

    // return response.json();
  }
}

export default ApiController;
