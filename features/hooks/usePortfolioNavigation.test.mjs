import assert from "node:assert/strict";
import test from "node:test";
import { navigationReducer } from "./usePortfolioNavigation.ts";

const initial = () => ({ entries: [{ section: "about" }], index: 0 });
const visit = (state, section, projectSlug) =>
  navigationReducer(state, {
    type: "visit",
    location: { section, projectSlug },
  });

test("back and forward restore the exact project, not just its folder", () => {
  let state = visit(initial(), "projects");
  state = visit(state, "projects", "civicconnect");
  state = navigationReducer(state, { type: "back" });
  assert.deepEqual(state.entries[state.index], {
    section: "projects",
    projectSlug: undefined,
  });
  state = navigationReducer(state, { type: "forward" });
  assert.equal(state.entries[state.index].projectSlug, "civicconnect");
});

test("visiting a new section after going back replaces forward history", () => {
  let state = visit(visit(initial(), "projects"), "skills");
  state = navigationReducer(state, { type: "back" });
  state = visit(state, "contact");
  assert.deepEqual(
    state.entries.map((entry) => entry.section),
    ["about", "projects", "contact"],
  );
  assert.equal(navigationReducer(state, { type: "forward" }).index, 2);
});

test("repeat visits do not require extra back presses", () => {
  const state = visit(initial(), "experience");
  assert.equal(visit(state, "experience"), state);
});

test("history cannot move beyond its first or last entry", () => {
  assert.equal(navigationReducer(initial(), { type: "back" }).index, 0);
  assert.equal(navigationReducer(initial(), { type: "forward" }).index, 0);
});
