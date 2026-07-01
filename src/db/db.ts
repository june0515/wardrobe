import Dexie, { Table } from 'dexie';
import { WardrobeItem } from '../types/wardrobe';

class WardrobeDatabase extends Dexie {
  wardrobe!: Table<WardrobeItem, string>;
  constructor() {
    super('wardrobeDatabase');
    this.version(1).stores({ wardrobe: 'id, category, status, lastWornDate, createdAt' });
  }
}

export const db = new WardrobeDatabase();
