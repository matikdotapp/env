const repositoryOrigin = import.meta.env.REPOSITORY_ORIGIN;

export interface Repository {
  name: string;
  runtime: 'npm' | 'bun';
  directory_level: number;
}

const repositoryArray: Repository[] = [
  {
    name            : 'database', // actual repo name
    runtime         : 'npm',
    directory_level : 1
  },
  {
    name            : 'frontend', // actual repo name
    runtime         : 'npm',
    directory_level : 1
  },
  {
    name            : 'gateway', // actual repo name
    runtime         : 'npm',
    directory_level : 1
  },
  {
    name            : 'auth', // actual repo name
    runtime         : 'npm',
    directory_level : 3
  },
  {
    name            : 'bots', // actual repo name
    runtime         : 'npm',
    directory_level : 3
  }
]

export { repositoryArray, repositoryOrigin }