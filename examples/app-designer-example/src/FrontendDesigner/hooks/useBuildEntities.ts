import { useEffect, useCallback, useState } from "react";
import _ from "lodash";
import { getChildEntities } from "./getChildEntities";
import { ClassMeta, RelationMeta, RelationType, RelationMultiplicity, StereoType, AttributeMeta } from "@rxdrag/uml-schema";
import { AssociationMeta, AssociationType } from "../ModuleUiDesigner/interfaces/AssociationMeta";
import { getParentClasses } from "./getParentClasses";
import { EntityMeta } from "../ModuleUiDesigner/interfaces/EntityMeta";
import { MetaContent } from "@rxdrag/uml-editor";

export const sort = (array: { name: string }[]) => {
  return array.sort((a, b) => {
    //忽略大小写
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    //name相等时
    return 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any
}

const getClassByUuid = (classUuid: string, classMetas: ClassMeta[]) => {
  return classMetas.find(cls => cls.uuid === classUuid);
}

const getEntityAssociations = (classUuid: string, classMetas: ClassMeta[], relations: RelationMeta[]) => {
  const associations: AssociationMeta[] = [];
  for (const relation of relations) {
    if (relation.relationType === RelationType.INHERIT) {
      continue;
    }

    if (!getClassByUuid(relation.targetId, classMetas) || !getClassByUuid(relation.sourceId, classMetas)) {
      continue;
    }

    if (relation.sourceId === classUuid) {
      associations.push({
        id: `${relation.uuid}:${relation.targetId}`,
        name: relation.roleOfTarget,
        label: relation.labelOfTarget,
        typeId: relation.targetId,
        associationType: relation.targetMultiplicity === RelationMultiplicity.ZERO_MANY ? AssociationType.HasMany : AssociationType.HasOne,
      })
    } else if (relation.targetId === classUuid) {
      associations.push({
        id: `${relation.uuid}:${relation.sourceId}`,
        name: relation.roleOfSource,
        label: relation.labelOfSource,
        typeId: relation.sourceId,
        associationType: relation.sourceMutiplicity === RelationMultiplicity.ZERO_MANY ? AssociationType.HasMany : AssociationType.HasOne
      })
    }
  }
  return associations;
}


const makeRelations = (classes: ClassMeta[], relations: RelationMeta[]) => {
  const newRelations: RelationMeta[] = []
  for (const relation of relations) {
    if (relation.relationType === RelationType.INHERIT) {
      newRelations.push(relation);
      continue;
    }

    const sourceClass = getClassByUuid(relation.sourceId, classes)
    const targetClass = getClassByUuid(relation.targetId, classes)

    if (sourceClass?.stereoType === StereoType.Entity && targetClass?.stereoType === StereoType.Entity) {
      newRelations.push(relation);
      continue;
    }

    const sources = getChildEntities(relation.sourceId, classes, relations);
    const targets = getChildEntities(relation.targetId, classes, relations);

    if (sources.length === 0) {
      sourceClass && sources.push(sourceClass)
    }

    if (targets.length === 0) {
      targetClass && targets.push(targetClass)
    }

    for (const source of sources) {
      for (const target of targets) {
        newRelations.push({
          ...relation,
          uuid: source.uuid + target.uuid,
          sourceId: source.uuid,
          targetId: target.uuid,
          roleOfSource: source.uuid === relation.sourceId ? relation.roleOfSource : relation.roleOfSource + "Of" + source.name,
          roleOfTarget: target.uuid === relation.targetId ? relation.roleOfTarget : relation.roleOfTarget + "Of" + target.name,
          labelOfSource: source.uuid === relation.sourceId ? relation.labelOfSource : undefined,
          labelOfTarget: target.uuid === relation.targetId ? relation.labelOfTarget : undefined,
        })
      }
    }
  }
  return newRelations;
}

export function useBuildEntities(meta?: MetaContent) {
  const [entities, setEntities] = useState<EntityMeta[]>()
  const makeEntity = useCallback((cls: ClassMeta, classMetas: ClassMeta[], relations: RelationMeta[]) => {
    const parentClasses = getParentClasses(cls.uuid, classMetas, relations);
    const parentAttributes: AttributeMeta[] = [];

    for (const parentCls of parentClasses) {
      parentAttributes.push(...parentCls.attributes || []);
    }

    return {
      ...cls,
      attributes: sort(_.uniqBy([...cls.attributes || [], ...parentAttributes], "name")),
      associations: getEntityAssociations(cls.uuid, classMetas, relations)
    }
  }, []);

  useEffect(() => {
    if (meta) {
      const allClasses: ClassMeta[] = meta.classes || [];

      const allRelations: RelationMeta[] = makeRelations(allClasses, meta.relations || []);

      setEntities(
        sort(
          allClasses.filter(
            cls => cls.stereoType === StereoType.Entity
          ).map(
            cls => makeEntity(
              cls,
              allClasses,
              allRelations
            )
          ) || []
        )
      )
    }

  }, [makeEntity, meta]);

  return entities
}
