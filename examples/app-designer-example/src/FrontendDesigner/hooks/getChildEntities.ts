import { ClassMeta, RelationMeta, RelationType, StereoType } from "@rxdrag/uml-schema";

export const getChildEntities = (classUuid: string, classMetas: ClassMeta[], relations: RelationMeta[]) => {
  const classes: ClassMeta[] = [];
  for (const relation of relations) {
    if (relation.relationType === RelationType.INHERIT) {
      if (relation.targetId === classUuid) {
        const child = classMetas.find(cls => cls.uuid === relation.sourceId);
        if (child) {
          if (child.stereoType === StereoType.Entity) {
            classes.push(child);
          }
          const childrenOfChild = getChildEntities(child.uuid, classMetas, relations);
          classes.push(...childrenOfChild);
        }
      }
    }
  }
  return classes;
};
