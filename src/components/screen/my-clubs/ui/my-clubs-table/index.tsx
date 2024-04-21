import { ClubDialog } from '@components/screen/my-clubs/ui';
import { Loader } from '@components/ui';
import { CustomTable, EditButtonStyled } from '@components/wrapper';
import { CustomTableCell, CustomTableHeaderItem, CustomTableRow } from '@components/wrapper/custom-table/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { myClubsFetchThunk } from '@redux/http';
import { TClub } from '@redux/types';
import React from 'react';
import { AiFillControl } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export const MyClubsTable: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items, fetch } = useAppSelector((state) => state.myClubs);

  const { user } = useAppSelector((state) => state.user);

  React.useEffect((): void => {
    if (user) {
      dispatch(myClubsFetchThunk(user?._id as string));
    }
  }, [user]);

  const navigateTo = (id: string): void => {
    navigate(`/club/control/${id}`);
  };

  const isLoading = fetch.isLoading;

  return (
    <React.Fragment>
      {isLoading || isLoading === null ? (
        <Loader />
      ) : (
        !fetch.isLoading && (
          <CustomTable
            caption={Array.isArray(items) && items.length === 0 ? 'Դուք դեռ չունեք ակումբներ' : ''}
            header={
              <React.Fragment>
                <CustomTableHeaderItem>ID</CustomTableHeaderItem>
                <CustomTableHeaderItem>Անվանումը</CustomTableHeaderItem>
                <CustomTableHeaderItem>Դիտումների քանակը</CustomTableHeaderItem>
                <CustomTableHeaderItem>Փոփոխել</CustomTableHeaderItem>
                <CustomTableHeaderItem>Մանրամասն</CustomTableHeaderItem>
              </React.Fragment>
            }
            body={
              Array.isArray(items) &&
              items.map((club: TClub, index: number) => (
                <CustomTableRow key={club._id} className="cursor-pointer" handleClick={() => navigateTo(club._id)}>
                  <CustomTableCell>{index + 1}</CustomTableCell>
                  <CustomTableCell>{club.title}</CustomTableCell>
                  <CustomTableCell>{club.views}</CustomTableCell>
                  <CustomTableCell>
                    <ClubDialog club={club} dialogKey={club._id} className="justify-center" />
                  </CustomTableCell>
                  <CustomTableCell className="flex h-full w-full items-center justify-center">
                    <EditButtonStyled icon={AiFillControl} />
                  </CustomTableCell>
                </CustomTableRow>
              ))
            }
          />
        )
      )}
    </React.Fragment>
  );
};
