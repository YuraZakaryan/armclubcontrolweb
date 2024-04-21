import { regionCities } from '@components/screen/club/data';
import { TRating, TTimer } from '@redux/types';

export function isClubClosed(openingTime: string, closingTime: string): boolean {
  const currentTime: Date = new Date();
  const opening: Date = new Date(currentTime);
  const closing: Date = new Date(currentTime);

  opening.setHours(parseInt(openingTime.split(':')[0], 10));
  opening.setMinutes(parseInt(openingTime.split(':')[1], 10));
  opening.setSeconds(parseInt(openingTime.split(':')[2], 10));

  closing.setHours(parseInt(closingTime.split(':')[0], 10));
  closing.setMinutes(parseInt(closingTime.split(':')[1], 10));
  closing.setSeconds(parseInt(closingTime.split(':')[2], 10));

  if (openingTime !== '00:00' && closingTime !== '00:00') {
    return currentTime < opening || currentTime > closing;
  }
  return false;
}
export function calculateClubOccupancy(timers: Array<TTimer>): number {
  const totalTimers: number = timers.length;
  const activeTimers: number = timers.filter((timer: TTimer) => timer.isActive).length;

  return Math.round((activeTimers / totalTimers) * 100);
}
export const calculatePercentTimer = (totalTime: string, remainingTime: string): number => {
  if (totalTime === null || remainingTime === null) {
    return 100;
  }
  const totalParts: string[] = totalTime.split(':');
  const remainingParts: string[] = remainingTime.split(':');

  const totalHours: number = parseInt(totalParts[0], 10);
  const totalMinutesValue: number = parseInt(totalParts[1], 10);
  const remainingHours: number = parseInt(remainingParts[0], 10);
  const remainingMinutes: number = parseInt(remainingParts[1], 10);

  const totalMinutes: number = totalHours * 60 + totalMinutesValue;
  const remainingTotalMinutes = remainingHours * 60 + remainingMinutes;

  const percentage: number = ((totalMinutes - remainingTotalMinutes) / totalMinutes) * 100;

  return Math.round(percentage);
};
export const calculateAverageRating = (ratings: Array<TRating>): number => {
  if (ratings.length === 0) {
    return 0;
  }

  const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
  return totalRating / ratings.length;
};
export const formatDate = (inputDate: string) => {
  const originalDate: Date = new Date(inputDate);
  originalDate.setHours(originalDate.getUTCHours() + 8);

  const day: string = originalDate.getUTCDate().toString().padStart(2, '0');
  const month: string = (originalDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const year: number = originalDate.getUTCFullYear();
  const hours: string = originalDate.getUTCHours().toString().padStart(2, '0');
  const minutes: string = originalDate.getUTCMinutes().toString().padStart(2, '0');

  return {
    dateWithTime: `${hours}:${minutes} / ${day}.${month}.${year}`,
    date: `${day}.${month}.${year}`,
  };
};
export const getCitiesArray = (region: string) => regionCities[region] || regionCities.yerevan;

export const formattedPrice = (price: number) => {
  const roundedPrice: number = Math.floor(price);
  return roundedPrice.toLocaleString('en-US');
};
export const getCurrentTimeForTimer = (): string => {
  const date: Date = new Date();
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  const seconds: number = date.getSeconds();

  const formattedHours: string = hours.toString().padStart(2, '0');
  const formattedMinutes: string = minutes.toString().padStart(2, '0');
  const formattedSeconds: string = seconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};
export const minutesToTime = (minutes: number): string => {
  const hours: number = Math.floor(minutes / 60) % 24;
  const remainingMinutes: number = minutes % 60;
  return `${hours < 10 ? '0' : ''}${hours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`;
};
