export type CharacterInfo = {
  cha_num: number;
  cha_name: string;
  cha_class: number;
  cha_school: number;
  cha_sex: number;
  cha_level: number;
  cha_money: number;
  cha_online: number;
  cha_deleted: number;
  cha_deleted_date: string;
};

export type CharactersResponse = {
  page: number;
  limit: number;
  total_pages: number;
  total_items: number;
  data: CharacterInfo[];
};
