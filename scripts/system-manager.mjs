import { ActionHandler } from "./action-handler.mjs"
import { RollHandler } from "./roll-handler.mjs"
import { getDefaults } from "./defaults.mjs"

export let SystemManager = null

export function createSystemManager(api) {
  SystemManager = class CthackSystemManager extends api.SystemManager {
    getActionHandler() {
      return new ActionHandler()
    }

    getAvailableRollHandlers() {
      return { core: "Cthulhu Hack" }
    }

    getRollHandler(handlerId) {
      return new RollHandler()
    }

    async registerDefaults() {
      return getDefaults(api.Utils)
    }
  }
}
