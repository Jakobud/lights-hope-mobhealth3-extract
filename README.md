# elysium-mobhealth3-extract
Extracts NPC health values from the Lights Hope (Elysium) (Mangos) database and generates a file for MobHealth3 addon that contains all the hitpoint values for every NPC in Vanilla Wow 1.12

This repo comes with a distributable, pre-populated `MobHealth.lua` database file. To generate your own, simply run:

```
# node index.js
```

## Instructions to using the `MobHealth.lua` database file
1. Exit World of Warcraft
2. Install MobHealth 3 addon
3. Add `MobHealth.lua` to the folder `World of Warcraft/WTF/Account/<ACCOUNT NAME>/SavedVariables/`
4. Now when you log into the game, if you are using a UnitFrame addon that supports MobHealth 3, all NPCs will show their max health values.
