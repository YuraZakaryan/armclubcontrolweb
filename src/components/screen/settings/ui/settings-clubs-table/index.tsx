import { ClubDialog } from '@components/screen/my-clubs/ui';
import { ConfirmDeleteDialog } from '@components/ui';
import { CustomTable } from '@components/wrapper';
import { CustomTableCell, CustomTableHeaderItem, CustomTableRow } from '@components/wrapper/custom-table/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { deleteClubThunk } from '@redux/http';
import { TClub } from '@redux/types';
import React from 'react';
import { FaEdit } from 'react-icons/fa';

export const SettingsClubsTable = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.myClubs);
  const { user } = useAppSelector((state) => state.user);

  const [confirmText, setConfirmText] = React.useState<string>('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setConfirmText(event.target.value);
  };

  const handleClick = (id: string) => {
    if (user) {
      dispatch(deleteClubThunk({ clubId: id, userId: user?._id }));
    }
  };

  return (
    <CustomTable
      caption={Array.isArray(items) && items.length === 0 ? 'Դուք դեռ չունեք ակումբներ' : ''}
      header={
        <React.Fragment>
          <CustomTableHeaderItem>ID</CustomTableHeaderItem>
          <CustomTableHeaderItem>Անվանումը</CustomTableHeaderItem>
          <CustomTableHeaderItem className="text-right">Փոփոխել</CustomTableHeaderItem>
          <CustomTableHeaderItem className="w-[70px] text-right">Ջնջել</CustomTableHeaderItem>
        </React.Fragment>
      }
      body={
        Array.isArray(items) &&
        items.map((club: TClub, index: number) => (
          <CustomTableRow key={club._id}>
            <CustomTableCell>{index + 1}</CustomTableCell>
            <CustomTableCell>{club.title}</CustomTableCell>
            <CustomTableCell>
              <ClubDialog club={club} dialogKey={club._id} customIcon={FaEdit} className="relative right-4" />
            </CustomTableCell>
            <CustomTableCell className="flex justify-end">
              <ConfirmDeleteDialog
                _id={club._id}
                label="Ակումբ"
                title={club.title}
                onChange={handleChange}
                handleClick={handleClick}
                confirmText={confirmText}
              />
            </CustomTableCell>
          </CustomTableRow>
        ))
      }
    />
  );
};
