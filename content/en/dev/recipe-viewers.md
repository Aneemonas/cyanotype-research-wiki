# JEI, EMI and REI

JEI, EMI and REI are optional, both when the mod is built and when it runs. With one of them installed, the mod hides locked recipes in it and removes the viewer's overlay from the machine screen, where it would only get in the way. REI is supported on Fabric only.

## How the recipes reach the viewer

A viewer shows the recipes that the client received from the server. Since 0.22.8 the server sends the client the full recipe list, including the recipes that the world layer of the lock has removed from the server, and the client hides the ones the player has not researched. That is what lets a recipe appear the moment a node is completed, without logging out and without reloading the viewer, because the client already has it and only has to stop hiding it. The recipe lock itself is explained in [restrictions](dev/restrictions).

## JEI

JEI is updated live through its runtime API. Vanilla categories are addressed by constant and modded categories by an id lookup that uses reflection, which is why some categories of other mods can behave differently from the vanilla ones. A mod that builds its JEI categories once at start and never refreshes them may keep showing the state it had at start until the next full reload of JEI. If one modded category lags behind the others, that is the reason.

## EMI

The EMI plugin removes recipes whose output is locked every time EMI reloads. For live changes, the mod keeps every recipe that the load saw. When the locks change, it builds a new recipe manager without the locked recipes and swaps it in by reflection. If anything looks different from what the mod expects, it reports a failure, and the mod does one normal reload after the screen closes (`emi_reload`).

The padlock in the EMI item index is drawn with two mixins, one around the start and end of a batch and one around the amount render. If EMI changes those methods in a later version, the padlock silently stops appearing, although the hiding of recipes keeps working.

:::warning
The EMI live update works by reflection on EMI internals, so a different EMI version can break it. When that happens the mod falls back to a normal reload and nothing is lost, but the update is no longer instant.
:::

## REI

The REI plugin does two things. It tells REI not to overlay the machine screen, so the entry list and the favorites panel never appear there and never take clicks or scrolling away from the Codex and the popups. And it adds a display visibility rule: a recipe whose output is locked for the player is not shown, whichever way it is made.

The rule is evaluated every time REI shows a recipe, so locking a recipe takes effect at once. The other direction needs more. REI builds its recipes when it loads, from what the client has at that moment, and a recipe that was hidden then does not exist in REI. When a node is completed and recipes come back, the mod asks REI to reload, a fraction of a second later so that several unlocks share one reload. That call is an internal one, and the reload takes a moment during which REI is empty.

## Client options

Both are in the General tab of the [preferences](player/preferences) and are on by default. *EMI live update* swaps the recipe manager without a reload, and *EMI reload after unlock* does one normal reload when the screen closes if the live update failed or what is hidden has changed.

## If a recipe shows up when it should not

Start with `/cyanotype recipes check <item>`, which reports what the lock thinks about that item. Then close and reopen the viewer, since some viewers keep their own cache until the next open. If a mod that caches recipes, such as Create or FastSuite, is involved, try the `recipe_lock_world_reload` setting described in [restrictions](dev/restrictions).
