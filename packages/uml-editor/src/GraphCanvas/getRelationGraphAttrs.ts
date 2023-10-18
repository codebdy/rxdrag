import { RelationType } from "@rxdrag/uml-schema";
import { GlobalToken } from "antd/es/theme/interface";

const inheritMarker = "M 0,0 L 12,8 L 12,-8 L 0,0";
const diamondMarker = "M 0,0 L 9,-5 L 18,0 L 9,5 z";

export function getRelationGraphAttrs(
  relationType: RelationType,
  token:GlobalToken
) {
  if (relationType === RelationType.INHERIT) {
    return {
      line: {
        stroke: token.colorText,
        strokeWidth: 1,
        targetMarker: {
          tagName: "path",
          fill: token.colorBgBase,
          stroke: token.colorText,
          strokeWidth: 1,
          d: inheritMarker,
        },
      },
    };
  } else if (relationType === RelationType.TWO_WAY_ASSOCIATION) {
    return {
      line: {
        stroke: token.colorText,
        strokeWidth: 1,
        targetMarker: {},
      },
    };
  } else if (relationType === RelationType.TWO_WAY_AGGREGATION) {
    return {
      line: {
        stroke: token.colorText,
        strokeWidth: 1,
        sourceMarker: {
          tagName: "path",
          fill: token.colorBgBase,
          stroke: token.colorText,
          strokeWidth: 1,
          d: diamondMarker,
        },
        targetMarker: {},
      },
    };
  } else if (relationType === RelationType.TWO_WAY_COMBINATION) {
    return {
      line: {
        stroke: token.colorText,
        strokeWidth: 1,
        sourceMarker: {
          tagName: "path",
          fill: token.colorText,
          stroke: token.colorText,
          strokeWidth: 1,
          d: diamondMarker,
        },
        targetMarker: {},
      },
    };
  } else if (relationType === RelationType.ONE_WAY_ASSOCIATION) {
    return {
      line: {
        stroke: token.colorText,
        strokeWidth: 1,
      },
    };
  } else if (relationType === RelationType.ONE_WAY_AGGREGATION) {
    return {
      line: {
        stroke: token.colorText,
        strokeWidth: 1,
        sourceMarker: {
          tagName: "path",
          fill: token.colorBgBase,
          stroke: token.colorText,
          strokeWidth: 1,
          d: diamondMarker,
        },
      },
    };
  } else if (relationType === RelationType.ONE_WAY_COMBINATION) {
    return {
      line: {
        stroke: token.colorText,
        strokeWidth: 1,
        sourceMarker: {
          tagName: "path",
          fill: token.colorText,
          stroke: token.colorText,
          strokeWidth: 1,
          d: diamondMarker,
        },
      },
    };
  }
}
