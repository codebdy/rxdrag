import { ClassMeta, RelationMeta, RelationType } from "@rxdrag/uml-schema";


export const getParentClasses = (classUuid: string, classMetas: ClassMeta[], relations: RelationMeta[]) => {
  const classes: ClassMeta[] = [];
  for (const relation of relations) {
    if (relation.relationType === RelationType.INHERIT) {
      if (relation.sourceId === classUuid) {
        const parent = classMetas.find(cls => cls.uuid === relation.targetId);
        if (parent) {
          classes.push(parent);
          const parentsOfParent = getParentClasses(parent.uuid, classMetas, relations);
          classes.push(...parentsOfParent);
        }
      }
    }
  }
  return classes;
};
