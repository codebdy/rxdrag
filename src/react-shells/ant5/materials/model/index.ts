import { IReactionMaterial } from "runner/reaction/interfaces/material";
import { ReactionType } from "runner/reaction/interfaces/metas";
import { fieldIcon, fieldReadIcon, fieldValidateIcon, formIcon, formReadIcon, formValidateIcon } from "../../icons/reactions";
import { createUuid } from "../../SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
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
  {
    name: "readFieldValue",
    icon: fieldReadIcon,
    label: "$readFieldValue",
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
  subscribeFieldMaterial,
]