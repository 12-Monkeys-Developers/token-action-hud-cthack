import { GROUPS, LAYOUT } from "./constants.mjs"

export function getDefaults(utils) {
  return {
    layout: LAYOUT.map((parent) => ({
      ...parent,
      name: utils.i18n(parent.name),
      listName: `${utils.i18n("tokenActionHud.group")}: ${utils.i18n(parent.name)}`,
      groups: parent.groups.map((group) => ({
        ...group,
        name: utils.i18n(group.name),
        listName: `${utils.i18n("tokenActionHud.group")}: ${utils.i18n(group.name)}`,
      })),
    })),
    groups: GROUPS.map((group) => ({
      ...group,
      name: utils.i18n(group.name),
      listName: `${utils.i18n("tokenActionHud.group")}: ${utils.i18n(group.name)}`,
    })),
  }
}
