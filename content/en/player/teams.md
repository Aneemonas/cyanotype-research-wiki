# Teams

::video player-teams "Creating a team, inviting a friend and sharing progress"

The **Team** button on the machine screen creates a team and invites other players by name. The invited player receives chat buttons to accept or decline, and an invitation expires after 10 minutes. The maximum number of members is set by the pack, 8 by default and anywhere from 2 to 64.

## What is shared

When one member completes a node it counts as completed for everybody on the team, and the stages and restrictions that come with it follow, so a recipe unlocked by one teammate is unlocked for all. Whether the **rewards** also go to everybody or only to the player who collected is a pack setting. A member who is offline when it happens receives everything at the next login.

A player who joins an existing team is brought up to the team's progress without being paid the old rewards. The dev reset of a node or a tree is applied to teammates as well.

Not everything is shared. Nodes marked **personal** are never copied to the team, so each member has to do them. A teammate who already took the other branch of an exclusion keeps their own choice, and the shared completion does not override it.

:::note
A requirement such as "blocks placed (total)" reads each player's own statistics. The first teammate to reach the number completes the node for the whole team, so the work of several players is not added together.
:::

## Commands behind the chat buttons

`/cyanoteam accept <id>`, `/cyanoteam decline <id>` and `/cyanoteam leave` exist for the invitation buttons, and any player can use them, operator or not.
