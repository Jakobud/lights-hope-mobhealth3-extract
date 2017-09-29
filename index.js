'use strict'

const fs = require('fs')

// Database config
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'elysium'
  },
  pool: { min: 0, max: 7 }
})

let database = []
let names = []
let i
let health

// Extract NPC name, levels and health values from the Elysium database
knex
  .select('c.entry', 'c.name', 'c.minlevel', 'c.maxlevel', 'c.minhealth', 'c.maxhealth')
  .from('creature_template AS c')
  .then(mobs => {

    for (let mob of mobs) {
      // Find average npc hitpoints
      if (mob.minhealth !== mob.maxhealth) {
        health = Math.round((mob.maxhealth + mob.minhealth) / 2)
      } else {
        health = Math.round(mob.minhealth)
      }

      // Push to database
      for (i = mob.minlevel; i <= mob.maxlevel; i++) {
        database[mob.name + ":" + i] = health
        names.push(mob.name + ":" + i)
      }
    }

    // Sort by name
    names = names.sort()

    // Write to lua file
    let output = "MobHealth3DB = {\n"
    for (let name of names) {
      output += '\t["' + name.replace(/\"/g, '\\"') + '"] = ' + database[name] + ",\n"
    }
    output += "}\n"
    fs.writeFile('MobHealth.lua', output)

  })
knex.destroy()