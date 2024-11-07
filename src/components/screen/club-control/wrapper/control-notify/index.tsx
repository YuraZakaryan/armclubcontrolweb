import { IControlNotify } from '@components/screen/club-control/types';
import { SpecialWord } from '@components/wrapper';

export const ControlNotify: React.FC<IControlNotify> = ({ timer }) => {
  return (
    <div>
      <h2>
        Վերջացել է <SpecialWord>{timer?.title}</SpecialWord> ֊ի ժամանակը
      </h2>
      <p>
        Գումարը։ <SpecialWord>{timer?.price} դրամ</SpecialWord>
      </p>
      <p>
        Ժամանակը։ <SpecialWord>{timer?.playedTime} րոպե</SpecialWord>
      </p>
    </div>
  );
};
