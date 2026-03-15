export enum EItemCategory {
  All = 0,
  Bundle = 1,
  Box,
  Costume,
  Pet,
  Mount,
  Supply,
  Enhancer,
  Skill,
  Accessories,
  Exp,
  Misc,
}

export enum EPurchaseLimitType {
  Lifetime = 0,
  Yearly,
  Monthly,
  Daily,
}

export type ItemGallery = {
  image_id: string;
  image_url: string;
  sort_by: number;
};

export type ShopItem = {
  product_num: number;
  item_name: string;
  item_price: number;
  item_category: number;
  item_description: string;
  item_discount?: number | null;
  item_discount_type?: number | null;
  item_image: string;
  item_status: number;
  item_stock: number;
  item_purchase_limit?: number | null;
  item_tag?: string;
  final_price: number;
  discount_percent: number;
  item_purchase_limit_type?: number;
  purchase_limit_text?: string | null;
  remaining_purchase_limit?: number | null;

  item_gallery: ItemGallery[];
};
