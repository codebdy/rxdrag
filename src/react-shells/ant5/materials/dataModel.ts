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
      ports: [
        {
          name: "input",
          label: "",
          group: "in",
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
      ports: [
        {
          name: "input",
          label: "",
          group: "in",
        },
        {
          name: "success",
          label: "$success",
          group: "out",
        },
        {
          name: "failure",
          label: "$failure",
          group: "out",
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
      ports: [
        {
          name: "input",
          label: "",
          group: "in",
        },
        {
          name: "output",
          label: "",
          group: "out",
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
      ports: [
        {
          name: "input",
          label: "",
          group: "in",
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
      ports: [
        {
          name: "input",
          label: "",
          group: "in",
        },
        {
          name: "success",
          label: "$success",
          group: "out",
        },
        {
          name: "failure",
          label: "$failure",
          group: "out",
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
      ports: [
        {
          name: "input",
          label: "",
          group: "in",
        },
        {
          name: "output",
          label: "",
          group: "out",
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
      ports: [
        {
          name: "output",
          label: "",
          group: "out",
        },
      ],
    }
  },
]