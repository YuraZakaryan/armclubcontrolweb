import { TProfileChangePasswordFormData } from '@components/screen/profile/types';
import { InputProfileWithLabel } from '@components/screen/profile/wrapper';
import { profilePasswordChangeFormSchema } from '@components/validation';
import { ButtonShadcnWithLoader, SmallWarningText } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks';
import { changePasswordProfileThunk } from '@redux/http';
import { notifyError, notifySuccess } from '@utils';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ToastContainer } from 'react-toastify';

export const ChangePasswordProfile = () => {
  const dispatch = useAppDispatch();
  const { user, changeProfilePassword } = useAppSelector((state) => state.user);

  const initialValues: TProfileChangePasswordFormData = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const isLoading = changeProfilePassword.isLoading;

  const onSubmit = async (values: TProfileChangePasswordFormData): Promise<void> => {
    if (user) {
      await dispatch(changePasswordProfileThunk({ userId: user?._id, formData: values }))
        .unwrap()
        .then((res): void => {
          if (res) {
            notifySuccess('Գաղտնաբառը հաջողությամբ թարմացվեց!');
          }
        })
        .catch((err): void => {
          if (err) {
            switch (err) {
              case 400:
                notifyError('Սխալ հին գաղտնաբառ');
                break;
            }
          }
        });
    }
  };
  return (
    <>
      <ToastContainer autoClose={5000} pauseOnHover closeOnClick={false} />
      <Formik initialValues={initialValues} validationSchema={profilePasswordChangeFormSchema} onSubmit={onSubmit}>
        {({ isValid, dirty }) => (
          <Form className="flex flex-col gap-4 p-5">
            <section className="grid grid-cols-3 gap-3 border-b border-gray-600 pb-6 mobile-max:grid-cols-1">
              <div>
                <Field
                  as={InputProfileWithLabel}
                  name="oldPassword"
                  label="Հին գաղտնաբառ"
                  type="password"
                  placeholder="********"
                />
                <ErrorMessage name="oldPassword" component={SmallWarningText} />
              </div>
              <div>
                <Field
                  as={InputProfileWithLabel}
                  name="newPassword"
                  label="Նոր գաղտնաբառ"
                  type="password"
                  placeholder="********"
                />
                <ErrorMessage name="newPassword" component={SmallWarningText} />
              </div>
              <div>
                <Field
                  as={InputProfileWithLabel}
                  name="confirmNewPassword"
                  label="Հաստատել նոր գաղտնաբառը"
                  type="password"
                  placeholder="********"
                />
                <ErrorMessage name="confirmNewPassword" component={SmallWarningText} />
              </div>
            </section>
            <section className="flex justify-end">
              <ButtonShadcnWithLoader
                type="submit"
                text="Փոխել գաղտնաբառը"
                isLoading={isLoading as boolean}
                disabled={!isValid || !dirty}
                className="min-w-[192px]"
              />
            </section>
          </Form>
        )}
      </Formik>
    </>
  );
};
