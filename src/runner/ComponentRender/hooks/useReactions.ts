import { useContext } from "react";
import { Reactions } from "runner/reaction/interfaces/interfaces";
import { EmpertyReactions, ReactionsContext } from "../contexts";

export function useReactions() {
  const schema = useContext<Reactions>(ReactionsContext) || EmpertyReactions
  return schema;
}