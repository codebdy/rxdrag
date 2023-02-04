import { useContext } from "react";
import { EmpertyReactions, Reactions, ReactionsContext } from "../contexts";

export function useReactions() {
  const schema = useContext<Reactions>(ReactionsContext) || EmpertyReactions
  return schema;
}