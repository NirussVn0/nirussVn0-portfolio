import { ProjectDataManager } from '@/application/projects/ProjectDataManager';
import { ProjectCatalogService } from '@/application/projects/ProjectCatalogService';
import { ProjectRefreshService } from '@/application/projects/ProjectRefreshService';
import { ProjectCatalogController } from '@/modules/projects/controllers/ProjectCatalogController';
import { ProjectRefreshController } from '@/modules/projects/controllers/ProjectRefreshController';
import { EnvProjectProfileProvider } from '@/infrastructure/projects/EnvProjectProfileProvider';
import { RemoteProjectRepository } from '@/infrastructure/projects/RemoteProjectRepository';
import { GitHubProjectDataSource } from '@/infrastructure/projects/sources/GitHubProjectDataSource';
import { HuggingFaceModelDataSource } from '@/infrastructure/projects/sources/HuggingFaceModelDataSource';
import { HuggingFaceSpaceDataSource } from '@/infrastructure/projects/sources/HuggingFaceSpaceDataSource';
import { FetchHttpClient } from '@/infrastructure/shared/FetchHttpClient';

export interface ProjectControllers {
  catalog: ProjectCatalogController;
  refresh: ProjectRefreshController;
}

export function createProjectControllers(): ProjectControllers {
  const httpClient = new FetchHttpClient();
  const sources = [
    new GitHubProjectDataSource(httpClient, {
      authToken: process.env.NEXT_PUBLIC_PROJECT_GITHUB_TOKEN,
    }),
    new HuggingFaceModelDataSource(httpClient),
    new HuggingFaceSpaceDataSource(httpClient),
  ];

  const dataManager = new ProjectDataManager(sources);
  const profileProvider = new EnvProjectProfileProvider();
  const repository = new RemoteProjectRepository(dataManager, profileProvider);
  const refreshService = new ProjectRefreshService(repository);
  const catalogService = new ProjectCatalogService(refreshService);

  return {
    catalog: new ProjectCatalogController(catalogService),
    refresh: new ProjectRefreshController(catalogService),
  };
}
