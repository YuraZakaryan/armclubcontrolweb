import { SearchContent } from '@components/ui/header/ui/search/ui';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { setContent, setOpen } from '@redux/reducers';
import cn from 'classnames';
import React from 'react';
import { IoCloseSharp, IoSearchSharp } from 'react-icons/io5';

export const Search = () => {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.club);
  const ref = React.useRef<HTMLInputElement>(null);

  const { open, content } = search;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    dispatch(setContent(value));
  };

  const toggleSearch = (status?: boolean) => {
    if (status !== undefined) {
      dispatch(setOpen(status));
    } else {
      dispatch(setOpen(!open));
    }
  };

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (open) {
      if (ref.current && !ref.current.contains(target as Node)) {
        toggleSearch(false);
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <section
      className={cn(
        'flex items-center rounded-lg border-none bg-gray-200 text-gray-400 transition-all',
        open ? 'absolute right-4 tablet-max:animate-search-anim' : null,
      )}
      ref={ref}
    >
      <input
        type="text"
        className={cn(
          'relative right-0 bg-transparent py-2 outline-0 tablet-max:hidden tablet-max:w-full tablet-min:px-3',
          open && 'tablet-max:!block tablet-max:px-3 tablet-min:animate-search-focus-anim',
        )}
        placeholder="Փնտրել"
        onChange={handleChange}
        onClick={() => toggleSearch(true)}
        value={content}
      />
      <div className="flex items-center justify-center p-2 tablet-min:hidden">
        <button className="w-full" onClick={() => toggleSearch()}>
          {open ? <IoCloseSharp size={22} /> : <IoSearchSharp size={22} />}
        </button>
      </div>
      {open && <SearchContent />}
    </section>
  );
};
