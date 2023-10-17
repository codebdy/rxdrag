export const containerSchema = [
  {
    componentName: "TetradInput",
    props: {
      title: "$padding",
      keys: [
        "pt", "pr", "pl", "pb"
      ],
    },
    "x-field": {
      name: "p",
    }
  },
  {
    componentName: "TetradInput",
    props: {
      title: "$margin",
      keys: [
        "mt", "mr", "ml", "mb"
      ]
    },
    "x-field": {
      name: "m",
    }
  },
]