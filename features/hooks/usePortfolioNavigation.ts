"use client";

import { useCallback, useReducer } from "react";

export type FileSection =
  "home" | "about" | "projects" | "experience" | "skills" | "contact";
export type PortfolioLocation = { section: FileSection; projectSlug?: string };
type History = { entries: PortfolioLocation[]; index: number };
type Action =
  { type: "visit"; location: PortfolioLocation } | { type: "back" | "forward" };

export function navigationReducer(state: History, action: Action): History {
  if (action.type === "back")
    return { ...state, index: Math.max(0, state.index - 1) };
  if (action.type === "forward")
    return {
      ...state,
      index: Math.min(state.entries.length - 1, state.index + 1),
    };
  if (action.type !== "visit") return state;
  const current = state.entries[state.index];
  if (
    current.section === action.location.section &&
    current.projectSlug === action.location.projectSlug
  )
    return state;
  const entries = [...state.entries.slice(0, state.index + 1), action.location];
  return { entries, index: entries.length - 1 };
}

export function usePortfolioNavigation() {
  const [history, dispatch] = useReducer(navigationReducer, {
    entries: [{ section: "about" }],
    index: 0,
  });
  const navigate = useCallback(
    (section: FileSection, projectSlug?: string) =>
      dispatch({ type: "visit", location: { section, projectSlug } }),
    [],
  );
  const back = useCallback(() => dispatch({ type: "back" }), []);
  const forward = useCallback(() => dispatch({ type: "forward" }), []);
  return {
    location: history.entries[history.index],
    navigate,
    back,
    forward,
    canBack: history.index > 0,
    canForward: history.index < history.entries.length - 1,
  };
}
