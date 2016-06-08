# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Term.create!(
  name: "Spritzer",
  definition: "a housewife's best friend",
  sentence: "I'll have anotha spritzah!",
  user_id: 1
  )

Term.create!(
  name: "Curfew",
  definition: "A variable pertaining to when teens need to be home.",
  sentence: "Ugh, how come your curfew is 10. Nerd",
  user_id: 1
  )

Term.create!(
  name: "Minivan",
  definition: "The vessel in which we drive our 2 kids around.",
  sentence: "Billy, pick up your goldfish off of the minivan floor!",
  user_id: 1
  )

User.create!(
  username: "Guest",
  password: "password",
)
