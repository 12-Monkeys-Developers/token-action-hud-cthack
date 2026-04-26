export const MODULE_ID = "token-action-hud-cthack"
export const REQUIRED_CORE_MODULE_VERSION = "2"

export const GROUPS = [
  { id: "saves", nestId: "saves_saves", name: "tokenActionHud.cthack.saves", type: "system" },
  { id: "resources", nestId: "resources_resources", name: "tokenActionHud.cthack.resources", type: "system" },
  { id: "damage", nestId: "combat_damage", name: "tokenActionHud.cthack.damage", type: "system" },
  { id: "weapons", nestId: "combat_weapons", name: "tokenActionHud.cthack.weapons", type: "system" },
  { id: "attacks", nestId: "combat_attacks", name: "tokenActionHud.cthack.attacks", type: "system" },
  { id: "items", nestId: "items_items", name: "tokenActionHud.cthack.items", type: "system" },
  { id: "abilities", nestId: "abilities_abilities", name: "tokenActionHud.cthack.abilities", type: "system" },
  { id: "spells", nestId: "magic_spells", name: "tokenActionHud.cthack.spells", type: "system" },
  { id: "rituals", nestId: "magic_rituals", name: "tokenActionHud.cthack.rituals", type: "system" },
  { id: "opponentAbilities", nestId: "abilities_opponentAbilities", name: "tokenActionHud.cthack.abilities", type: "system" },
  { id: "utility", nestId: "utility_utility", name: "tokenActionHud.utility", type: "system" },
]

export const LAYOUT = [
  {
    id: "saves",
    nestId: "saves",
    name: "tokenActionHud.cthack.saves",
    groups: GROUPS.filter((g) => g.nestId.startsWith("saves_")),
  },
  {
    id: "resources",
    nestId: "resources",
    name: "tokenActionHud.cthack.resources",
    groups: GROUPS.filter((g) => g.nestId.startsWith("resources_")),
  },
  {
    id: "combat",
    nestId: "combat",
    name: "tokenActionHud.cthack.combat",
    groups: GROUPS.filter((g) => g.nestId.startsWith("combat_")),
  },
  {
    id: "items",
    nestId: "items",
    name: "tokenActionHud.cthack.items",
    groups: GROUPS.filter((g) => g.nestId.startsWith("items_")),
  },
  {
    id: "abilities",
    nestId: "abilities",
    name: "tokenActionHud.cthack.abilities",
    groups: GROUPS.filter((g) => g.nestId.startsWith("abilities_")),
  },
  {
    id: "magic",
    nestId: "magic",
    name: "tokenActionHud.cthack.magic",
    groups: GROUPS.filter((g) => g.nestId.startsWith("magic_")),
  },
  {
    id: "utility",
    nestId: "utility",
    name: "tokenActionHud.utility",
    groups: GROUPS.filter((g) => g.nestId.startsWith("utility_")),
  },
]
