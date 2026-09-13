import { apiSlice } from "./apiSlice";
export const paperTrackingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyPaperTracking: builder.query({
      query: () => ({
        url: "/researcher/paper-tracking/my-papers",
        method: "GET",
      }),
      providesTags: ["Manuscript"],
    }),
    getPaperTrackingDetail: builder.query({
      query: (manuscriptId) => ({
        url: `/researcher/paper-tracking/${manuscriptId}`,
        method: "GET",
      }),
      providesTags: (result, error, manuscriptId) => [
        { type: "Manuscript", id: manuscriptId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyPaperTrackingQuery,
  useGetPaperTrackingDetailQuery,
} = paperTrackingApiSlice;