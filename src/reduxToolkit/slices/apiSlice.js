import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000",
        credentials: 'include' }),
        tagTypes: ["AllBlogs"],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (formData) => ({
                url: "/auth/register",
                method: "POST",
                body: formData,
              }),    
        }),
        login: builder.mutation({
            query: (formData) => ({
                url: "/auth/login",
                method: "POST",
                body: formData,
              }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
              }),
        }),
        logoutFromAllDevices: builder.mutation({
            query: () => ({
                url: "/auth/logout_from_all_devices",
                method: "POST",
              }),
        }),
        updateProfile: builder.mutation({
          query: ({profileData,username}) =>({
              url: `/auth/edit-profile/${username}`,
              method: "PATCH",
              body: profileData,
        }),
        }),
        uploadImg: builder.mutation({
            query: (formData) => ({
                url: "/upload/file ",
                method: "POST",
                body: formData,
                formData: true,
              }),
        }),
        createBlog: builder.mutation({
            query: (formData) => ({
                url: "/blog/create-blog",
                method: "POST",
                body: formData,
                formData: true,
            })
        }),
        getMyBlogs: builder.query({
            query: () =>({
                url :  "/blog/my-blogs",
                method: "GET"
            }),
            transformResponse: (myBlogs) => myBlogs.data ,
            providesTags:  (result) =>
              result
                ? [
                    ...result.map(({ _id }) => ({ type: 'Blog', id: _id })),
                    "MyBlogs"
                  ]
                : ["MyBlogs"],
           }),
          getAllBlogs: builder.query({
            query: () => "/blog/get-blogs",
            transformResponse: (allBlogs) => allBlogs.data,
            providesTags: (result) =>
              result
                ? [
                    ...result.map(({ _id }) => ({ type: 'Blog', id: _id })),
                    "AllBlogs"
                  ]
                : ["AllBlogs"],
          }),
        likeBlogs: builder.mutation({
            query: ({blogId})=>({
                url: "/blog/like-blog",
                method: "POST",
                body: {blogId} ,
            }),
            invalidateTags:(result, error, { blogId }) => [
              "AllBlogs",
              "MyBlogs",
              { type: 'Blog', id: blogId }
            ],
             async onQueryStarted({blogId,username}, { dispatch, queryFulfilled }) {
              const updates = [
                dispatch(
                  api.util.updateQueryData("getAllBlogs", undefined, (draft) => {
                    updateBlogLike(draft, blogId, username);
                  })
                ),
                dispatch(
                  api.util.updateQueryData("getMyBlogs", undefined, (draft) => {
                    updateBlogLike(draft, blogId, username);
                  })
                )
              ];
        
                try {
                  await queryFulfilled;
                } catch {
                  updates.forEach(update => update.undo());
                }
              },
        }),
        updateBlog: builder.mutation({
          query: ({data,blogId}) => ({
            url:`/blog/edit-blog/${blogId}`,
            method: "PUT",
            body: data,
          }),
          invalidatesTags:["AllBlogs"]
        }),
        deleteBlog: builder.mutation({
          query: (blogId) => ({
            url: `/blog/delete-blog/${blogId}`,
            method: "DELETE",
          }),
          invalidatesTags: (result, error, blogId) => [
            { type: 'Blog', id: blogId },
            "MyBlogs"
          ],
          async onQueryStarted(blogId, { dispatch, queryFulfilled }) {
            const patchResult = dispatch(
              api.util.updateQueryData("getMyBlogs", undefined, (draft) => {
                const blogIndex = draft.findIndex((blog) => blog._id === blogId);
                if (blogIndex !== -1) {
                  draft.splice(blogIndex, 1);
                }
              })
            );
        
            try {
              await queryFulfilled;
            } catch {
              patchResult.undo();
            }
          }
        }),
        getUserData: builder.query({
            query: () => ({
                url: "/auth/user",
                method: "GET",
              }),
        }),
        getFollowingList: builder.query({
            query: () => ({
                url:"/follow/following",
                method: "GET"
            })
        }),
        getFollowerList: builder.query({
            query: () => ({
                url:"/follow/follower",
                method:"GET"
            })
        }),


    })
})

function updateBlogLike(draft, blogId, username) {
  const blog = draft.find((blog) => blog._id === blogId);
  console.log("username:",username)
  if (blog) {
    const userLiked = blog.likedBy?.includes(username);
     if (userLiked) {
      blog.likesCount = Math.max(0, blog.likesCount - 1);
      blog.likedBy = blog.likedBy.filter(user => user !== username);
    } else {
      blog.likesCount += 1;
      blog.likedBy = [...(blog.likedBy || []), username];
    }
  }
}

export const {useRegisterMutation, useLoginMutation, useLogoutMutation, useLogoutFromAllDevicesMutation,useUploadImgMutation,useCreateBlogMutation,useGetMyBlogsQuery,useGetAllBlogsQuery,useLikeBlogsMutation,useUpdateBlogMutation,useDeleteBlogMutation,useGetFollowingListQuery,useGetFollowerListQuery,useUpdateProfileMutation} = api