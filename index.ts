import fs from 'fs'
const { spawnSync } = Bun;
const repositoryOrigin = import.meta.env.REPOSITORY_ORIGIN;

interface Repository {
  name: string;
  runtime: 'npm' | 'bun';
}

const repositories: Repository[] = [
  {
    name    : 'database', // actual repo name
    runtime : 'npm'
  }
]

async function pullRepositories(arr: Repository[] = []) {
  if (arr.length < 1) {
    console.error('no reporisitory to pull');
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    const { name, runtime } = arr[i]
    const currentDir  = process.cwd();
    const url         = new URL(name + '.git', repositoryOrigin).toString()

    // skip existing directory
    if (fs.existsSync(`./${name}`)) {
      console.log(`Directory ./ ${name} already exists. Skipping.`);
      continue;
    }

    // ---------- Cloning the repo
    const cloneProcess = spawnSync(['git', 'clone', url, `./${name}`])
    // Check for any errors during cloning
    if (cloneProcess.exitCode !== 0) {
      console.error(`Error cloning repository ${name}:`, cloneProcess.stderr?.toString());
      continue; // Skip this repository and move to the next
    }
    console.log(`Successfully cloned ${name}`);

    // ---------- Install dependencies
    // Change the current directory to the cloned repository folder
    process.chdir(`./${name}`);

    // Run the install command
    const installProcess = spawnSync([runtime, 'install']);

    // Check if the install process has an error
    if (installProcess.exitCode !== 0) {
      console.error(`Error installing dependencies for ${name}:`, installProcess.stderr?.toString());
    } else {
      console.log(`Successfully installed dependencies for ${name}`);
    }

    // Return to the original directory
    process.chdir(currentDir);
  }
}

pullRepositories(repositories)