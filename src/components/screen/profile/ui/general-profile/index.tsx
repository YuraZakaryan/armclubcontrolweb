import { TProfileGeneralFormData } from '@components/screen/profile/types';
import { ConfirmOtp } from '@components/screen/profile/ui';
import { InputProfileWithLabel } from '@components/screen/profile/wrapper';
import { Label } from '@components/shadcn/ui/label';
import { profileGeneralFormSchema } from '@components/validation';
import { ButtonShadcnWithLoader, SmallWarningText } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks';
import { updateProfileThunk } from '@redux/http';
import type { TClassName } from '@types';
import { notifyError, notifySuccess } from '@utils';
import cn from 'classnames';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';

export const GeneralProfile: React.FC<TClassName> = ({ className }) => {
  const dispatch = useAppDispatch();

  const { user, updateProfile } = useAppSelector((state) => state.user);

  const { name, lastname, email, age, username, activated } = user || {};

  const INITIAL_VALUES: TProfileGeneralFormData = Object.freeze({
    name: name || '',
    lastname: lastname || '',
    email: email || '',
    username: username || '',
    age: age || 0,
  });

  const [initialValues, setInitialValues] = React.useState({ ...INITIAL_VALUES });

  const onSubmit = async (values: TProfileGeneralFormData): Promise<void> => {
    await dispatch(updateProfileThunk({ userId: user && user._id ? user._id : '', formData: values }))
      .unwrap()
      .then((res): void => {
        if (res) {
          notifySuccess('Պրոֆիլը հաջողությամբ թարմացվեց!');
        }
      })
      .catch((err): void => {
        if (err) {
          notifyError('Ծագել է խնդիր էջի թարմացման հետ կապված, դիմել Ադմինիստրացիային!');
        }
      });
    setInitialValues(values);
  };

  const isLoading = updateProfile.isLoading;

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={profileGeneralFormSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isValid, dirty, values }) => (
          <Form className={cn('flex flex-col gap-4 p-5', className)}>
            <section className="grid grid-cols-3 gap-3 border-b border-gray-600 pb-6 mobile-max:grid-cols-1">
              <div>
                <Field as={InputProfileWithLabel} name="name" label="Անուն" type="text" placeholder="Վազգուշ" />
                <ErrorMessage name="name" component={SmallWarningText} />
              </div>
              <div>
                <Field as={InputProfileWithLabel} name="lastname" label="Ազգանուն" type="text" placeholder="Պերճյան" />
                <ErrorMessage name="lastname" component={SmallWarningText} />
              </div>
              <div>
                <Field
                  as={InputProfileWithLabel}
                  name="username"
                  label="Մուտքանուն"
                  type="text"
                  placeholder="vazgush11"
                />
                <ErrorMessage name="username" component={SmallWarningText} />
              </div>
            </section>
            <section className="grid grid-cols-3 gap-3 border-b border-gray-600 pb-6 mobile-max:grid-cols-1">
              <div>
                <Field
                  as={InputProfileWithLabel}
                  name="email"
                  label="Էլեկտրոնային փոստ"
                  type="mail"
                  placeholder="vazgush@gmail.com"
                  disabled={activated}
                />
                <ErrorMessage name="email" component={SmallWarningText} />
              </div>
              <div>
                <Field as={InputProfileWithLabel} name="age" label="Տարիք" type="number" placeholder="99" />
                <ErrorMessage name="age" component={SmallWarningText} />
              </div>
              <section className="flex flex-col gap-2 ">
                <Label className="tablet-max:text-[12px]">Պրոֆիլի կարգավիճակը</Label>
                <ConfirmOtp email={values.email} />
              </section>
            </section>
            <section className="flex justify-end">
              <ButtonShadcnWithLoader
                type="submit"
                text="Պահպանել"
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
