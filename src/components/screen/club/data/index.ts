import { TSelectOption } from '@components/screen/club/types';

export const regionOptions: Array<TSelectOption> = [
  { value: 'aragatsotn', label: 'Արագածոտն' },
  { value: 'ararat', label: 'Արարատ' },
  { value: 'armavir', label: 'Արմավիր' },
  { value: 'gegharkunik', label: 'Գեղարքունիք' },
  { value: 'kotayk', label: 'Կոտայք' },
  { value: 'lori', label: 'Լոռի' },
  { value: 'shirak', label: 'Շիրակ' },
  { value: 'syunik', label: 'Սյունիք' },
  { value: 'tavush', label: 'Տավուշ' },
  { value: 'vayotsDzor', label: 'Վայոց ձոր' },
];
export const regionCities: Record<string, Array<TSelectOption>> = {
  aragatsotn: [
    { value: 'ashtarak', label: 'Աշտարակ' },
    { value: 'abovyan', label: 'Աբովյան' },
    { value: 'agarak', label: 'Ագարակ' },
    { value: 'ashnak', label: 'Աշնակ' },
    { value: 'alagez', label: 'Ալագեզ' },
    { value: 'amberd', label: 'Ամբերդ' },
    { value: 'arzni', label: 'Արզնի' },
    { value: 'astharaq', label: 'Աշթարակ' },
    { value: 'baghramyan', label: 'Բաղրամյան' },
    { value: 'vagarshapat', label: 'Վաղարշապատ' },
    { value: 'dzorpar', label: 'Դզորպար' },
    { value: 'kasakh', label: 'Կասախ' },
    { value: 'mastis', label: 'Մաստիս' },
    { value: 'mcni', label: 'Մցնի' },
    { value: 'talin', label: 'Տալին' },
    { value: 'urseh', label: 'Ուրսեհ' },
  ],
  ararat: [
    { value: 'ararat', label: 'Արարատ' },
    { value: 'aigehovit', label: 'Այգեհովիտ' },
    { value: 'artashat', label: 'Արտաշատ' },
    { value: 'vagarshapat', label: 'Վաղարշապատ' },
    { value: 'vedi', label: 'Վեդի' },
    { value: 'dzoragluk', label: 'Դզորագլուկ' },
    { value: 'exeghnazor', label: 'Եղեգնաձոր' },
    { value: 'lusarat', label: 'Լուսարատ' },
    { value: 'masis', label: 'Մասիս' },
  ],
  armavir: [
    { value: 'armavir', label: 'Արմավիր' },
    { value: 'vagarshapat', label: 'Վաղարշապատ' },
  ],
  gegharkunik: [
    { value: 'gavar', label: 'Գավառ' },
    { value: 'vardahovit', label: 'Վարդահովիտ' },
  ],
  kotayk: [
    { value: 'hantyan', label: 'Հանթյան' },
    { value: 'azatavan', label: 'Ազատավան' },
  ],
  lori: [
    { value: 'vanadzor', label: 'Վանաձոր' },
    { value: 'alaverdi', label: 'Ալավերդի' },
  ],
  shirak: [
    { value: 'gyumri', label: 'Գյումրի' },
    { value: 'ahuryan', label: 'Ահուրյան' },
  ],
  syunik: [
    { value: 'kapan', label: 'Քապան' },
    { value: 'agarak', label: 'Ագարակ' },
  ],
  tavush: [
    { value: 'ijevan', label: 'Իջևան' },
    { value: 'berd', label: 'Բերդ' },
  ],
  vayotsDzor: [
    { value: 'yegvard', label: 'Եղվարդ' },
    { value: 'agarak', label: 'Ագարակ' },
  ],
  yerevan: [{ value: 'yerevan', label: 'Երևան' }],
};
