import { InputProfileWithLabel } from '@components/screen/profile/wrapper';
import { TRegistrationForm } from '@components/screen/registration/types';
import { registrationFormSchema } from '@components/validation';
import { AuthLayoutForm, ButtonShadcnWithLoader, SmallWarningText } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks';
import { registrationThunk } from '@redux/http';
import { clearRegistrationErrorText } from '@redux/reducers';
import { ErrorMessage, Field, FormikValues } from 'formik';
import React from 'react';

export const RegistrationScreen = () => {
  const dispatch = useAppDispatch();
  const { registration } = useAppSelector((state) => state.user);

  const initialRegistrationFormValue: TRegistrationForm = {
    name: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    age: 0,
  };

  const onSubmit = (values: FormikValues) => {
    dispatch(registrationThunk(values));
  };

  const isLoading = registration.isLoading;
  const isError = registration.isErrorMessage;

  const errorComponent = (() => {
    if (isError) {
      switch (isError) {
        case 'User with this email already exists!':
          return <SmallWarningText>Էլ․ փոստը արդեն զբաղված է</SmallWarningText>;
        case 'User with this username already exists!':
          return <SmallWarningText>Մուտքանունը արդեն զբաղված է</SmallWarningText>;
        default:
          return <SmallWarningText>Մուտքանունը և Էլ․ փոստը արդեն զբաղված են</SmallWarningText>;
      }
    }
  })();

  const handleClearError = () => {
    if (isError) {
      dispatch(clearRegistrationErrorText());
    }
  };

  return (
    <AuthLayoutForm
      label="Գրանցվել"
      validationSchema={registrationFormSchema}
      initialAuthFormValue={initialRegistrationFormValue}
      redirectText="Արդեն ունեք՞ անձնական էջ"
      redirectTo="/login"
      redirectTitle="Մուտք գործել"
      onSubmit={onSubmit}
      renderItemComponent={(formikProps) => {
        const { dirty, isValid, values } = formikProps;

        React.useEffect(() => {
          handleClearError();
        }, [values]);

        return (
          <>
            <div>
              <Field as={InputProfileWithLabel} name="name" label="Անուն" type="text" placeholder="Անուն" />
              <ErrorMessage name="name" component={SmallWarningText} />
            </div>
            <div>
              <Field as={InputProfileWithLabel} name="lastname" label="Ազգանուն" type="text" placeholder="Ազգանուն" />
              <ErrorMessage name="lastname" component={SmallWarningText} />
            </div>
            <div>
              <Field as={InputProfileWithLabel} name="email" label="Էլ․ փոստ" type="text" placeholder="Էլ․ փոստ" />
              <ErrorMessage name="email" component={SmallWarningText} />
            </div>
            <div>
              <Field
                as={InputProfileWithLabel}
                name="username"
                label="Մուտքանուն"
                type="text"
                placeholder="Մուտքանուն"
              />
              <ErrorMessage name="username" component={SmallWarningText} />
            </div>
            <div>
              <Field as={InputProfileWithLabel} name="age" label="Տարիք" type="number" placeholder="Տարիք" />
              <ErrorMessage name="age" component={SmallWarningText} />
            </div>
            <div>
              <Field
                as={InputProfileWithLabel}
                name="password"
                label="Գաղտնաբառ"
                type="password"
                placeholder="Գաղտնաբառ"
              />
              <ErrorMessage name="password" component={SmallWarningText} />
            </div>
            <div>
              <Field
                as={InputProfileWithLabel}
                name="confirmPassword"
                label="Հաստատել գաղտնաբառը"
                type="password"
                placeholder="Հաստատել գաղտնաբառը"
              />
              <ErrorMessage name="confirmPassword" component={SmallWarningText} />
            </div>
            {errorComponent}
            <div className="flex justify-end">
              <ButtonShadcnWithLoader
                type="submit"
                className={'min-w-[134px] tablet-max:min-w-[96px] mobile-max:text-xs'}
                text="Գրանցվել"
                disabled={!isValid || !dirty}
                isLoading={isLoading as boolean}
              />
            </div>
          </>
        );
      }}
    />
  );
};
