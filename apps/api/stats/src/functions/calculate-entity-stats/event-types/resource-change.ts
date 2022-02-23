import { evaluate, parse } from 'mathjs';

export const parseResourceChange = (
  resources = new Map(),
  planetInfo,
  planetEvent
) => {
  const existingResources = new Map(resources);
  const { initialAmount, resource } =
    planetInfo.data.planet.planetResources.find(
      (pr) =>
        pr.resource.id ===
        planetEvent.secondaryEntityId
    ) || {};

  if (!initialAmount || !resource) {
    throw new Error(
      `This resource: ${planetEvent.secondaryEntityId} was not found for this planet ${planetEvent.entityId}`
    );
  }

  const resourceExistsInStats =
    existingResources.has(resource.id);

  if (!resourceExistsInStats) {
    existingResources.set(
      resource.id,
      evaluate(
        parse(
          `${initialAmount}${planetEvent.valueChange}`
        ).toString()
      )
    );
  } else {
    existingResources.set(
      resource.id,
      evaluate(
        parse(
          `${existingResources.get(resource.id)}${
            planetEvent.valueChange
          }`
        ).toString()
      )
    );
  }

  return existingResources;
};
