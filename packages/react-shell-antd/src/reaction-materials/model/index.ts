import { IReactionMaterial } from "runner/minions/interfaces/material";
import { ReactionType } from "runner/minions/interfaces/metas";
import { fieldIcon, fieldValidateIcon, formIcon, formReadIcon, formValidateIcon } from "../../icons/reactions";
import { createUuid } from "../../SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
import { readFieldValueMaterial } from "./readFieldValue";
import { subscribeFieldMaterial } from "./subscribeField";

export const dataModelReactions: IReactionMaterial[] = [
  {
    name: "setFormValue",
    icon: formIcon,
    label: "$setFormValue",
    reactionType: ReactionType.SingleReaction,
    meta: {
      inPorts: [
        {
          id: createUuid(),
          name: "input",
          label: "",
        },
      ],
    }
  },
  {
    name: "validateForm",
    icon: formValidateIcon,
    label: "$validateForm",
    reactionType: ReactionType.SingleReaction,
    meta: {
      inPorts: [
        {
          id: createUuid(),
          name: "input",
          label: "",
        },
      ],
      outPorts: [
        {
          id: createUuid(),
          name: "success",
          label: "$success",
        },
        {
          id: createUuid(),
          name: "failure",
          label: "$failure",
        },
      ],
    }
  },
  {
    name: "readFormValue",
    icon: formReadIcon,
    label: "$readFormValue",
    reactionType: ReactionType.SingleReaction,
    meta: {
      inPorts: [
        {
          id: createUuid(),
          name: "input",
          label: "",
        },
      ],
      outPorts: [
        {
          id: createUuid(),
          name: "output",
          label: "",
        },
      ],
    }
  },
  {
    name: "setFieldValue",
    icon: fieldIcon,
    label: "$setFieldValue",
    reactionType: ReactionType.SingleReaction,
    meta: {
      inPorts: [
        {
          id: createUuid(),
          name: "input",
          label: "",
        },
      ],
    }
  },
  {
    name: "validateField",
    icon: fieldValidateIcon,
    label: "$validateField",
    reactionType: ReactionType.SingleReaction,
    meta: {
      inPorts: [
        {
          id: createUuid(),
          name: "input",
          label: "",
        },
      ],
      outPorts: [
        {
          id: createUuid(),
          name: "success",
          label: "$success",
        },
        {
          id: createUuid(),
          name: "failure",
          label: "$failure",
        },
      ],
    }
  },
  readFieldValueMaterial,
  subscribeFieldMaterial,
]