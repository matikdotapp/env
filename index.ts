import fs from 'fs'
const { spawnSync } = Bun;
import { 
  repositoryArray, 
  repositoryOrigin, 
  type Repository 
} from './repository.config';


async function pullRepositories(arr: Repository[] = []) {
  if (arr.length < 1) {
    console.error('no reporisitory to pull');
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    const { 
      name, 
      runtime, 
      directory_level 
    } = arr[i]

    const currentDir  = process.cwd();
    const url         = [repositoryOrigin, '/', name, '.git'].join('')
    const directory   = directory_level > 1 ? `./services/${name}` : `./${name}`; 

    // skip existing directory
    if (fs.existsSync(directory)) {
      console.log(`Directory ${directory} already exists. Skipping.`);
      continue;
    }

    // ---------- Cloning the repo
    const cloneProcess = spawnSync(['git', 'clone', url, directory])
    // Check for any errors during cloning
    if (cloneProcess.exitCode !== 0) {
      console.error(`Error cloning repository ${name}:`, cloneProcess.stderr?.toString());
      continue; // Skip this repository and move to the next
    }
    console.log(`Successfully cloned ${name}`);

    // ---------- Install dependencies
    // Change the current directory to the cloned repository folder
    process.chdir(directory);

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

pullRepositories(repositoryArray)