export interface IEditTimer {
  _id: string;
  title: string;
  dialogKey: string;
}
export type TEditFormData = {
  title: string;
};
export type TSettingItem = {
  index: number;
  clubTitle: string;
};

export interface ISettingsTimersTable extends TSettingItem {
  timers: TTimer[];
  global?: boolean;
}
