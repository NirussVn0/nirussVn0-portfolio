import type { Metadata } from 'next';

import { ProjectCatalog } from '@/components/projects/ProjectCatalog';
import {
  PROJECTS,
  PROJECT_TYPES,
  TECHNOLOGIES,
  TOOL_STACK_GROUPS,
} from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects • NirussVn0',
  description:
    'Dive into NirussVn0’s project matrix. Explore builds by type, stack, and toolkit with live demos and source code.',
};

export default function ProjectsPage() {
  return (
    <ProjectCatalog
      projects={PROJECTS}
      projectTypes={PROJECT_TYPES}
      technologies={TECHNOLOGIES}
      toolStacks={TOOL_STACK_GROUPS}
    />
  );
}
