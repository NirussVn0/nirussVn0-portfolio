import { PROJECTS, PROJECT_TYPES, TECHNOLOGIES } from './catalog';
import type { Project, ProjectTypeId, Technology } from './types';

const createLookup = <T extends { id: string }>(items: readonly T[]) =>
  items.reduce<Record<string, T>>((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

export const PROJECT_TYPE_LOOKUP = Object.freeze(createLookup(PROJECT_TYPES));
export const TECHNOLOGY_LOOKUP = Object.freeze(createLookup(TECHNOLOGIES));

export const FEATURED_PROJECTS: readonly Project[] = Object.freeze(
  PROJECTS.filter((project) => project.featured)
);

export const resolveProjectTypeLabels = (typeIds: ProjectTypeId[]): string[] =>
  typeIds
    .map((typeId) => PROJECT_TYPE_LOOKUP[typeId]?.label ?? typeId)
    .filter(Boolean);

export const resolveProjectTechnologies = (techIds: string[]): Technology[] =>
  techIds
    .map((techId) => TECHNOLOGY_LOOKUP[techId])
    .filter(Boolean);
