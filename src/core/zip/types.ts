export type ZipDirectoryTarget = {
  path: string;
  name?: string;
  remove?: boolean;
};

export type ZipFileTarget = {
  path: string;
  name: string;
  remove?: boolean;
};

export type ZipOptions = {
  files?: ZipFileTarget[];
  directories?: ZipDirectoryTarget[];
};
