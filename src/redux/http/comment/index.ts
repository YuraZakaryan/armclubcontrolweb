import { ETypeComment, TComment, TCommentFormData, TSubComment } from '@components/screen/club/types';
import { $authHost } from '@redux/http';
import { IRequestBody } from '@redux/types';
import { PromiseLikeAndUnlike, TSetAndUnset } from '@redux/types/comment';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleAxiosError } from '@utils/request-error-handler';
import { AxiosError } from 'axios';

export const commentFetchThunk = createAsyncThunk('fetch/comment', async (clubId: string, { rejectWithValue }) => {
  try {
    const { data } = await $authHost.get<TComment[]>(`/club/comment/by-club/${clubId}`);
    console.log(clubId);
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(handleAxiosError(error));
  }
});
export const commentCreateThunk = createAsyncThunk(
  'create/comment',
  async ({ id: userId, body }: IRequestBody<TCommentFormData>, { rejectWithValue }) => {
    try {
      const { data } = await $authHost.post<TComment>(`/club/comment`, {
        ...body,
        author: userId,
      });
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);
export const commentDeleteThunk = createAsyncThunk('delete/comment', async (_id: string, { rejectWithValue }) => {
  try {
    const { data } = await $authHost.delete<TComment | TSubComment>(`/club/comment/${_id}`);
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(handleAxiosError(error));
  }
});

export const subCommentCreateThunk = createAsyncThunk(
  'create/subComment',
  async ({ id: userId, body }: IRequestBody<TCommentFormData>, { rejectWithValue }) => {
    try {
      const { data } = await $authHost.post<TSubComment>('/club/comment/sub', {
        ...body,
        author: userId,
      });
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);
export const subCommentDeleteThunk = createAsyncThunk('delete/subComment', async (_id: string, { rejectWithValue }) => {
  try {
    const { data } = await $authHost.delete<TSubComment | TComment>(`/club/comment/sub/${_id}`);
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(handleAxiosError(error));
  }
});

export const addAndUnsetLikeToCommentThunk = createAsyncThunk(
  'setAndUnset/comment',
  async ({ commentId, typeComment, userId }: TSetAndUnset, { rejectWithValue }) => {
    try {
      const { data } = await $authHost.put(
        `/club/comment/like/${typeComment === ETypeComment.SUB ? 'sub/' + commentId : commentId}`,
      );
      return { data, userId, typeComment } as PromiseLikeAndUnlike;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);
