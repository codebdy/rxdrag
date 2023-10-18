import React from "react";

export const svgImplement = (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
    <path
      d="
        M 17,15
        L 25,2
        L 33,15
        L 17,15
        M 25,15
        L 25,18
        M 25,23
        L 25,26
        M 25,31
        L 25,34
        M 25,39
        L 25,42
      "
      stroke="currentColor"
      strokeWidth="1"
      fill="transparent"
    ></path>
  </svg>
);

export const svgInherit = (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
    <path
      d="
        M 17,15
        L 25,2
        L 33,15
        L 17,15
        M 25,15
        L 25,45
      "
      stroke="currentColor"
      strokeWidth="1"
      fill="transparent"
    ></path>
  </svg>
);

export const svgTwoWayAssociation = (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40">
    <path
      d="
        M 0,20
        L 50,20
      "
      stroke="currentColor"
      strokeWidth="1"
    ></path>
  </svg>
);

export const svgTwoWayAggregation = (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40">
    <path d="M 18,20 L 50,20" stroke="currentColor" strokeWidth="1"></path>
    <polygon
      points="0,20 9,15 18,20 9,25"
      strokeWidth="1"
      stroke="currentColor"
      fill="transparent"
    />
  </svg>
);

export const svgTwoWayCombination = (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40">
    <path d="M 18,20 L 50,20" stroke="currentColor" strokeWidth="1"></path>
    <polygon
      points="0,20 9,15 18,20 9,25"
      strokeWidth="1"
      stroke="currentColor"
      fill="currentColor"
    />
  </svg>
);

export const svgOneWayAssociation = (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40">
    <path d="M 0,20 L 45,20" stroke="currentColor" strokeWidth="1"></path>
    <path
      d="M 50,20 L 43,15 L 46,20 L 43, 25 z"
      strokeWidth="1"
      stroke="currentColor"
      fill="currentColor"
    ></path>
  </svg>
);

export const svgOneWayAggregation = (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40">
    <path d="M 18,20 L 45,20" stroke="currentColor" strokeWidth="1"></path>
    <polygon
      points="0,20 9,15 18,20 9,25"
      strokeWidth="1"
      stroke="currentColor"
      fill="transparent"
    />
    <path
      d="M 50,20 L 43,15 L 46,20 L 43, 25 z"
      strokeWidth="1"
      stroke="currentColor"
      fill="currentColor"
    ></path>
  </svg>
);

export const svgOneWayCombination = (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40">
    <path d="M 18,20 L 45,20" stroke="currentColor" strokeWidth="1"></path>
    <polygon
      points="0,20 9,15 18,20 9,25"
      strokeWidth="1"
      stroke="currentColor"
      fill="currentColor"
    />
    <path
      d="M 50,20 L 43,15 L 46,20 L 43, 25 z"
      strokeWidth="1"
      stroke="currentColor"
      fill="currentColor"
    ></path>
  </svg>
);

export const svgLinkLine = (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40">
    <path
      d="
        M 0,20 
        L 3,20 
        M 8,20 
        L 11,20 
        M 16,20 
        L 19,20 
        M 23,20 
        L 26,20 
        M 31,20 
        L 34,20 
        M 39,20 
        L 42,20 
        M 47,20 
        L 50,20"
      stroke="currentColor"
      strokeWidth="1"
    ></path>
  </svg>
);

export const svgOneToOne = (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40">
    <path
      d="
        M 0,10
        L 25,10
        L 25,20
        L 50,20
      "
      stroke="currentColor"
      strokeWidth="1"
      fill="#fff"
    ></path>
    <circle
      id="mycircle"
      cx="10"
      cy="10"
      r="3"
      strokeWidth="1"
      stroke="currentColor"
      fill="#fff"
    />
    <circle
      id="mycircle"
      cx="40"
      cy="20"
      r="3"
      strokeWidth="1"
      stroke="currentColor"
      fill="#fff"
    />
  </svg>
);

export const svgOneToMany = (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40">
    <path
      d="
      M 0,10
      L 25,10
      L 25,20
      L 50,20
      M 43,20
      L 50,16
      M 43,20
      L 50,24
  "
      stroke="currentColor"
      strokeWidth="1"
      fill="#fff"
    ></path>
    <circle
      id="mycircle"
      cx="10"
      cy="10"
      r="3"
      strokeWidth="1"
      stroke="currentColor"
      fill="#fff"
    />
    <circle
      id="mycircle"
      cx="40"
      cy="20"
      r="3"
      strokeWidth="1"
      stroke="currentColor"
      fill="#fff"
    />
  </svg>
);

export const svgManyToOne = (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40">
    <path
      d="
      M 0,10
      L 25,10
      L 25,20
      L 50,20
      M 7,10
      L 0,6
      M 7,10
      L 0,14
  "
      stroke="currentColor"
      strokeWidth="1"
      fill="#fff"
    ></path>
    <circle
      id="mycircle"
      cx="10"
      cy="10"
      r="3"
      strokeWidth="1"
      stroke="currentColor"
      fill="#fff"
    />
    <circle
      id="mycircle"
      cx="40"
      cy="20"
      r="3"
      strokeWidth="1"
      stroke="currentColor"
      fill="#fff"
    />
  </svg>
);

export const svgManyToMany = (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40">
    <path
      d="
      M 0,10
      L 25,10
      L 25,20
      L 50,20
      M 43,20
      L 50,16
      M 43,20
      L 50,24
      M 7,10
      L 0,6
      M 7,10
      L 0,14
  "
      stroke="currentColor"
      strokeWidth="1"
      fill="#fff"
    ></path>
    <circle
      id="mycircle"
      cx="10"
      cy="10"
      r="3"
      strokeWidth="1"
      stroke="currentColor"
      fill="#fff"
    />
    <circle
      id="mycircle"
      cx="40"
      cy="20"
      r="3"
      strokeWidth="1"
      stroke="currentColor"
      fill="#fff"
    />
  </svg>
);
