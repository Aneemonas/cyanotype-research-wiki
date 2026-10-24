# Researching a node

Clicking a node opens its details in the side panel. There you find its icon, its title and its description, which can be coloured and run to several lines, then the **requirements** with their progress (`3/10`), the **rewards**, and the research button.

::video player-researching "Holding the button until the ring fills"

## Hold to research

Researching takes a deliberate press: you **hold** the button, or the node itself, until the ring around it fills. The default is 900 ms and you can set anything from 100 to 3000 ms in the [preferences](player/preferences). The delay exists so that a stray click in a crowded tree cannot spend your iron.

Items come out of your inventory and XP levels are spent, except in creative, where nothing is paid. Requirements that are not about paying, such as kills, looking at a block, standing in a place, a biome or a timer, fill in **by themselves while you play**, but only once the node is available. A few are clicked, and a checkmark task has its own button in the panel. Others are delivered, which means you feed the machine rather than carrying anything, see [feeding](player/feeding).

## Choices

If the node has a **Choice** reward, a window asks you to pick one option for each choice before the node completes. Cancelling it leaves everything untouched and nothing is paid. A **wheel** reward needs no input, because it gives one reward chosen at random with the weights the author set.

## Collect All

The *Collect All* button completes, in order, every node that is available and that you can afford, in a single click. It stops to ask when it reaches a node with a Choice reward.

## Feedback

Each research plays a sound, and a floating `+XP` rises from the node. Finishing several nodes in quick succession builds a combo counter, and toasts can announce what a node has unlocked.

:::note
Progress on tasks such as kills, looking at blocks, timers and bringing something near the machine only counts **while the node is available to you**, and it is checked once a second, so a very short event can be missed. Requirements that read a current state, such as items you hold, advancements, statistics, stages and your lab level, are valid at once, with no waiting.
:::
