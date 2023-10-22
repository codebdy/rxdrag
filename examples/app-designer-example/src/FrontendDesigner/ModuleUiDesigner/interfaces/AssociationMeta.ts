export enum AssociationType {
  HasMany = "HasMany",
  HasOne = "HasOne"
}

export interface AssociationMeta {
  name?: string;
  label?: string;
  typeId: string;
  associationType: AssociationType,
}
