export type ProjectTypeId =
  | 'ai-development'
  | 'web-development'
  | 'tooling'
  | 'software'
  | 'minimal-app';

export interface ProjectType {
  id: ProjectTypeId;
  label: string;
  description: string;
}

export type TechnologyCategory = 'frontend' | 'backend' | 'sql' | 'tooling';

export interface Technology {
  id: string;
  label: string;
  category: TechnologyCategory;
  icon: string;
}

export interface ToolStackGroup {
  id: string;
  label: string;
  description?: string;
  technologyIds: string[];
}

export interface Project {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  typeIds: ProjectTypeId[];
  techIds: string[];
  image: string;
  link?: string;
  repo?: string;
  featured?: boolean;
}
