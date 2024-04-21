import { IAuthLayoutForm } from '@types';
import { Form, Formik, FormikValues } from 'formik';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export const AuthLayoutForm = <T extends FormikValues>(props: IAuthLayoutForm<T>): React.ReactElement => {
  const {
    label,
    initialAuthFormValue,
    renderItemComponent,
    onSubmit,
    validationSchema,
    redirectText,
    redirectTo,
    redirectTitle,
  } = props;

  return (
    <section className="h-full rounded-lg">
      <Helmet>
        <title>{label}</title>
      </Helmet>
      <div className="relative top-2 mx-auto flex h-full flex-col items-center justify-center lg:py-0">
        <div className="w-full rounded-lg border shadow sm:max-w-2xl md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-text-nav md:text-2xl">{label}</h1>
            <Formik
              initialValues={initialAuthFormValue}
              validationSchema={validationSchema}
              onSubmit={(values) => onSubmit && onSubmit(values)}
            >
              {(formikProps) => <Form className="space-y-4 md:space-y-6">{renderItemComponent(formikProps)}</Form>}
            </Formik>
            <p className="flex gap-1 text-sm font-light text-gray-500 dark:text-gray-400 tablet-max:text-xs">
              {redirectText}
              <Link to={redirectTo} className="text-primary-600 dark:text-primary-500 font-medium underline">
                {redirectTitle}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
