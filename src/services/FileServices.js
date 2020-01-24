import fs from 'fs';
import { parseISO } from 'date-fns';
import jsonfile from 'jsonfile';

class FileServices {
  constructor() {
    this.path = null;
    this.filenames = null;
    this.foundFiles = [];
    this.filename = `${process.env.PATH_LOCAL} data.json`;
  }

  async readFile() {
    let data = [];
    try {
      data = await jsonfile.readFile(this.filename);
    } catch (error) {
      console.log(error);
    }
    return data;
  }

  async writeFile(data) {
    await jsonfile.writeFile(this.filename, data, { spacer: 2 });
  }

  async find({ path, filenames }) {
    this.path = path;
    this.filenames = filenames;
    this.foundFiles = [];

    const dirFiles = fs.readdirSync(path);

    const history = await this.readFile();

    filenames.forEach(filename => {
      const found = dirFiles.find(dirFile => dirFile === filename);
      const historyFile = history.find(file => file.name === filename);

      const file = {
        name: filename,
        exists: !!found,
        date: historyFile ? parseISO(historyFile.date) : null,
        dateString: historyFile ? historyFile.dateString : null,
      };
      this.foundFiles.push(file);
    });

    return this.foundFiles;
  }

  copy(filename) {
    fs.copyFileSync(
      process.env.PATH_LOCAL + filename,
      process.env.PATH_SERVER + filename
    );
  }
}

export default new FileServices();
