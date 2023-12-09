import archiver from 'archiver';

import { createWriteStream, readFileSync, rmSync, unlinkSync } from 'fs';

import { ZipDirectoryTarget, ZipFileTarget, ZipOptions } from './types';

export class ZipService {
  private appendFiles(archive: archiver.Archiver, targets?: ZipFileTarget[]) {
    if (Array.isArray(targets)) {
      for (const target of targets) {
        archive.append(readFileSync(target.path), { name: target.name });

        if (target.remove === true) {
          unlinkSync(target.path);
        }
      }
    }
  }

  private appendDirectories(archive: archiver.Archiver, targets?: ZipDirectoryTarget[]) {
    if (Array.isArray(targets)) {
      for (const target of targets) {
        archive.directory(target.path, target.name ?? false);

        if (target.remove === true) {
          rmSync(target.path, { recursive: true });
        }
      }
    }
  }

  async zip(path: string, options: ZipOptions) {
    return new Promise<string | Buffer>((resolve, reject) => {
      const archive = archiver('zip', { zlib: { level: 9 } });
      const stream = archive.pipe(createWriteStream(path));

      stream.on('error', (e) => reject(e));
      stream.on('close', () => resolve(stream.path));

      this.appendFiles(archive, options.files);
      this.appendDirectories(archive, options.directories);

      archive.finalize();
    });
  }
}
