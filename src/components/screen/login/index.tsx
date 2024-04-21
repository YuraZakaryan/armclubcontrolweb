import { TLoginForm } from '@components/screen/login/types';
import { loginFormSchema } from '@components/validation';
import { AuthLayoutForm, ButtonShadcnWithLoader, SmallWarningText } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks';
import { loginThunk } from '@redux/http';
import { ErrorMessage, Field, FormikValues } from 'formik';
import { InputProfileWithLabel } from '../profile/wrapper';

export const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const { login } = useAppSelector((state) => state.user);

  const initialLoginFormValue: TLoginForm = {
    login: '',
    password: '',
  };

  const onSubmit = (values: FormikValues) => {
    dispatch(loginThunk(values));
  };

  const isLoading = login.isLoading;
  const isError = login.isError;

  return (
    <AuthLayoutForm
      label="Մուտք գործել"
      validationSchema={loginFormSchema}
      initialAuthFormValue={initialLoginFormValue}
      redirectText="Դեռ չունեք՞ անձնական էջ"
      redirectTo="/registration"
      redirectTitle="Գրանցվել"
      onSubmit={onSubmit}
      renderItemComponent={(formikProps) => {
        const { dirty, isValid } = formikProps;
        return (
          <>
            <div>
              <Field as={InputProfileWithLabel} name="login" label="Մուտքանուն" type="text" placeholder="Մուտքանուն" />
              <ErrorMessage name="login" component={SmallWarningText} />
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
            {isError ? <SmallWarningText>Մուտքանունը կամ գատնաբառը սխալ է</SmallWarningText> : null}
            <div className="flex justify-end">
              <ButtonShadcnWithLoader
                type="submit"
                className={'min-w-[120px] mobile-max:text-xs'}
                text="Մուտք գործել"
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
