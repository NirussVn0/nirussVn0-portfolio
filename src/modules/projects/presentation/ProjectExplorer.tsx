'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ProjectCatalogService, type ProjectCatalogDto } from '@/application/projects/ProjectCatalogService';
import { StaticProjectRepository } from '@/infrastructure/projects/StaticProjectRepository';
import { ProjectCatalogController } from '@/modules/projects/controllers/ProjectCatalogController';
import { ProjectFilterState } from '@/modules/projects/state/ProjectFilterState';
import { ProjectFilterPanel } from '@/components/projects/ProjectFilterPanel';
import { ProjectShowcaseCard } from '@/components/projects/ProjectShowcaseCard';
import { ToolPaletteService, type ToolPaletteDto } from '@/application/tools/ToolPaletteService';
import { StaticToolRepository } from '@/infrastructure/tools/StaticToolRepository';
import { ToolPaletteController } from '@/modules/tools/controllers/ToolPaletteController';
import { ToolStackShowcase } from '@/components/tools/ToolStackShowcase';

export function ProjectExplorer() {
  const projectController = useMemo(
    () =>
      new ProjectCatalogController(
        new ProjectCatalogService(new StaticProjectRepository())
      ),
    []
  );
  const toolController = useMemo(
    () =>
      new ToolPaletteController(
        new ToolPaletteService(new StaticToolRepository())
      ),
    []
  );

  const [catalog, setCatalog] = useState<ProjectCatalogDto | null>(null);
  const [toolGroups, setToolGroups] = useState<ToolPaletteDto[]>([]);
  const [filterState, setFilterState] = useState<ProjectFilterState>(() =>
    ProjectFilterState.empty()
  );
  const [isReady, setIsReady] = useState(false);
  const requestIdRef = useRef(0);

  useEffect(() => {
    let isMounted = true;

    void toolController.loadPalette().then((groups) => {
      if (isMounted) {
        setToolGroups(groups);
      }
    });

    void projectController.initialize().then((data) => {
      if (isMounted) {
        setCatalog(data);
        setFilterState(ProjectFilterState.empty());
        setIsReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [projectController, toolController]);

  const runFilter = useCallback(
    (state: ProjectFilterState) => {
      const requestId = ++requestIdRef.current;

      void projectController.applyFilter(state).then((data) => {
        if (requestId === requestIdRef.current) {
          setCatalog(data);
        }
      });
    },
    [projectController]
  );

  const handleCategoryToggle = useCallback(
    (slug: string) => {
      setFilterState((previous) => {
        const next = previous.toggleCategory(slug);
        runFilter(next);
        return next;
      });
    },
    [runFilter]
  );

  const handleLanguageToggle = useCallback(
    (slug: string) => {
      setFilterState((previous) => {
        const next = previous.toggleLanguage(slug);
        runFilter(next);
        return next;
      });
    },
    [runFilter]
  );

  const handleReset = useCallback(() => {
    const empty = ProjectFilterState.empty();
    setFilterState(empty);
    runFilter(empty);
  }, [runFilter]);

  if (!isReady || !catalog) {
    return (
      <div className="space-y-8">
        <div className="h-14 w-3/4 rounded-2xl bg-muted/40" />
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-64 rounded-2xl bg-muted/30" />
          ))}
        </div>
      </div>
    );
  }

  const activeCategories = filterState.getCategorySlugs();
  const activeLanguages = filterState.getLanguageSlugs();
  const projects = catalog.projects;

  return (
    <div className="space-y-12">
      <header className="space-y-4 rounded-2xl border border-border/60 bg-background/50 p-8 backdrop-blur">
        <div className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
          Matrix Archive
        </div>
        <h1 className="text-4xl font-bold uppercase tracking-[0.2em]">
          Project Hypergrid
        </h1>
        <p className="max-w-3xl text-base text-muted-foreground">
          Filter by vibe, stack, and mission to discover each build in the matrix. Every project couples thoughtful design with high-signal engineering narratives.
        </p>
      </header>

      <ToolStackShowcase groups={toolGroups} />

      <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <ProjectFilterPanel
          categories={catalog.facets.categories}
          languages={catalog.facets.languages}
          activeCategories={activeCategories}
          activeLanguages={activeLanguages}
          onCategoryToggle={handleCategoryToggle}
          onLanguageToggle={handleLanguageToggle}
          onReset={handleReset}
        />

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              {projects.length} projects
            </span>
            {activeCategories.length + activeLanguages.length > 0 ? (
              <span className="text-xs uppercase tracking-[0.3em] text-foreground">
                Active filters: {activeCategories.length + activeLanguages.length}
              </span>
            ) : (
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                All signals
              </span>
            )}
          </div>

          {projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 p-12 text-center text-sm text-muted-foreground">
              No projects match the current tags. Flip a different combination to reveal a new dimension.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project, index) => (
                <ProjectShowcaseCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
