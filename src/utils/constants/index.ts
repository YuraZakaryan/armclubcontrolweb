export const API_URL = import.meta.env.VITE_API_URL;
export const RE_DIGIT: RegExp = new RegExp(/^\d+$/);
export const OTP_TIMER = 60; // 1 minute
export const SUCCESS_LOCAL_STORAGE_KEY: string = 'profileUpdateSuccess';
export const SUCCESS_PASSWORD_CHANGE_LOCAL_STORAGE_KEY: string = 'profilePasswordUpdateSuccess';

export const SUCCESS_CREATE_CLUB_LOCAL_STORAGE_KEY: string = 'clubCreateSuccess';
export const SUCCESS_UPDATE_CLUB_LOCAL_STORAGE_KEY: string = 'clubUpdateSuccess';
export const DEFAULT_PER_PAGE = 10;
