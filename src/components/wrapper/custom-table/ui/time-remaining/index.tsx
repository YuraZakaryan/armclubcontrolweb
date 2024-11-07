import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { ITimeRemaining } from '../../types';

export const TimeRemaining: React.FC<ITimeRemaining> = React.memo((props) => {
  const { end, isActive, isInfinite, isPause } = props;

  // Ensure endTime is a Date object if end is provided
  const endTime = end ? new Date(moment(end).toISOString()) : new Date();
  const [remainingTime, setRemainingTime] = useState<number>(endTime.getTime() - Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && end) {
      // Update remainingTime immediately on start
      setRemainingTime(endTime.getTime() - Date.now());

      intervalRef.current = setInterval(() => {
        setRemainingTime(endTime.getTime() - Date.now());
      }, 1000);
    } else {
      // Clear the interval when not active
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setRemainingTime(0);
    }

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, end]);

  const formatTime = (milliseconds: number) => {
    if (milliseconds < 0) milliseconds = 0;
    const duration = moment.duration(milliseconds);
    const hours = Math.floor(duration.asHours()).toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const seconds = duration.seconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return <span>{isInfinite || isPause || !isActive ? '--:--:--' : formatTime(remainingTime)}</span>;
});

TimeRemaining.displayName = 'TimeRemaining';
