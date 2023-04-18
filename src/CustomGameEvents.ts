/**
 * Events that get emitted in Shadow Knight
*/
export const CustomGameEvents = {
  SKILL_1_FIRED: "SKILL_1_FIRED",
  SKILL_2_FIRED: "SKILL_2_FIRED",
  SKILL_3_FIRED: "SKILL_3_FIRED",
  SKILL_4_FIRED: "SKILL_4_FIRED",
  UPDATE_HEALTH: "UPDATE_HEALTH",
} as const;

export type CustomGameEvent = typeof CustomGameEvents[keyof typeof CustomGameEvents]


export const MenuEvents = {
  RESUME: "RESUME",
  PAUSE: "PAUSE",
  RESTART: "RESTART",
  CONTROLS: "CONTROLS",
  HELP: "HELP",
  EXIT: "EXIT",
} as const;

export type MenuEvent = typeof MenuEvents[keyof typeof MenuEvents]