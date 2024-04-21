import { ETypeComment } from '@components/screen/club/types';
import type { TClub, TUser } from '@redux/types';

export type TSubComment = {
  _id: string;
  author: TUser;
  mainComment: string;
  text: string;
  like: number;
  dislike: number;
  commentAuthRole: string;
  answerToUser: TUser;
  usersWhoLiked: Array<string>;
  club: TClub;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TComment = {
  _id: string;
  author: TUser;
  mainComment?: string;
  text: string;
  like: number;
  usersWhoLiked: string[];
  dislike: number;
  subComments: TSubComment[];
  club: TClub;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};
export type TSetAndUnset = {
  commentId: string;
  userId: string;
  typeComment?: ETypeComment;
};
export type PromiseLikeAndUnlike = {
  data: {
    message: string;
    comment: TComment | TSubComment;
  };
  userId: string;
  typeComment: ETypeComment;
};
export type TCommentInitialState = {
  formData: TCommentFormData;
  activeReply: TActiveReply;
  items: Array<TComment>;
  fetch: TRequestStatus;
  create: TRequestStatus;
  delete: TRequestStatus;
  like: TRequestStatus;
};