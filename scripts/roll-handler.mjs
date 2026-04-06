export let RollHandler = null

export function createRollHandler(api) {
  RollHandler = class CthackRollHandler extends api.RollHandler {
    async handleActionClick(event, encodedValue) {
      const { actionType, actionId } = this.action.system

      if (!this.actor) {
        for (const token of this.tokens) {
          const actor = token.actor
          if (actor) await this.#handleAction(actor, actionType, actionId)
        }
        return
      }

      await this.#handleAction(this.actor, actionType, actionId)
    }

    async #handleAction(actor, actionType, actionId) {
      if (this.isRightClick) {
        return this.#openSheet(actor, actionType, actionId)
      }

      switch (actionType) {
        case "save":
          return await actor.rollSave(actionId)
        case "resource":
          return await actor.rollResource(actionId)
        case "damage":
          return await actor.rollDamage(actionId)
        case "weapon":
          return await this.#handleWeapon(actor, actionId)
        case "attack":
          return await this.#handleAttack(actor, actionId)
        case "item":
          return await this.#handleItem(actor, actionId)
        case "ability":
          return await this.#handleAbility(actor, actionId)
        case "magic":
          return await this.#handleMagic(actor, actionId)
      }
    }

    async #handleWeapon(actor, itemId) {
      const item = actor.items.get(itemId)
      if (!item) return
      const saveId = this.action.system.saveId
      return await actor.rollSave(saveId, { isWeaponRoll: true, itemName: item.name })
    }

    async #handleAttack(actor, itemId) {
      const item = actor.items.get(itemId)
      if (!item) return
      const value = item.system.damageDice !== "0" ? item.system.damageDice : item.system.damage
      return await actor.system.rollAttack(value, item.name)
    }

    async #handleItem(actor, itemId) {
      const item = actor.items.get(itemId)
      if (!item) return
      return await actor.rollMaterial(item)
    }

    async #handleAbility(actor, itemId) {
      const item = actor.items.get(itemId)
      if (!item) return
      return actor.useAbility(item)
    }

    async #handleMagic(actor, itemId) {
      const item = actor.items.get(itemId)
      if (!item) return
      return await actor.rollSanity(item)
    }

    #openSheet(actor, actionType, actionId) {
      if (["weapon", "attack", "item", "ability", "magic"].includes(actionType)) {
        const item = actor.items.get(actionId)
        if (item) item.sheet.render(true)
      } else {
        actor.sheet.render(true)
      }
    }
  }
}
