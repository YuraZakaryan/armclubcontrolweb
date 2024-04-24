import { Button } from '@components/shadcn/ui/button';
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/shadcn/ui/dialog';
import { Asterisk } from '@components/ui';
import {
  ButtonShadcnWithLoader,
  DialogContentCorrect,
  EditButtonStyled,
  InputMaskWithLabel,
  SelectFormikField,
  SmallWarningText,
  UploadFileWithFormik,
} from '@components/wrapper';
import { getCitiesArray, notifyError } from '@utils';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { MdModeEditOutline } from 'react-icons/md';

import { regionOptions } from '@components/screen/club/data';
import { IClubEditDialog, TClubFormData } from '@components/screen/my-clubs/types';
import { InputProfileWithLabel } from '@components/screen/profile/wrapper';
import { CreateAndEditClubFormSchema } from '@components/validation';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { myClubsCreateThunk, myClubsEditThunk } from '@redux/http';
import { setOpenDialog } from '@redux/reducers/dialog';
import cn from 'classnames';
import { IconType } from 'react-icons';

export const ClubDialog: React.FC<IClubEditDialog> = React.memo((props) => {
  const { club, customIcon, className, dialogKey, buttonClassName } = props;

  const { user } = useAppSelector((state) => state.user);
  const { create, edit } = useAppSelector((state) => state.myClubs);

  const authorId: string | undefined = user?._id;

  const defineDialogKey: string = dialogKey as string;

  const dispatch = useAppDispatch();
  const { openDialogs } = useAppSelector((state) => state.dialog);

  const Icon: IconType = customIcon as IconType;

  const isOpen: boolean = openDialogs[defineDialogKey] || false;

  const handleSetDialogOpen = (newOpenState: boolean): void => {
    dispatch(setOpenDialog({ key: defineDialogKey, isOpen: newOpenState }));
  };

  const initialValues: TClubFormData = {
    title: (club && club.title) || '',
    description: (club && club.description) || '',
    info: (club && club.info) || '',
    address: (club && club.address) || '',
    region: (club && club.region) || '',
    city: (club && club.city) || '',
    phone: (club && club.phone) || '',
    picture: null,
    posterPicture: null,
    removePosterPicture: false,
    pictureUrl: (club && club.picture) || '',
    posterPictureUrl: (club && club.posterPicture) || '',
    latitudeMap: (club && club.latitudeMap) || '',
    longitudeMap: (club && club.longitudeMap) || '',
    openingTime: (club && club.openingTime) || '00:00',
    closingTime: (club && club.closingTime) || '00:00',
  };

  const stopPropagation: React.MouseEventHandler = (event): void => {
    event.stopPropagation();
  };

  const onSubmit = (values: TClubFormData): void => {
    if (values.latitudeMap && !values.longitudeMap) {
      notifyError('Սխալ կորդինատների մուտքագրում!');
      return;
    }

    const formData: FormData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('info', values.info);
    formData.append('latitudeMap', values.latitudeMap);
    formData.append('longitudeMap', values.longitudeMap);
    formData.append('address', values.address);
    formData.append('region', values.region);
    formData.append('city', values.city);
    formData.append('phone', values.phone);
    if (values.removePosterPicture) {
      formData.append('removePosterPicture', 'true');
    } else {
      formData.append('removePosterPicture', '');
    }
    if (values.picture) {
      formData.append('picture', values.picture);
    }
    if (values.posterPicture) {
      formData.append('posterPicture', values.posterPicture);
    }
    formData.append('openingTime', values.openingTime);
    formData.append('closingTime', values.closingTime);
    if (authorId) {
      formData.append('author', authorId);
    }
    if (user) {
      if (club) {
        const clubId = club._id;
        dispatch(myClubsEditThunk({ formData, clubId, userId: user?._id as string }));
      } else {
        dispatch(myClubsCreateThunk({ formData, userId: user?._id as string }));
      }
    }
  };

  const isLoading = create.isLoading || edit.isLoading;

  return (
    <div onClick={stopPropagation} className={cn('flex h-full w-full justify-end', className)}>
      <Dialog open={isOpen} onOpenChange={handleSetDialogOpen}>
        <DialogTrigger asChild>
          {Icon ? (
            <button>
              <Icon size={25} />
            </button>
          ) : !club ? (
            <Button className="bg-button_bg" variant="default">
              Ստեղծել ակումբ
            </Button>
          ) : (
            <EditButtonStyled icon={MdModeEditOutline} handleClick={() => handleSetDialogOpen(true)} />
          )}
        </DialogTrigger>
        <DialogContentCorrect className={'max-h-screen w-full max-w-screen-lg laptop-hd-min:max-w-[900px]'}>
          <DialogHeader>
            <DialogTitle>{authorId ? 'Ստեղծել ակումբ' : 'Փոփոխել ակումբը'}</DialogTitle>
            <DialogDescription>
              Երբ վերջացնելուց լինեք, սեղմեք&nbsp;
              {authorId ? '«Ստեղծել ակումբ»' : '«Պահպանել փոփոխությունները»'},
              <Asterisk className={'mx-1'} /> ֊ով նշվածները պարտադիր են
            </DialogDescription>
          </DialogHeader>
          <Formik initialValues={initialValues} validationSchema={CreateAndEditClubFormSchema} onSubmit={onSubmit}>
            {({ isValid, dirty, values, setFieldValue }) => (
              <Form>
                <div className="grid gap-2 py-4">
                  <div>
                    <Field
                      as={InputProfileWithLabel}
                      require={true}
                      name="title"
                      label="Անվանում"
                      type="text"
                      placeholder="Անվանում"
                    />
                    <ErrorMessage name="title" component={SmallWarningText} />
                  </div>
                  <div>
                    <Field
                      as={InputProfileWithLabel}
                      name="description"
                      require={true}
                      label="Նկարագրություն"
                      type="text"
                      placeholder="Նկարագրություն"
                    />
                    <ErrorMessage name="description" component={SmallWarningText} />
                  </div>
                  <div>
                    <Field
                      as={InputProfileWithLabel}
                      name="info"
                      label="Հակիրճ ինֆորմացիա"
                      type="text"
                      placeholder="Հակիրճ ինֆորմացիա"
                    />
                    <ErrorMessage name="info" component={SmallWarningText} />
                  </div>
                  <div>
                    <UploadFileWithFormik
                      setFieldValue={setFieldValue}
                      name="picture"
                      namePictureUrl="pictureUrl"
                      label="Ավելացնել լուսանկար"
                      require={true}
                      picture={values.picture}
                      pictureUrl={values.pictureUrl}
                    />
                    <ErrorMessage name="picture" component={SmallWarningText} />
                  </div>
                  <div>
                    <UploadFileWithFormik
                      setFieldValue={setFieldValue}
                      nameStateOnClose="removePosterPicture"
                      name="posterPicture"
                      namePictureUrl="posterPictureUrl"
                      imageSizeRequired
                      label="Ավելացնել պաստառ (1440 x 168)"
                      require={true}
                      picture={values.posterPicture}
                      pictureUrl={values.posterPictureUrl}
                    />
                    <ErrorMessage name="picture" component={SmallWarningText} />
                  </div>
                  <div>
                    <Field
                      as={SelectFormikField}
                      name="region"
                      label="Տարածաշրջան"
                      options={regionOptions}
                      setFieldValue={setFieldValue}
                    />
                    <ErrorMessage name="region" component={SmallWarningText} />
                  </div>
                  <div>
                    <Field
                      as={SelectFormikField}
                      name="city"
                      label="Քաղաք"
                      require={true}
                      options={getCitiesArray(values.region)}
                      setFieldValue={setFieldValue}
                    />
                    <ErrorMessage name="city" component={SmallWarningText} />
                  </div>
                  <div>
                    <Field
                      as={InputProfileWithLabel}
                      name="address"
                      require={true}
                      label="Հասցե"
                      type="text"
                      placeholder="Հասցե"
                    />
                    <ErrorMessage name="address" component={SmallWarningText} />
                  </div>
                  <div>
                    <Field
                      as={InputMaskWithLabel}
                      name="phone"
                      mask="(999) 99-99-99-99"
                      label="Հեռախոսահամար"
                      type="text"
                      placeholder="(374) 99-99-99-99"
                    />
                    <ErrorMessage name="phone" component={SmallWarningText} />
                  </div>
                  <div>
                    <Field
                      as={InputProfileWithLabel}
                      name="latitudeMap"
                      label="Կորդինատային լայնություն"
                      type="text"
                      placeholder="Կորդինատային լայնություն"
                    />
                    <ErrorMessage name="latitudeMap" component={SmallWarningText} />
                  </div>
                  <div>
                    <Field
                      as={InputProfileWithLabel}
                      name="longitudeMap"
                      disabled={!values.latitudeMap}
                      label="Կորդինատային երկայնություն"
                      type="text"
                      placeholder="Կորդինատային երկայնություն"
                    />
                    <ErrorMessage name="longitudeMap" component={SmallWarningText} />
                  </div>
                  <div>
                    <Field
                      as={InputMaskWithLabel}
                      name="openingTime"
                      mask="99:99"
                      label="Բացման ժամանակը"
                      type="text"
                      placeholder="00:00"
                    />
                    <ErrorMessage name="openingTime" component={SmallWarningText} />
                  </div>
                  <div>
                    <Field
                      as={InputMaskWithLabel}
                      name="closingTime"
                      mask="99:99"
                      label="Փակման ժամանակը"
                      type="text"
                      placeholder="00:00"
                    />
                    <ErrorMessage name="closingTime" component={SmallWarningText} />
                  </div>
                </div>
                <DialogFooter>
                  <ButtonShadcnWithLoader
                    type="submit"
                    className={cn('min-w-[267px]', buttonClassName)}
                    text={club ? 'Պահպանել փոփոխությունները' : 'Ստեղծել Ակումբ'}
                    disabled={!isValid || !dirty}
                    isLoading={isLoading as boolean}
                  />
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContentCorrect>
      </Dialog>
    </div>
  );
});
ClubDialog.displayName = 'ClubDialog';
