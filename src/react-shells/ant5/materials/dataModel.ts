import { IReactionMaterial } from "runner/reaction/interfaces/material";
import { ReactionType } from "runner/reaction/interfaces/metas";
import { fieldIcon, fieldReadIcon, fieldValidateIcon, formIcon, formReadIcon, formValidateIcon, subscribeIcon } from "../icons/reactions";

export const dataModelReactions: IReactionMaterial[] = [
  {
    name: "setFormValue",
    icon: formIcon,
    label: "$setFormValue",
    reactionType: ReactionType.SingleReaction,
    meta: {
      inPorts: [
        {
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
          name: "input",
          label: "",
        },
      ],
      outPorts: [
        {
          name: "success",
          label: "$success",
        },
        {
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
          name: "input",
          label: "",
        },
      ],
      outPorts: [
        {
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
          name: "input",
          label: "",
        },
      ],
      outPorts: [
        {
          name: "success",
          label: "$success",
        },
        {
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
          name: "input",
          label: "",
        },
      ],
      outPorts: [
        {
          name: "output",
          label: "",
        },
      ],
    }
  },
  {
    name: "subscribeField",
    icon: subscribeIcon,
    label: "$subscribeField",
    reactionType: ReactionType.SingleReaction,
    meta: {
      outPorts: [
        {
          name: "output",
          label: "",
        },
      ],
    }
  },
]