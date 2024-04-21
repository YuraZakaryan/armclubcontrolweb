import { ClubDialog } from '@components/screen/my-clubs/ui';
import { Button } from '@components/shadcn/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@components/shadcn/ui/popover';
import { useAppSelector } from '@hooks/redux';
import { Link } from 'react-router-dom';

export const ButtonAddClub = () => {
  const { user } = useAppSelector((state) => state.user);

  const activated = user?.activated;

  return (
    <div className={'flex w-full justify-end'}>
      {!activated ? (
        <Popover>
          <PopoverTrigger>
            <Button variant="default">Ստեղծել ակումբ</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className={'text-[12px]'}>
              <span>Եթե ցանկանում եք ստեղծել ակումբ, կխնդրենք </span>

              <Link to="/profile" className={'inline-flex items-center font-bold text-text_success underline'}>
                ակտիվացնել էջը
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <ClubDialog buttonClassName="min-w-[152px]" />
      )}
    </div>
  );
};
