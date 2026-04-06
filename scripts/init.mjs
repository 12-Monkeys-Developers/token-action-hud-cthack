import { MODULE_ID, REQUIRED_CORE_MODULE_VERSION } from "./constants.mjs"
import { createSystemManager, SystemManager } from "./system-manager.mjs"
import { createActionHandler } from "./action-handler.mjs"
import { createRollHandler } from "./roll-handler.mjs"

Hooks.once("tokenActionHudCoreApiReady", (coreModule) => {
  const coreApi = coreModule.api

  createActionHandler(coreApi)
  createRollHandler(coreApi)
  createSystemManager(coreApi)

  const module = game.modules.get(MODULE_ID)
  module.api = {
    requiredCoreModuleVersion: REQUIRED_CORE_MODULE_VERSION,
    SystemManager,
  }

  Hooks.call("tokenActionHudSystemReady", module)
})

Hooks.once("tokenActionHudSystemReady", () => {
  console.log("Token Action HUD | Cthulhu Hack module ready")
})
