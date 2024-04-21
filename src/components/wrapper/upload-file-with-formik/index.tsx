import { Label } from '@components/shadcn/ui/label';
import { Asterisk } from '@components/ui';
import { IUploadFileWithFormik } from '@types';
import { API_URL } from '@utils/constants';
import cn from 'classnames';
import { Image as PrimeImage } from 'primereact/image';
import React from 'react';
import { IoCamera, IoClose } from 'react-icons/io5';
import { notifyError } from '@utils';

export const UploadFileWithFormik: React.FC<IUploadFileWithFormik> = React.memo((props) => {
  const {
    name,
    namePictureUrl,
    label,
    require,
    setFieldValue,
    pictureUrl,
    picture,
    imageSizeRequired,
    nameStateOnClose,
  } = props;
  const [isDragActive, setIsDragActive] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const checkImageSize = (file: File) => {
    return new Promise<void>((resolve): void => {
      const image = new Image();
      image.onload = () => {
        if (image.width === 1440 && image.height === 168) {
          resolve();
        } else {
          notifyError('Նկարի չափսը պետք է լինի 1440 x 168');
        }
      };
      image.onerror = (): void => {
        notifyError('Չհաջողվեց ներբեռնել նկար');
      };
      image.src = URL.createObjectURL(file);
    });
  };

  const handleDragOver: React.MouseEventHandler<HTMLDivElement> = (event): void => {
    event.preventDefault();
    !picture && setIsDragActive(true);
  };
  const handleDragLeave: React.MouseEventHandler<HTMLDivElement> = (event): void => {
    event.preventDefault();
    !picture && setIsDragActive(false);
  };

  const showFile = async (file: File): Promise<void> => {
    let fileType: string = file.type;
    let validExtensions: string[] = ['image/jpeg', 'image/png', 'image/jpg'];
    if (validExtensions.includes(fileType)) {
      try {
        let fileReader: FileReader = new FileReader();
        fileReader.onload = (): void => {
          setFieldValue(namePictureUrl, fileReader.result);
          setIsDragActive(true);
        };
        fileReader.readAsDataURL(file);
      } catch (err) {
        console.log(err);
      }
    } else {
      setIsDragActive(false);
      setIsDragActive(false);
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (e): Promise<void> => {
    if (e.currentTarget.files && !pictureUrl) {
      const file: File = e.currentTarget.files[0];
      try {
        imageSizeRequired && (await checkImageSize(file));
        await setFieldValue(name, file);
        await showFile(file);
      } catch (err) {
        alert(err);
      }
    }
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    if (!pictureUrl) {
      setIsDragActive(false);
      const droppedFile = event.dataTransfer.files[0];
      try {
        imageSizeRequired && (await checkImageSize(droppedFile));
        await setFieldValue(name, droppedFile);
        await showFile(droppedFile);
      } catch (err) {
        alert(err);
      }
    }
  };

  const closeFile: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();
    setIsDragActive(false);
    try {
      await setFieldValue(name, null);
      await setFieldValue(namePictureUrl, '');
      nameStateOnClose && (await setFieldValue(nameStateOnClose, true));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={'flex w-full flex-col gap-2'}>
      <Label className="font-bold tablet-max:text-[12px]">
        {require ? <Asterisk className={'mr-1'} /> : null}
        {label}
      </Label>
      <div
        className={cn(
          'relative flex min-h-[140px] items-center justify-center rounded-lg border-2 border-dashed transition-all',
          isDragActive && 'scale-105 border-solid',
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {pictureUrl ? (
          <React.Fragment>
            <PrimeImage
              src={picture ? pictureUrl : API_URL + '/' + pictureUrl}
              alt={'example'}
              width="300px"
              height="300px"
              className="p-2"
            />
            <button
              className={'z-1 absolute right-2 top-2 cursor-pointer text-red-600'}
              type="button"
              onClick={closeFile}
            >
              <IoClose size={25} className={'text-inherit'} />
            </button>
          </React.Fragment>
        ) : (
          <div className={'flex flex-col items-center justify-center gap-1'}>
            <span>
              <IoCamera size={40} className={'text-secondary'} />
            </span>
            <header className={'text-center text-sm'}>Քաշել &amp; թողնել, նկար ավելացնելու համար</header>
            <span>կամ</span>
            <button
              type="button"
              onClick={() => {
                inputRef.current && inputRef.current.click();
              }}
              className={'font-bold text-text_special'}
            >
              Ավելացնել ձեռքով
            </button>
          </div>
        )}
        <input
          type="file"
          className={'bg-[#eff4fb]'}
          ref={inputRef}
          name={name}
          hidden={true}
          accept="image/png, image/jpg, image/jpeg"
          onChange={handleChange}
        />
      </div>
    </div>
  );
});
UploadFileWithFormik.displayName = 'UploadFileWithFormik';
