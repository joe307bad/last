export enum EventTypes {
  // planet
  'resource_change' = 'resource_change',
  'structure_change' = 'structure_change', // building bui
  'population_change' = 'population_change',

  // house and character
  'relationship_change' = 'relationship_change',
  'character_powers_gained' = 'character_powers_gained',
  'respect_from_other_houses' = 'respect_from_other_houses',

  // ecology, biodiversity
  /*
  TODO these may be better as one "general_event" type
  // this "general_event" type would have a description, a weight
  // (a general common scale to compare general_events), and a category
  // general_event data can be extracted straight from the story.yml file
  // and a script can be designed to upload them to a database
   */
  'species_change' = 'species_change',
  'species_saved' = 'species_saved',
  'ecological_disaster_averted' = 'ecological_disaster_averted',
  'biodiversity_increase' = 'biodiversity_increase',
  'abolished_mineral_mining' = 'abolished_mineral_mining',
  'increased_global_habitat_stability' = 'increased_global_habitat_stability',
  'sequester_carbon_in_growing_forests' = 'sequester_carbon_in_growing_forests',
  'started_locally_sustainable_natural_resource_based_economy' = 'started_locally_sustainable_natural_resource_based_economy',
}
