import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // replace '/api' with your actual API base URL
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (file) => {
        let formData = new FormData();
        formData.append('file', file);
        return {
          url: '/upload', // replace '/upload' with your actual upload endpoint
          method: 'POST',
          body: formData,
        };
      },
    }),
    // add other endpoints here
  }),
});

export const { useUploadFileMutation } = apiSlice;
