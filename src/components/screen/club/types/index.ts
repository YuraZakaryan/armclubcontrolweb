import { TClub, TUser } from '@redux/types';
import { AsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, TClassName } from '@types';

export interface IHeaderClub {
  title: string;
  views: number;
}
export type TSelectOption = {
  label: string;
  value: string;
};
export enum ETypeComment {
  SUB = 'sub',
}
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
export interface IClubComments {
  clubId: string;
  comments: Array<TComment>;
}
export type TComment = {
  _id: string;
  author: TUser;
  mainComment?: string;
  text: string;
  like: number;
  usersWhoLiked: Array<string>;
  dislike: number;
  subComments: Array<TSubComment>;
  club: TClub;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};
export type TPageClickData = {
  selected: number;
};
export interface IConditionsDialog {
  openConditionDialog: boolean;
  setOpenConditionDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
export type TCommentFormData = {
  mainComment: string;
  replyToComment: string;
  text?: string;
  answerToUser: string;
  club: string;
};
export interface IComment extends TClassName {
  _id: string;
  typeComment?: ETypeComment;
  role: string;
  commentAuthRole: string;
  authorId: string;
  answerToUser?: TUser;
  deleteComment: AsyncThunk<TComment | TSubComment, string, AsyncThunkConfig>;
  currentUserId: string;
  mainCommentId: string;
  firstName: string;
  lastName: string;
  club: TClub;
  text: string;
  like: number;
  usersWhoLiked: Array<string>;
  handleSetAnswer: (mainComment: string, replyToComment: string, answerToUser: string, name: string) => void;
  createdAt: string;
}
export interface IDeleteCommentButton extends TClassName {
  _id: string;
  checkAccess: boolean;
  deleteOneComment: (_id: string) => void;
  setDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  deleteDialog: boolean;
}