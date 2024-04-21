import { ETypeComment, TComment, TCommentFormData, TSubComment } from '@components/screen/club/types';
import {
  addAndUnsetLikeToCommentThunk,
  commentCreateThunk,
  commentDeleteThunk,
  commentFetchThunk,
  subCommentCreateThunk,
  subCommentDeleteThunk,
} from '@redux/http';
import { PromiseLikeAndUnlike, TCommentInitialState } from '@redux/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TCommentInitialState = {
  formData: {
    mainComment: '',
    replyToComment: '',
    text: '',
    answerToUser: '',
    club: '',
  },
  activeReply: {
    status: false,
    name: '',
  },
  items: [],
  fetch: {
    isLoading: null,
    isError: false,
  },
  create: {
    isLoading: false,
    isError: false,
  },
  delete: {
    isLoading: false,
    isError: false,
  },
  like: {
    isLoading: false,
    isError: false,
  },
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setActiveReply(state: TCommentInitialState, action: PayloadAction<string>): void {
      state.activeReply.status = true;
      state.activeReply.name = action.payload;
    },
    deactivateReply(state: TCommentInitialState): void {
      state.activeReply.status = false;
      state.activeReply.name = '';
    },
    setClubCommentForm(state: TCommentInitialState, action: PayloadAction<string>) {
      state.formData = {
        ...state.formData,
        club: action.payload,
      };
    },
    setAnswerComment: (state: TCommentInitialState, action: PayloadAction<TCommentFormData>): void => {
      const { mainComment, replyToComment, answerToUser, club } = action.payload;
      state.formData = {
        mainComment,
        replyToComment,
        answerToUser,
        club,
        text: '',
      };
    },
    changeFormText: (state, action: PayloadAction<{ name: string; value: string }>) => {
      const { value, name } = action.payload;
      state.formData = {
        ...state.formData,
        [name]: value,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        commentFetchThunk.fulfilled,
        (state: TCommentInitialState, action: PayloadAction<Array<TComment>>): void => {
          state.items = action.payload;
          state.fetch.isLoading = false;
          state.fetch.isError = false;
        },
      )
      .addCase(commentFetchThunk.pending, (state: TCommentInitialState): void => {
        state.fetch.isLoading = true;
        state.fetch.isError = false;
      })
      .addCase(commentFetchThunk.rejected, (state: TCommentInitialState): void => {
        state.fetch.isLoading = false;
        state.fetch.isError = true;
      })
      .addCase(commentCreateThunk.fulfilled, (state: TCommentInitialState, action: PayloadAction<TComment>): void => {
        state.items.unshift(action.payload);
        state.create.isError = false;
        state.create.isLoading = false;
        state.formData = initialState.formData;
      })
      .addCase(commentCreateThunk.pending, (state: TCommentInitialState): void => {
        state.create.isLoading = true;
        state.create.isError = false;
      })
      .addCase(commentCreateThunk.rejected, (state: TCommentInitialState): void => {
        state.create.isError = true;
        state.create.isLoading = false;
      })
      .addCase(
        commentDeleteThunk.fulfilled,
        (state: TCommentInitialState, action: PayloadAction<TComment | TSubComment>): void => {
          const deletedCommentId: string = action.payload._id;

          state.items = state.items.filter((comment: TComment): boolean => comment._id !== deletedCommentId);
          state.delete.isError = false;
          state.delete.isLoading = false;
        },
      )
      .addCase(commentDeleteThunk.pending, (state: TCommentInitialState): void => {
        state.delete.isLoading = true;
        state.delete.isError = false;
      })
      .addCase(commentDeleteThunk.rejected, (state: TCommentInitialState): void => {
        state.delete.isError = true;
        state.delete.isLoading = false;
      })
      .addCase(
        subCommentCreateThunk.fulfilled,
        (state: TCommentInitialState, action: PayloadAction<TSubComment>): void => {
          const { mainComment } = action.payload;

          const commentIndex: number = state.items.findIndex(
            (comment: TComment): boolean => comment._id === mainComment,
          );
          if (commentIndex !== -1) {
            state.items[commentIndex].subComments.push(action.payload);
          }
          state.create.isError = false;
          state.create.isLoading = false;
          state.formData = initialState.formData;
          state.activeReply = initialState.activeReply;
        },
      )
      .addCase(subCommentCreateThunk.pending, (state: TCommentInitialState): void => {
        state.create.isLoading = true;
        state.create.isError = false;
      })
      .addCase(subCommentCreateThunk.rejected, (state: TCommentInitialState): void => {
        state.create.isError = true;
        state.create.isLoading = false;
      })
      .addCase(
        subCommentDeleteThunk.fulfilled,
        (state: TCommentInitialState, action: PayloadAction<TSubComment | TComment>): void => {
          const deletedCommentId: string = action.payload._id;

          state.items = state.items.map((item) => {
            if (item.subComments) {
              item.subComments = item.subComments.filter(
                (subComment: TSubComment): boolean => subComment._id !== deletedCommentId,
              );
            }
            return item;
          });

          state.delete.isError = false;
          state.delete.isLoading = false;
        },
      )
      .addCase(subCommentDeleteThunk.pending, (state: TCommentInitialState): void => {
        state.delete.isLoading = true;
        state.delete.isError = false;
      })
      .addCase(subCommentDeleteThunk.rejected, (state: TCommentInitialState): void => {
        state.delete.isError = true;
        state.delete.isLoading = false;
      })
      .addCase(
        addAndUnsetLikeToCommentThunk.fulfilled,
        (state: TCommentInitialState, action: PayloadAction<PromiseLikeAndUnlike>): void => {
          const { userId, data, typeComment } = action.payload;
          const { comment } = data;

          const updateCommentLike = (targetComment: TComment | TSubComment): void => {
            const isLiked = comment.usersWhoLiked.includes(userId);
            targetComment.like = isLiked ? targetComment.like + 1 : targetComment.like - 1;
            if (comment.usersWhoLiked) {
              targetComment.usersWhoLiked = comment.usersWhoLiked;
            }
          };

          const findCommentIndex = (commentId: string): number => {
            return state.items.findIndex((item) => item._id === commentId);
          };

          if (typeComment === ETypeComment.SUB) {
            const subCommentIndex = findCommentIndex(comment.mainComment as string);
            const subComment = state.items[subCommentIndex]?.subComments.find((sub) => sub._id === comment._id);
            if (subComment) {
              updateCommentLike(subComment);
            }
          } else {
            const commentIndex = findCommentIndex(comment._id);
            const targetComment = state.items[commentIndex];
            if (targetComment) {
              updateCommentLike(targetComment);
            }
          }

          state.like.isLoading = false;
          state.like.isError = false;
        },
      )

      .addCase(addAndUnsetLikeToCommentThunk.pending, (state: TCommentInitialState): void => {
        state.like.isLoading = true;
        state.like.isError = false;
      })
      .addCase(addAndUnsetLikeToCommentThunk.rejected, (state: TCommentInitialState): void => {
        state.like.isError = true;
        state.like.isLoading = false;
      });
  },
});
export const commentReducer = commentSlice.reducer;
export const { setActiveReply, deactivateReply, setAnswerComment, changeFormText, setClubCommentForm } =
  commentSlice.actions;
