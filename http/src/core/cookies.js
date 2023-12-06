import fs, { writeFileSync } from 'fs';

const PATH = './.cookies';

export class Cookies {
  static get() {
    if (fs.existsSync(PATH) === false) {
      writeFileSync(PATH, '', 'utf-8');
    }

    return fs.readFileSync(PATH, 'utf-8').toString();
  }

  static set(cookies) {
    if (cookies == null) {
      return;
    }

    fs.writeFileSync(PATH, cookies.map((cookie) => cookie.split('; ')[0]).join('; '), 'utf-8');
  }
}
