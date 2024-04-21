import { IConfirmOtp, TEmailForm } from '@components/screen/profile/types';
import { OtpInput } from '@components/screen/profile/wrapper';
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@components/shadcn/ui/dialog';
import { Input } from '@components/shadcn/ui/input';
import { Label } from '@components/shadcn/ui/label';
import { mailFormData } from '@components/validation';
import { ButtonShadcnWithLoader, DialogContentCorrect, SmallWarningText } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { confirmAccountThunk, sendOtpToEmailThunk } from '@redux/http';
import { OTP_TIMER } from '@utils/constants';
import cn from 'classnames';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { AiFillMinusCircle } from 'react-icons/ai';
import { BiCheckShield } from 'react-icons/bi';

export const ConfirmOtp: React.FC<IConfirmOtp> = React.memo(({ email }) => {
  const dispatch = useAppDispatch();
  const { user, sendOtpToEmail, confirmAccount } = useAppSelector((state) => state.user);

  const { activated } = user || {};

  const [seconds, setSeconds] = React.useState<number>(OTP_TIMER);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [showOtp, setShowOtp] = React.useState<boolean>(true);
  const [otp, setOtp] = React.useState<string>('');

  const initialValues: TEmailForm = {
    email: email || '',
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (showOtp && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [showOtp, seconds]);

  React.useEffect(() => {
    if (!openDialog) {
      setShowOtp(false);
      setSeconds(OTP_TIMER);
    }
  }, [openDialog]);

  const onSubmit = async (values: TEmailForm) => {
    dispatch(sendOtpToEmailThunk({ email: values.email, userId: user?._id as string }))
      .unwrap()
      .then((res) => {
        if (res) {
          setShowOtp(true);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };
  const handleConfirmOtp = async (email: string) => {
    dispatch(confirmAccountThunk({ email, code: otp, userId: user?._id as string }));
  };

  const againSendToEmail = async (email: string) => {
    dispatch(sendOtpToEmailThunk({ email, userId: user?._id as string }));
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const isLoadingSendOtp = sendOtpToEmail.isLoading;
  const isLoadingConfirmAccount = confirmAccount.isLoading;

  const isErrorConfirm = confirmAccount.isError;

  return (
    <div className="flex items-start gap-2 rounded border border-gray-600 p-2">
      {user && activated ? (
        <section className="flex items-center gap-2">
          <BiCheckShield color="green" size={22} />
          <small className="text-xs text-slate-800">Ակտիվացված է</small>
        </section>
      ) : (
        <>
          <div className="flex flex-wrap justify-end text-[12px] text-red-500 ">
            <p>Դեռ ակտիվացված չէ,</p>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <button>
                  <i className="text-secondary ml-1 underline">ԱԿՏԻՎԱՑՆԵ՞Լ</i>
                </button>
              </DialogTrigger>
              <DialogPortal>
                <DialogContentCorrect>
                  <>
                    <Formik initialValues={initialValues} validationSchema={mailFormData} onSubmit={onSubmit}>
                      {({ values }) => (
                        <Form>
                          <DialogHeader>
                            <DialogTitle>Էջի ակտիվացում</DialogTitle>
                            <DialogDescription>
                              {showOtp ? (
                                <span className={'mt-3 block text-center'}>
                                  Ձեր էլեկտրոնային փոստին ուղարկվել է{' '}
                                  <span className={'text-secondary underline'}>մեկ անգամյա օգտագործման գաղտնաբառ</span>{' '}
                                </span>
                              ) : (
                                <span className={'block text-[12px]'}>
                                  Մինչ ակտիվացնելը, կխնդրենք ուշադրություն դարձնել ձեր&nbsp;
                                  <span className={'text-secondary'}>Էլեկտրոնային փոստ</span>
                                  &nbsp; -ի ճշտգրտությանը, որով ցանկանում եք ակտիվացնել ձեր էջը:
                                </span>
                              )}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex flex-col gap-2">
                              {showOtp ? (
                                <div className={'mx-auto mt-3 flex flex-col items-center gap-2'}>
                                  {isErrorConfirm && (
                                    <div
                                      className={
                                        'mb-2 flex rounded border-2 border-l-[5px] border-red-800 py-3 pl-2 pr-4'
                                      }
                                    >
                                      <section className={'px-2'}>
                                        <AiFillMinusCircle size={30} color={'red'} />
                                      </section>
                                      <section>
                                        <small className={'block'}>Սխալ՝ մեկ անգամյա օգտագործման գաղտնաբառ.</small>
                                        <small className={'block text-gray-500'}>
                                          <button
                                            onClick={() => againSendToEmail(values.email)}
                                            className={cn(
                                              'underline transition-all',
                                              seconds === 0
                                                ? 'text-secondary cursor-pointer'
                                                : 'cursor-default text-gray-400',
                                            )}
                                            disabled={seconds > 0}
                                          >
                                            Հարցում,
                                          </button>
                                          <span className={'ml-1'}>նոր գաղտնաբառի ստացման </span>
                                        </small>
                                      </section>
                                    </div>
                                  )}
                                  <OtpInput
                                    value={otp}
                                    email={values.email}
                                    valueLength={6}
                                    onChange={setOtp}
                                    onEnterPressed={handleConfirmOtp}
                                  />
                                  {seconds > 0 ? (
                                    <div>
                                      <p className={'text-sm'}>
                                        կրկին փորձել: {minutes}:{remainingSeconds < 10 ? '0' : ''}
                                        {remainingSeconds}
                                      </p>
                                    </div>
                                  ) : (
                                    <button
                                      className={'text-sm underline'}
                                      onClick={() => againSendToEmail(values.email)}
                                    >
                                      ԿՐԿԻՆ ՈՒՂԱՐԿԵԼ
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <div className={'grid grid-cols-4 items-center gap-4'}>
                                  <Label htmlFor="name" className="text-right font-bold">
                                    Էլ․ փոստ
                                  </Label>
                                  <Field
                                    as={Input}
                                    name="email"
                                    type="mail"
                                    placeholder="profile@gmail.com"
                                    className="col-span-3"
                                  />
                                </div>
                              )}
                              <div className={'flex self-end'}>
                                <ErrorMessage className={'m-1'} name="email" component={SmallWarningText} />
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            {showOtp ? (
                              <ButtonShadcnWithLoader
                                type="button"
                                className="min-w-[120px]"
                                isLoading={isLoadingConfirmAccount as boolean}
                                text="Հաստատել"
                                handleClick={() => handleConfirmOtp(values.email)}
                              />
                            ) : (
                              <ButtonShadcnWithLoader
                                type="submit"
                                className="min-w-[120px]"
                                isLoading={isLoadingSendOtp as boolean}
                                text="Հաստատել"
                              />
                            )}
                          </DialogFooter>
                        </Form>
                      )}
                    </Formik>
                  </>
                </DialogContentCorrect>
              </DialogPortal>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
});
ConfirmOtp.displayName = 'ConfirmOtp';
