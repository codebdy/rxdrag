export enum AssociationType {
  HasMany = "HasMany",
  HasOne = "HasOne"
}

export interface AssociationMeta {
  id: string;
  name?: string;
  label?: string;
  typeId: string;
  associationType: AssociationType,
}
