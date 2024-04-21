import { TOtpInput } from '@components/screen/profile/types';
import { RE_DIGIT } from '@utils/constants';
import React from 'react';

export const OtpInput: React.FC<TOtpInput> = React.memo((props) => {
  const { value, valueLength, onChange, onEnterPressed, email } = props;
  const valueItems = React.useMemo(() => {
    const valueArray = value.split('');
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }

    return items;
  }, [value, valueLength]);

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }
    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
      return;
    }
    targetValue = isTargetValueDigit ? targetValue : ' ';

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);

      if (!isTargetValueDigit) {
        return;
      }

      const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;

      if (nextElementSibling) {
        nextElementSibling.focus();
      }
      focusToNextInput(target);
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);

      target.blur();
    }
  };

  const inputOnKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (e.key === 'Enter') {
      e.preventDefault();
      await onEnterPressed(email);
    }

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      return focusToNextInput(target);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      return focusToPrevInput(target);
    }
    const targetValue = target.value;
    target.setSelectionRange(0, targetValue.length);

    if (e.key !== 'Backspace' || targetValue !== '') {
      return;
    }
    focusToPrevInput(target);
    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };
  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;
    const prevInputEl = target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };
  return (
    <div className="wi-full flex max-w-[360px] gap-3">
      {valueItems.map((digit, idx) => (
        <React.Fragment key={idx}>
          {idx === 0 ? (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{1}"
              maxLength={valueLength}
              className="border-border h-full w-full rounded-lg border py-2 text-center text-[28px] font-bold leading-[1] mobile-min:text-[32px]"
              value={digit}
              onChange={(e) => inputOnChange(e, idx)}
              onKeyDown={inputOnKeyDown}
              onFocus={inputOnFocus}
              autoFocus
            />
          ) : (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{1}"
              maxLength={valueLength}
              className="border-border h-full w-full rounded-lg border py-2 text-center text-[28px] font-bold leading-[1] mobile-min:text-[32px]"
              value={digit}
              onChange={(e) => inputOnChange(e, idx)}
              onKeyDown={inputOnKeyDown}
              onFocus={inputOnFocus}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
});
OtpInput.displayName = 'OtpInput';
