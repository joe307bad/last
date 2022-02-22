export const examples = [
  // planet receives more resources
  {
    "entityId": "planet_id",
    "entityType": "planet",
    "eventType": "resource_boon",
    "valueChange": "+80",
    "secondaryEntityId": "resource_id"
  },
  // ecological disaster was averted
  // some fields can be optional, like responsible house
  {
    "entityId": "planet_id",
    "entityType": "planet",
    "eventType": "ecological_disaster_averted",
    "disasterType": "mass_extinction",
    "responsibleHouseId": "house_id",
    "eventDescription": "At the last second, a doctor found an incredibly effective defence to the attack  by the evil Dr. Tornak."
  }
]
