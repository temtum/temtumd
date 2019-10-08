import { exec } from 'child_process';

const runCommand = (command, options = {}) => {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      return resolve(stdout ? stdout : stderr);
    });
  });
};

export default runCommand;
