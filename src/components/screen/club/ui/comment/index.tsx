import { IComment } from '@components/screen/club/types';
import { DeleteCommentButton } from '@components/screen/club/ui';
import { Avatar, AvatarFallback } from '@components/shadcn/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/shadcn/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@components/shadcn/ui/popover';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { addAndUnsetLikeToCommentThunk } from '@redux/http';
import { formatDate } from '@utils/club';
import cn from 'classnames';
import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import { BiWinkSmile } from 'react-icons/bi';
import { GoKebabHorizontal } from 'react-icons/go';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const Comment: React.FC<IComment> = React.memo((props) => {
  const {
    _id,
    typeComment,
    role,
    commentAuthRole,
    club,
    authorId,
    usersWhoLiked,
    deleteComment,
    currentUserId,
    mainCommentId,
    lastName,
    firstName,
    text,
    like,
    createdAt,
    className,
    answerToUser,
    handleSetAnswer,
  } = props;

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);

  const deleteOneComment = (_id: string): void => {
    dispatch(deleteComment(_id));
  };
  const handleLike = async (): Promise<void> => {
    await dispatch(addAndUnsetLikeToCommentThunk({ commentId: _id, typeComment, userId: user?._id as string }));
  };

  const isLike: boolean = usersWhoLiked.includes(currentUserId) ?? false;

  const checkAccess: boolean = role === 'ADMIN' || currentUserId === authorId;
  const checkClubUserRole = {
    admin: commentAuthRole === 'ADMIN' || commentAuthRole === 'MODERATOR' || false,
    clubOwner: club.author?._id === authorId || false,
  };
  const name = `${
    checkClubUserRole.admin
      ? 'ԿԱՅՔԻ ԱԴՄԻՆԻՍՏՐԱՑԻԱ'
      : checkClubUserRole.clubOwner
        ? 'ԱԿՈՒՄԲԻ ԱԴՄԻՆԻՍՏՐԱՑԻԱ'
        : firstName + ' ' + lastName
  }`;

  const firstLastNameAvatar: string = `${
    checkClubUserRole.admin
      ? 'Կ Ա'
      : checkClubUserRole.clubOwner
        ? 'Ա Ա'
        : `${firstName.slice(0, 1).toUpperCase()}  ${lastName.slice(0, 1).toUpperCase()}`
  }`;

  const nameAnswerToUser: string = `${
    answerToUser?._id === club.author._id
      ? 'ԱԿՈՒՄԲԻ ԱԴՄԻՆԻՍՏՐԱՑԻԱ'
      : answerToUser?.role === 'ADMIN' || answerToUser?.role === 'MODERATOR'
        ? 'ԱԿՈՒՄԲԻ ԱԴՄԻՆԻՍՏՐԱՑԻԱ'
        : answerToUser?.name
  }`;

  return (
    <div
      className={cn(
        'flex rounded bg-primary p-2 tablet-min:p-5',
        className,
        checkClubUserRole.admin
          ? 'border-l-4 border-dotted border-red-600'
          : checkClubUserRole.clubOwner
            ? 'border-l-4 border-dotted border-yellow-600'
            : null,
      )}
    >
      <section>
        <Avatar className={'h-8 w-8 text-[12px]'}>
          <AvatarFallback
            className={cn(
              `bg-gray-400 text-black`,
              checkClubUserRole.admin ? 'bg-red-800 text-text' : checkClubUserRole.clubOwner ? 'bg-yellow-600' : null,
            )}
          >
            {firstLastNameAvatar}
          </AvatarFallback>
        </Avatar>
      </section>
      <section className={'ml-2 flex w-full flex-col text-sm'}>
        <div className={'flex items-center justify-between'}>
          <div className={'flex items-center gap-1'}>
            <div className={'flex items-center'}>
              <h3
                className={cn(
                  'text-[10px] font-bold mobile-min:text-[12px]',
                  checkClubUserRole.admin ? 'text-red-600' : checkClubUserRole.clubOwner ? 'text-yellow-600' : null,
                )}
              >
                {name}
              </h3>
              <span className={'mobile-max:hidden'}>,</span>
            </div>
            <u className={'text-secondary text-[12px] mobile-min:hidden'}>{formatDate(createdAt).date}</u>
            <small className={'tablet-max:hidden'}>
              մեկնաբանությունը թողնվել է <u className={'text-secondary'}>{formatDate(createdAt).dateWithTime}</u>
            </small>
          </div>
          <div className={'flex items-center gap-2 tablet-min:hidden'}>
            {checkAccess ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <GoKebabHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <DeleteCommentButton
                      _id={_id}
                      deleteOneComment={deleteOneComment}
                      checkAccess={checkAccess}
                      setDeleteDialog={setDeleteDialog}
                      deleteDialog={deleteDialog}
                    >
                      Ջնջել
                    </DeleteCommentButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
            <button>
              <MdOutlineReportGmailerrorred size={20} />
            </button>
          </div>
        </div>
        <p className={'mt-1 text-gray-300'}>
          {answerToUser && <span className={'mr-1 text-yellow-600'}>{nameAnswerToUser},</span>}
          <span className={'break-words text-text-nav mobile-max:text-[12px]'}>{text}</span>
        </p>
        <div className={'flex items-center justify-between mobile-min:mt-2'}>
          <div className={'flex items-center gap-3'}>
            {currentUserId ? (
              <button onClick={() => handleSetAnswer(mainCommentId, _id, authorId, name)}>
                <i className={'text-secondary border-b border-dotted text-[12px] mobile-max:text-[10px]'}>Պատասխանել</i>
              </button>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <button className={'text-secondary ml-1 underline'}>
                    <i className={'text-secondary border-b border-dotted text-[12px] mobile-max:text-[10px]'}>
                      Պատասխանել
                    </i>
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className={'text-[12px]'}>
                    <span>Եթե ցանկանում եք մեկնաբանություն թողնել, կխնդրենք </span>

                    <Link to={'login'} className={'text-secondary inline-flex items-center font-bold underline'}>
                      Մուտք գործել
                      <BiWinkSmile className={'ml-1 inline'} size={15} />
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            )}
            <span className={'tablet-max:hidden'}>
              <DeleteCommentButton
                _id={_id}
                deleteOneComment={deleteOneComment}
                checkAccess={checkAccess}
                setDeleteDialog={setDeleteDialog}
                deleteDialog={deleteDialog}
                className={'border-b border-red-600'}
              >
                Ջնջել
              </DeleteCommentButton>
            </span>
          </div>
          <div className={'flex items-center gap-3'}>
            <button className={'flex items-center gap-1'} disabled={!currentUserId} onClick={handleLike}>
              <AiFillLike className={cn(isLike && 'text-[#91cb1f]')} />({like})
            </button>
          </div>
        </div>
      </section>
    </div>
  );
});
Comment.displayName = 'Comment';
