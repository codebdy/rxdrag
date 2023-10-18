import { RelationType, ClassMeta, StereoType } from "@rxdrag/uml-schema";

export function canStartLink(lineType: RelationType, classMeta: ClassMeta) {
  if (classMeta.stereoType === StereoType.Service ||
    classMeta.stereoType === StereoType.Enum ||
    classMeta.stereoType === StereoType.ValueObject
  ) {
    return false;
  } else if (lineType === RelationType.INHERIT) {
    if (classMeta.stereoType === StereoType.Entity ||
      classMeta.stereoType === StereoType.Abstract
    ) {
      return true;
    }
  }else {
    if(classMeta.stereoType === StereoType.Abstract){
      return true;
    }
    if(classMeta.stereoType === StereoType.Entity){
      return true;
    }
  }
}
