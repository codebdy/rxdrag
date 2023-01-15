import { Graph } from "@antv/x6";
import { useEffect } from "react";
import { MyShape } from "../MyShape";

export function useAddNodes(graph?: Graph) {
  useEffect(() => {
    if (graph) {

      graph.addNode(
        new MyShape().resize(120, 40).position(200, 50).updateInPorts(graph),
      )

      graph.addNode(
        new MyShape().resize(120, 40).position(400, 50).updateInPorts(graph),
      )

      graph.addNode(
        new MyShape().resize(120, 40).position(300, 250).updateInPorts(graph),
      )

    }
  }, [graph])
}