import React from "react";
import { memo } from "react";

export const ClassRect = memo(
  (props: { stereoChar?: string; oneBorder: boolean }) => {
    const { stereoChar, oneBorder } = props;
    return (
      <div
        style={{
          width: "45px",
          height: "30px",
          border: "solid 2px",
          display: "flex",
          flexFlow: "column",
          padding: "0",
          borderRadius: "3px",
          marginTop: 0,
          marginBottom: "4px",
          //color: (theme) => theme.palette.text.secondary,
        }}
      >
        <div
          style={{
            height: stereoChar ? "60%" : "30%",
            width: "100%",
            borderBottom: "solid 1px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "0.2rem" }}>
            {stereoChar ? `<${stereoChar}>` : ""}
          </div>
        </div>

        <div
          style={{
            height: "10%",
            width: "100%",
            borderBottom: oneBorder ? "" : "solid 1px",
          }}
        ></div>
      </div>
    );
  }
);
