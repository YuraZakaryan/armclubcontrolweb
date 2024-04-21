import * as Yup from 'yup';

const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

export const loginFormSchema = Yup.object().shape({
  login: Yup.string()
    .required('Մուտքանունը պարտադիր է')
    .min(5, 'Մուտքանունը պետք է ունենա առնվազն 5 տառ')
    .max(16, 'Մուտքանունը չպետք է լինի ավելի քան 16 տառ')
    .matches(/^[a-zA-Z0-9]+$/, 'Մուտքանունը պետք է պարունակի միայն անգլերեն տառեր և թվեր'),
  password: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Գաղտնաբառը պետք է պարունակի փոքրատառ')
    .matches(/\w*[A-Z]\w*/, 'Գաղտնաբառը պետք է պարունակի մեծատառ')
    .matches(/\d/, 'Գաղտնաբառը պետք է պարունակի թիվ')
    .matches(/[!@#$?%^&*()\-_"=+{}; :,<.>]/, 'Գաղտնաբառը պետք է պարունակի հատուկ նշան')
    .min(8, ({ min }) => `Գաղտնաբառը պետք է լինի մեծ ${min}֊ից`)
    .required('Գաղտնաբառը պարտադիր է'),
});

export const registrationFormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Անունը պարտադիր է')
    .min(3, 'Անունը պետք է ունենա առնվազն 3 տառ')
    .max(16, 'Անունը չպետք է լինի ավելի քան 16 տառ'),
  lastname: Yup.string()
    .required('Ազգանունը պարտադիր է')
    .min(3, 'Ազգանունը պետք է ունենա առնվազն 3 տառ')
    .max(26, 'Ազգանունը չպետք է լինի ավելի քան 26 տառ'),
  email: Yup.string()
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Էլեկտրոնային փոստը չի համապատասխանում ձևաչափին',
    )
    .required('Էլեկտրոնային փոստը պարտադիր է'),

  username: Yup.string()
    .required('Մուտքանունը պարտադիր է')
    .min(6, ({ min }) => `Մուտքանունը պետք է ունենա առնվազն ${min} տառ `)
    .max(16, ({ max }) => `Մուտքանունը չպետք է լինի ավելի քան ${max} տառ`)
    .matches(/^[a-zA-Z0-9]+$/, 'Մուտքանունը պետք է պարունակի միայն անգլերեն տառեր և թվեր'),

  age: Yup.number()
    .required('Տարիքը պարտադիր է')
    .positive('Տարիքը չի կարող լինել բացասական')
    .integer('Տարիքը պետք է լինի ամբողջ թիվ')
    .min(13, ({ min }) => `Տարիքը պետք է լինի առնվազն ${min} `)
    .max(99, ({ max }) => `Տարիքը չպետք է լինի ոչ ավելին քան ${max}`),

  password: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Գաղտնաբառը պետք է պարունակի փոքրատառ')
    .matches(/\w*[A-Z]\w*/, 'Գաղտնաբառը պետք է պարունակի մեծատառ')
    .matches(/\d/, 'Գաղտնաբառը պետք է պարունակի թիվ')
    .matches(/[!@#$?%^&*()\-_"=+{}; :,<.>]/, 'Գաղտնաբառը պետք է պարունակի հատուկ նշան')
    .min(8, ({ min }) => `Գաղտնաբառը պետք է լինի մեծ ${min}֊ից`)
    .max(24, ({ max }) => `Գաղտնաբառը պետք է լինի փոքր ${max}֊ից`)
    .required('Գաղտնաբառը պարտադիր է'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Գաղտնաբառերը չեն համընկնում')
    .required('Գաղտնաբառի հաստատումը պարտադիր է'),
});

export const profileGeneralFormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Անունը պարտադիր է')
    .min(3, 'Անունը պետք է ունենա առնվազն 3 տառ')
    .max(16, 'Անունը չպետք է լինի ավելի քան 16 տառ'),
  lastname: Yup.string()
    .required('Ազգանունը պարտադիր է')
    .min(3, 'Ազգանունը պետք է ունենա առնվազն 3 տառ')
    .max(26, 'Ազգանունը չպետք է լինի ավելի քան 26 տառ'),
  username: Yup.string()
    .required('Մուտքանունը պարտադիր է')
    .min(5, 'Մուտքանունը պետք է ունենա առնվազն 5 տառ')
    .max(16, 'Մուտքանունը չպետք է լինի ավելի քան 16 տառ')
    .matches(/^[a-zA-Z0-9]+$/, 'Մուտքանունը պետք է պարունակի միայն անգլերեն տառեր և թվեր'),
  email: Yup.string().email('Էլեկտրոնային փոստը չի համապատասխանում ձևաչափին').required('Էլեկտրոնային փոստը պարտադիր է'),
  age: Yup.number()
    .typeError('Տարիքը պետք է պարունակի միայն թիվ')
    .required('Տարիքը պարտադիր է')
    .integer('Տարիքը պետք է լինի ամբողջ թիվ')
    .min(8, 'Տարիքը պետք է լինի մեծ 8֊ից')
    .max(99, 'Տարիքը չպետք է լինի մեծ 99֊ից')
    .positive('Տարիքը պետք է լինի դրական'),
});
export const profilePasswordChangeFormSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Խնդրում եմ մուտքագրեք հին գաղտնաբառը'),
  newPassword: Yup.string()
    .required('Խնդրում եմ մուտքագրեք նոր գաղտնաբառը')
    .matches(passwordComplexityRegex, 'Նոր գաղտնաբառը չի համապատասխանում պահանջներին ')
    .min(8, 'Գաղտնաբառը պետք է ունենա ավելին քան 8 նիշ')
    .notOneOf([Yup.ref('oldPassword')], 'Նոր և հին գաղտնաբառերը չպետք է համընկնեն'),
  confirmNewPassword: Yup.string()
    .required('Խնդրում եմ հաստատեք նոր գաղտնաբառը')
    .test('passwords-match', 'Գաղտնաբառերը չեն համընկնում', function (value) {
      return this.parent.newPassword === value;
    }),
});
export const mailFormData = Yup.object().shape({
  email: Yup.string().email('Էլեկտրոնային փոստը չի համապատասխանում ձևաչափին').required('Էլեկտրոնային փոստը պարտադիր է'),
});

export const CreateAndEditClubFormSchema = Yup.object().shape({
  title: Yup.string().required('Անվանումը պարտադիր է'),
  description: Yup.string().required('Նկարագիրը պարտադիր է'),
  info: Yup.string(),
  city: Yup.string().required('Քաղաքը պարտադիր է'),
  address: Yup.string()
    .required('Հասցեն պարտադիր է')
    .matches(/^.{5,}$/, 'Հասցեն պետք է ունենա 5 կամ ավելի սիմվոլ'),
  phone: Yup.string(),
  picture: Yup.mixed()
    .test('is-picture-url-empty', 'Նկարը պարտադիր է', function () {
      const pictureUrl = this.resolve(Yup.ref('pictureUrl'));
      return pictureUrl ? true : this.createError({ path: this.path, message: 'Նկարը պարտադիր է' });
    })
    .nullable(),
  latitudeMap: Yup.string().matches(
    /^(\+|-)?((\d((\.)|\.\d{1,6})?)|(0*?[0-8]\d((\.)|\.\d{1,6})?)|(0*?90((\.)|\.0{1,6})?))$/,
    'Սխալ կորդինատային լայնություն',
  ),
  longitudeMap: Yup.string().matches(
    /^(\+|-)?((\d((\.)|\.\d{1,6})?)|(0*?\d\d((\.)|\.\d{1,6})?)|(0*?1[0-7]\d((\.)|\.\d{1,6})?)|(0*?180((\.)|\.0{1,6})?))$/,
    'Սխալ կորդինատային երկայնություն',
  ),
  openingTime: Yup.string().required('Opening time is required'),
  closingTime: Yup.string().required('Closing time is required'),
});
