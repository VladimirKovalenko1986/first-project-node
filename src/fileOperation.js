import fs from 'node:fs/promises';
import { filePath } from '.';

export const fileOperation = async ({ action }) => {
  switch (action) {
    case 'read': {
      const result = await fs.readFile(filePath, 'utf-8');
      console.log(result);
      break;
    }

    case 'add': {
      await fs.appendFile(filePath, 'Volodymyr');
      console.log('Content appended');
      break;
    }

    case 'replace': {
      await fs.writeFile(filePath, 'New content');
      console.log('Content replaced');
      break;
    }

    case 'rename': {
      await fs.rename(filePath, 'src/text.txt');
      console.log('File renamed');
      break;
    }

    case 'delete': {
      await fs.unlink(filePath);
      console.log('File deleted');
      break;
    }

    case 'canAccess': {
      try {
        await fs.access(filePath);
        console.log(`File in ${filePath} is accessible`);
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.log(`File in ${filePath} doesn't exist`);
        } else {
          console.log('Something happened');
        }
        console.log(error);
      }
      break;
    }

    default:
      console.log('Unknown operation');
      break;
  }
};
