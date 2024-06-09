import fs from 'node:fs/promises';
import path from 'node:path';

// const content = fs.readFileSync('text.txt');

// console.log(content.toString());

// const workdir = path.join(process.cwd());
// const filePath = path.join(workdir, 'src', 'text.txt');
// console.log(workdir);

// ****** sync method ********

// const content = fs.readFileSync(filePath);
// console.log(content.toString());

// ****** callback method ********

// fs.readFile(filePath, (error, data) => {
//   fs.writeFile('src/output.txt', data, (err) => {
//     console.log('write');
//   });
//   console.log('read');
//   console.log('data in file', data.toString());
// });

// console.log('finish');

// ****** async method ********

// const content = await fs.readFile(filePath, 'utf-8');
// console.log(content);

// !!!!!!!!!!!!!!!!!

const workdir = path.join(process.cwd());
const filePath = path.join(workdir, 'src', 'text.txt');

const fileOperation = async ({ action, data, pathLink }) => {
  switch (action) {
    case 'read': {
      const result = await fs.readFile(filePath, 'utf-8');
      console.log(result);
      break;
    }

    case 'add': {
      await fs.appendFile(filePath, data);
      console.log('Content appended');
      break;
    }

    case 'replace': {
      await fs.writeFile(filePath, data);
      console.log('Content replaced');
      break;
    }

    case 'rename': {
      await fs.rename(filePath, data);
      console.log('File renamed');
      break;
    }

    case 'delete': {
      await fs.unlink(pathLink);
      console.log('File deleted');
      break;
    }
    case 'canAccess': {
      try {
        await fs.access(pathLink);
        console.log(`File in ${pathLink} is accessible`);
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.log(`File in ${pathLink} doesn't exist`);
        } else {
          console.log('Something happened');
        }
        console.log(error);
      }
      break;
    }
    case 'readDir':
      {
        const files = await fs.readdir(pathLink);
        console.log(`Files in directory ${pathLink}:`, files);
      }
      break;

    default:
      console.log('Unknown operation');
      break;
  }
};

// fileOperation({ action: 'read' });
// fileOperation({ action: 'add' });
// fileOperation({ action: 'replace' });
// fileOperation({ action: 'rename' });
// fileOperation({ action: 'delete' });
// fileOperation({ action: 'canAccess' });
// fileOperation({ action: 'readDir', pathLink: (process.cwd(), 'src') });
