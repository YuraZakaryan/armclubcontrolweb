import { IControlNotify } from '@components/screen/club-control/types';
import { SpecialWord } from '@components/wrapper';

export const ControlNotify: React.FC<IControlNotify> = ({ endedTimer }) => {
  return (
    <div>
      <h2>
        Վերջացել է <SpecialWord>{endedTimer.title}</SpecialWord> ֊ի ժամանակը
      </h2>
      <p>
        Գումարը։ <SpecialWord>{Math.round(endedTimer.pricePerHour)} դրամ</SpecialWord>
      </p>
      <p>
        Ժամանակը։ <SpecialWord>{endedTimer.defineTime} րոպե</SpecialWord>
      </p>
    </div>
  );
};
