export let ActionHandler = null

const MELEE_RANGES = new Set(["contact", "contactNear", "3str"])
const RESOURCE_IDS = new Set(["flashlights", "smokes", "sanity", "wealthDice", "hitDice", "miscellaneous"])

export function createActionHandler(api) {
  ActionHandler = class CthackActionHandler extends api.ActionHandler {
    async buildSystemActions() {
      const actorType = this.actor?.type
      if (!actorType) return

      if (actorType === "character") {
        this.#buildSaves()
        this.#buildResources()
        this.#buildDamage()
        this.#buildWeapons()
        this.#buildItems()
        this.#buildAbilities()
        this.#buildMagic()
      } else if (actorType === "opponent") {
        this.#buildAttacks()
        this.#buildOpponentAbilities()
        this.#buildMagic()
      }
    }

    #buildSaves() {
      const saves = Object.values(SYSTEM.SAVES)
      const actions = saves.map((save) => ({
        id: `saves-${save.id}`,
        name: game.i18n.localize(save.abbreviation),
        info1: { text: `${this.actor.system.saves[save.id].value}` },
        tooltip: game.i18n.localize(save.label),
        system: { actionType: "save", actionId: save.id },
      }))
      this.addActions(actions, { id: "saves", type: "system" })
    }

    #buildResources() {
      const availableAttributes = this.actor.getAvailableAttributes()
      const actions = availableAttributes
        .filter(([id]) => RESOURCE_IDS.has(id))
        .map(([id, data]) => ({
          id: `resources-${id}`,
          name: game.i18n.localize(CONFIG.CTHACK.attributes[id]),
          info1: { text: data.value || "0" },
          cssClass: data.value === "0" ? "disabled" : "",
          system: { actionType: "resource", actionId: id },
        }))
      this.addActions(actions, { id: "resources", type: "system" })
    }

    #buildDamage() {
      const damages = Object.values(SYSTEM.DAMAGES)
      const actions = damages.map((dmg) => ({
        id: `damage-${dmg.id}`,
        name: game.i18n.localize(dmg.label),
        info1: { text: this.actor.system.attributes[dmg.id].value || "0" },
        system: { actionType: "damage", actionId: dmg.id },
      }))
      this.addActions(actions, { id: "damage", type: "system" })
    }

    #buildWeapons() {
      const weapons = this.actor.items.filter((i) => i.type === "weapon")
      const actions = weapons.map((weapon) => {
        const range = weapon.system.range
        const saveId = MELEE_RANGES.has(range) ? "str" : "dex"
        const rangeLabel = range ? game.i18n.localize(SYSTEM.RANGE[range]?.label ?? "") : ""
        return {
          id: `weapons-${weapon.id}`,
          name: weapon.name,
          img: weapon.img,
          info1: weapon.system.dice ? { text: weapon.system.dice } : undefined,
          info2: rangeLabel ? { text: rangeLabel } : undefined,
          tooltip: weapon.system.description ? { content: weapon.system.description, direction: "UP" } : undefined,
          system: { actionType: "weapon", actionId: weapon.id, saveId },
        }
      })
      this.addActions(actions, { id: "weapons", type: "system" })
    }

    #buildItems() {
      const items = this.actor.items.filter((i) => i.type === "item")
      const actions = items.map((item) => ({
        id: `items-${item.id}`,
        name: item.name,
        img: item.img,
        info1: item.system.dice && item.system.dice !== "0" ? { text: item.system.dice } : undefined,
        tooltip: item.system.description ? { content: item.system.description, direction: "UP" } : undefined,
        system: { actionType: "item", actionId: item.id },
      }))
      this.addActions(actions, { id: "items", type: "system" })
    }

    #buildAbilities() {
      const abilities = this.actor.items.filter((i) => i.type === "ability")
      const actions = abilities.map((ability) => {
        const uses = ability.system.uses
        const hasUses = uses.max > 0
        return {
          id: `abilities-${ability.id}`,
          name: ability.name,
          img: ability.img,
          info1: hasUses ? { text: `${uses.value}/${uses.max}` } : undefined,
          cssClass: hasUses && uses.value === 0 ? "disabled" : "",
          tooltip: ability.system.description ? { content: ability.system.description, direction: "UP" } : undefined,
          system: { actionType: "ability", actionId: ability.id },
        }
      })
      this.addActions(actions, { id: "abilities", type: "system" })
    }

    #buildMagic() {
      const magics = this.actor.items.filter((i) => i.type === "magic")
      const spells = magics.filter((m) => m.system.subtype === "spell")
      const rituals = magics.filter((m) => m.system.subtype === "ritual")

      if (spells.length > 0) {
        const actions = spells.map((spell) => ({
          id: `spells-${spell.id}`,
          name: spell.name,
          img: spell.img,
          info1: spell.system.dice ? { text: spell.system.dice } : undefined,
          tooltip: spell.system.description ? { content: spell.system.description, direction: "UP" } : undefined,
          system: { actionType: "magic", actionId: spell.id },
        }))
        this.addActions(actions, { id: "spells", type: "system" })
      }

      if (rituals.length > 0) {
        const actions = rituals.map((ritual) => ({
          id: `rituals-${ritual.id}`,
          name: ritual.name,
          img: ritual.img,
          info1: ritual.system.dice ? { text: ritual.system.dice } : undefined,
          tooltip: ritual.system.description ? { content: ritual.system.description, direction: "UP" } : undefined,
          system: { actionType: "magic", actionId: ritual.id },
        }))
        this.addActions(actions, { id: "rituals", type: "system" })
      }
    }

    #buildAttacks() {
      const attacks = this.actor.items.filter((i) => i.type === "attack")
      const actions = attacks.map((attack) => ({
        id: `attacks-${attack.id}`,
        name: attack.name,
        img: attack.img,
        info1: { text: `${attack.system.nb}x` },
        info2: attack.system.hasDamageDice ? { text: attack.system.damageDice } : { text: `${attack.system.damage}` },
        tooltip: attack.system.description ? { content: attack.system.description, direction: "UP" } : undefined,
        system: { actionType: "attack", actionId: attack.id },
      }))
      this.addActions(actions, { id: "attacks", type: "system" })
    }

    #buildOpponentAbilities() {
      const abilities = this.actor.items.filter((i) => i.type === "opponentAbility")
      const actions = abilities.map((ability) => {
        const uses = ability.system.uses
        const hasUses = uses.max > 0
        return {
          id: `opponentAbilities-${ability.id}`,
          name: ability.name,
          img: ability.img,
          info1: hasUses ? { text: `${uses.value}/${uses.max}` } : undefined,
          tooltip: ability.system.description ? { content: ability.system.description, direction: "UP" } : undefined,
          system: { actionType: "ability", actionId: ability.id },
        }
      })
      this.addActions(actions, { id: "opponentAbilities", type: "system" })
    }
  }
}
