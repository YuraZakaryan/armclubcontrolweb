import { ETypeComment, type IClubComments, type TPageClickData } from '@components/screen/club/types';
import { Comment, ConditionsDialog } from '@components/screen/club/ui';
import { Button } from '@components/shadcn/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@components/shadcn/ui/popover';
import { Textarea } from '@components/shadcn/ui/textarea';
import { ButtonLoading } from '@components/ui';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import {
  commentCreateThunk,
  commentDeleteThunk,
  commentFetchThunk,
  subCommentCreateThunk,
  subCommentDeleteThunk,
} from '@redux/http';
import { changeFormText, deactivateReply, setActiveReply, setAnswerComment, setClubCommentForm } from '@redux/reducers';
import { TComment, TSubComment } from '@redux/types';
import React from 'react';
import { BiWinkSmile } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import ReactLoading from 'react-loading';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

export const ClubComments: React.FC<IClubComments> = React.memo((props) => {
  const { clubId } = props;

  const { items, fetch, create, activeReply, formData } = useAppSelector((state) => state.comment);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const [currentPage, setCurrentPage] = React.useState<number>(0);

  React.useEffect(() => {
    dispatch(commentFetchThunk(clubId));
    dispatch(setClubCommentForm(clubId));
  }, [clubId]);

  const [openConditionDialog, setOpenConditionDialog] = React.useState<boolean>(false);

  const handleSetAnswer = (mainComment: string, replyToComment: string, answerToUser: string, name: string): void => {
    dispatch(setActiveReply(name));
    dispatch(
      setAnswerComment({
        mainComment,
        replyToComment,
        answerToUser,
        club: clubId,
      }),
    );
  };

  const closeAnswer = (): void => {
    dispatch(deactivateReply());
  };

  const commentsPerPage: number = 5;
  const displayComments = items
    .slice(currentPage * commentsPerPage, (currentPage + 1) * commentsPerPage)
    .map((comment: TComment) => (
      <React.Fragment key={comment._id}>
        <Comment
          _id={comment._id}
          role={user?.role as string}
          commentAuthRole={comment.author.role}
          club={comment.club}
          authorId={comment.author._id}
          usersWhoLiked={comment.usersWhoLiked}
          deleteComment={commentDeleteThunk}
          currentUserId={user?._id as string}
          mainCommentId={comment._id}
          firstName={comment.author.name}
          lastName={comment.author.lastname}
          createdAt={comment.createdAt}
          like={comment.like}
          text={comment.text}
          handleSetAnswer={handleSetAnswer}
        />
        {comment.subComments.map((subComment: TSubComment) => (
          <Comment
            key={subComment._id}
            _id={subComment._id}
            typeComment={ETypeComment.SUB}
            role={user?.role as string}
            commentAuthRole={subComment.author.role}
            club={subComment.club}
            answerToUser={subComment.answerToUser}
            authorId={subComment.author._id}
            usersWhoLiked={subComment.usersWhoLiked}
            deleteComment={subCommentDeleteThunk}
            currentUserId={user?._id as string}
            mainCommentId={comment._id}
            firstName={subComment.author.name}
            lastName={subComment.author.lastname}
            createdAt={subComment.createdAt}
            like={subComment.like}
            text={subComment.text}
            handleSetAnswer={handleSetAnswer}
            className={'ml-5 border-l-4 border-dotted border-gray-600 mobile-min:ml-10'}
          />
        ))}
      </React.Fragment>
    ));

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event): void => {
    const { name, value } = event.target;
    dispatch(changeFormText({ name, value }));
  };
  const checkConditions = () => {
    if (localStorage && !localStorage.getItem('conditions')) {
      localStorage.setItem('conditions', 'yes');
      setOpenConditionDialog(true);
    }
  };
  const onSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    const isFormDataEmpty = Object.values(formData).every((value): boolean => value === '');

    console.log(formData);

    if (activeReply.status && !isFormDataEmpty) {
      await dispatch(subCommentCreateThunk({ id: user?._id as string, body: formData }));
    } else {
      if (formData.text && formData.club) {
        await dispatch(commentCreateThunk({ id: user?._id as string, body: formData }));
      }
    }
  };
  const handlePageClick = (data: TPageClickData): void => {
    setCurrentPage(data.selected);
  };
  return (
    <div className={'flex flex-col gap-3'}>
      <ConditionsDialog openConditionDialog={openConditionDialog} setOpenConditionDialog={setOpenConditionDialog} />
      {user?._id ? (
        <form className={'flex flex-col gap-2'} onSubmit={onSubmit}>
          <section className={'mt-2 flex flex-col rounded bg-primary'}>
            {activeReply.status ? (
              <div
                className={'flex items-center justify-between rounded-[inherit] border border-b-0 border-gray-600 p-3'}
              >
                <p className={'text-[10px] mobile-min:text-[12px]'}>
                  Դուք այս պահին պատասխանում եք <u className={'text-secondary'}>{activeReply.name}</u> ֊ին
                </p>
                <button onClick={closeAnswer}>
                  <MdClose color={'red'} className={'text-sm mobile-min:text-xl'} />
                </button>
              </div>
            ) : null}
            <Textarea
              name={'text'}
              placeholder="Գրել մեկնաբանություն"
              className={'border-gray-600 bg-primary'}
              value={formData.text}
              onChange={handleChange}
              onClick={checkConditions}
            />
          </section>
          <Button
            className={
              'flex min-w-[127px] items-center justify-center self-start bg-button_bg text-white hover:text-white'
            }
          >
            {create.isLoading ? <ButtonLoading /> : 'Մեկնաբանել'}
          </Button>
        </form>
      ) : null}
      {fetch.isLoading ? (
        <div className="flex w-full justify-center">
          <ReactLoading width={40} type={'bars'} color="black" />
        </div>
      ) : fetch.isLoading !== null && items.length === 0 && !user?._id ? (
        <small className={'text-gray-400'}>
          Մեկնաբանությունները բացակայում են։ Ցանկանու՞մ եք
          <Popover>
            <PopoverTrigger>
              <button className={'text-secondary ml-1 underline'}>մեկանաբանել</button>
            </PopoverTrigger>
            <PopoverContent>
              <div className={'text-[12px]'}>
                <span>Եթե ցանկանում եք մեկնաբանություն թողնել, կխնդրենք </span>

                <Link to="login" className={'text-secondary inline-flex items-center font-bold underline'}>
                  Մուտք գործել
                  <BiWinkSmile className={'ml-1 inline'} size={15} />
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </small>
      ) : (
        displayComments
      )}

      {items.length > 5 && (
        <ReactPaginate
          previousLabel={'Предыдущая'}
          nextLabel={'Следующая'}
          className={'flex items-center gap-3'}
          previousClassName={'border border-gray-600 rounded py-1 px-3 bg-primary'}
          nextClassName={'border border-gray-600 rounded py-1 px-3 bg-primary'}
          breakClassName={'hidden'}
          activeLinkClassName={'underline text-secondary'}
          breakLabel={'...'}
          pageCount={Math.ceil(items.length / commentsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick as (data: TPageClickData) => void}
          containerClassName={'pagination'}
        />
      )}
    </div>
  );
});
ClubComments.displayName = 'ClubComments';
