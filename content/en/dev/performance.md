# Performance

## Server cost

The server side of the mod is event driven. The one steady cost is the task poll, which runs once per player per second, and recipe work only happens when progress changes. Since 0.20.3 the poll walks only the nodes that have requirements and are currently available, from a list that is cached per player and tree, and players are spread over the second by their UUID so that their polls do not all land on the same tick. When a recipe lock changes, the player's hidden list is resent only if it really changed, which matters because clients reload JEI and EMI on every recipe packet.

I measured this on a dedicated server running only this mod and GeckoLib. A poll cost about **0.1 ms** for trees that are gated, and about **2.7 ms** in the worst case I could build, which was 9000 nodes with every requirement active at once. The idle cost of the recipe lock was below 0.1 % of the server thread.

## Profiler

The profiler measures your own pack instead of leaving you to trust those numbers.

```cyan
/cyanotype profile start
/cyanotype profile stop
/cyanotype profile stress 5 500 chain
/cyanotype profile load 50 spread
/cyanotype profile stress clear
```

`profile start` and `stop` measure the real work of the server while you play. `stress` creates large test trees, and `load` simulates many players by repeating the poll of a real one. All of it measures **server CPU**, and it does not measure the network or the packets that real clients would receive.

## Client

The size of a tree is not a problem for the client. I used trees of 2000 nodes in a single tree without trouble, so there is no need to split a tree for performance reasons alone. Split by theme when it makes the design clearer, and link the pieces with [cross-tree links](dev/cross-tree).

A weak PC with a heavy pack benefits from `blur_background` off, `fast_frames` on, a `screen_fps_limit` of about 60 and a `side_panel_scale` of 90. Every ambient effect has its own switch, listed in the [preferences](player/preferences). A 16384 px tree picture uses a lot of video memory, and the client option `tree_images` turns pictures off.

## Tips for pack makers

Locks by `modid:*` are cheap, and thousands of single-item patterns are fine as well, though named lists make them easier to maintain. Event based requirements cost nothing while idle. Proximity scans (`near_item`, `near_entity` and `container`) run only while the node is active and a player is near the machine, so a tree nobody is working on costs nothing even if it is full of scans.
