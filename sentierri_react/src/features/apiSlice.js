import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../config';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}` }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation({          
      query: (file) => {
        let formData = new FormData();
        formData.append('filePath', file.path);
        formData.append('originalname', file.name);
        return {
          url: '/upload',
          method: 'POST',
          body: formData,
        };
      },
    }),
    // add other endpoints here
  }),
});

export const { useUploadFileMutation } = apiSlice;
