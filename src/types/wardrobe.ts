export type WardrobeCategory = '上衣' | '裤子' | '裙子' | '外套' | '鞋子' | '包包' | '配饰';
export type Season = '春' | '夏' | '秋' | '冬';
export type WardrobeStatus = '常穿' | '闲置' | '想淘汰' | '已捐赠';
export type StyleTag = '正式' | '通勤' | '休闲' | '运动' | '约会';

export interface WardrobeItem {
  id: string;
  photos: string[];
  name: string;
  category: WardrobeCategory;
  subCategory?: string;
  colors: string[];
  seasons: Season[];
  styleTags: StyleTag[];
  purchaseDate?: string;
  purchasePrice?: number;
  purchaseSource?: string;
  size?: string;
  wearCount: number;
  lastWornDate?: string;
  status: WardrobeStatus;
  storageLocation?: string;
  createdAt: string;
  updatedAt: string;
}

export const categories: WardrobeCategory[] = ['上衣', '裤子', '裙子', '外套', '鞋子', '包包', '配饰'];
export const seasons: Season[] = ['春', '夏', '秋', '冬'];
export const statuses: WardrobeStatus[] = ['常穿', '闲置', '想淘汰', '已捐赠'];
export const styleTags: StyleTag[] = ['正式', '通勤', '休闲', '运动', '约会'];
export const colors = ['黑色', '白色', '灰色', '米色', '棕色', '蓝色', '绿色', '粉色', '红色', '黄色', '紫色', '金色', '银色'];
