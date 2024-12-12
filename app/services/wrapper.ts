export interface FetchOptions extends RequestInit {
  headers?: {
    [key: string]: string;
  };
  token?: string;
  isFormData?: boolean;
}

export interface FetchResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export async function fetchWrapper<T>(
  url: string,
  options: FetchOptions = {},
): Promise<FetchResponse<T>> {
  try {
    const headers: { [key: string]: string } = {
      ...options.headers,
    };

    if (!options.isFormData) {
      headers['Content-Type'] = 'application/json';
    } else {
      headers['Content-Type'] = 'multipart/form-data';
    }

    if (options.token) {
      headers['Authorization'] = `Bearer ${options.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const contentType = response.headers.get('Content-Type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      return {
        error: data.msg || 'An error occurred',
      };
    }

    return {
      data: data.data,
      message: data.msg,
    };
  } catch (error: any) {
    console.log(`Aqui error`, error);
    return {
      error: error.message || 'Network error',
    };
  }
}
