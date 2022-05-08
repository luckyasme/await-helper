import fs from 'fs';
import path from 'path';
import tsconfig from '../tsconfig.json';

export const rm = (target: string) => {
  if (fs.statSync(target).isFile()) {
    fs.unlinkSync(target);
  } else {
    fs.readdirSync(target)
      .map((e) => path.join(target, e))
      .forEach((e) => rm(e));
    fs.rmdirSync(target);
  }
};

try {
  const outDir = tsconfig.compilerOptions.outDir;
  if (fs.existsSync(outDir)) {
    rm(outDir);
  }
} catch (e) {
  console.log(e);
}
