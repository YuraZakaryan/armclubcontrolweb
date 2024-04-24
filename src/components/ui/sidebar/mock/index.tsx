import { TMenuElement } from '@components/ui/sidebar/types';
import { AiOutlineFieldTime, AiOutlineSetting, AiOutlineStar, AiOutlineUserSwitch } from 'react-icons/ai';
import { BiHomeAlt2 } from 'react-icons/bi';
import { BsExclamation } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { IoExitOutline, IoStarHalfOutline } from 'react-icons/io5';
import { MdControlCamera, MdOutlineManageHistory } from 'react-icons/md';
import { FaMapMarked } from 'react-icons/fa';
import { IoLogoPlaystation } from 'react-icons/io5';
import { VscCompassActive } from 'react-icons/vsc';

export const menuGeneralSignOutElements: TMenuElement[] = [{ title: 'Գլխավոր', href: '/', icon: BiHomeAlt2 }];

export const menuGeneralElements: TMenuElement[] = [
  { title: 'Գլխավոր', href: '/', icon: BiHomeAlt2 },
  { title: 'Ընտրվածներ', href: '/club/favorite', icon: AiOutlineStar },
  { title: 'Վերջինները', href: '/club/history', icon: AiOutlineFieldTime },
];

export const categoriesElements: TMenuElement[] = [
  { title: 'Բարձր վարկանիշով', href: '/top-rated', icon: IoStarHalfOutline },
  { title: 'Նախն․ տարածաշրջանից', href: '/by-region', icon: FaMapMarked },
  { title: 'Ամենաշատը քանակով', href: '/by-computers', icon: IoLogoPlaystation },
  { title: 'Ակտիվությամբ բարձրները', href: '/by-active', icon: VscCompassActive },
];

export const menuSignedElements: TMenuElement[] = [
  {
    title: 'Իմ էջը',
    href: '/profile',
    icon: AiOutlineUserSwitch,
    secondaryIcon: BsExclamation,
  },
  { title: 'Կարգավորումներ', href: '/settings', icon: AiOutlineSetting },
  { title: 'Դուրս գալ', href: '', icon: IoExitOutline },
];

export const menuSignedWithClubAdminElements: TMenuElement[] = [
  {
    title: 'Իմ էջը',
    href: '/profile',
    icon: AiOutlineUserSwitch,
    secondaryIcon: BsExclamation,
  },
  { title: 'Իմ Ակումբները', href: '/club/my-clubs', icon: MdControlCamera },
  { title: 'Պատմություն', href: '/club/timer-history', icon: MdOutlineManageHistory },
  { title: 'Կարգավորումներ', href: '/settings', icon: AiOutlineSetting },
  { title: 'Դուրս գալ', href: '', icon: IoExitOutline },
];

export const menuSignOutedElements: TMenuElement[] = [{ title: 'Մուտք գործել', href: '/login', icon: CgProfile }];
