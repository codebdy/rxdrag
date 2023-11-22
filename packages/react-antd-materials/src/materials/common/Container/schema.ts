export const containerSchema = [
  {
    componentName: "TetradInput",
    props: {
      title: "$padding",
      keys: [
        "pt", "pr", "pl", "pb"
      ],
    },
    "x-data": {
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
    "x-data": {
      name: "m",
    }
  },
]