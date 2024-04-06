
export interface Item {
  id: string,
  categoryId: string,
  locationId: string,
  name: string,
  description: string | null,
  image: string | null
}

export type ItemWithOutId = Omit<Item, 'id'>;

export interface CategoryLocation {
  id: string,
  title: string,
  description: string | null
}

export type CategoryLocationWithoutId = Omit<CategoryLocation, 'id'>;