import fs from 'fs';
import PromiseFtp from 'promise-ftp';
import { format } from 'date-fns';

class FtpServices {
  constructor() {
    this.ftp = new PromiseFtp();
  }

  async connect() {
    await this.ftp.connect({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASS,
    });
  }

  async disconnect() {
    await this.ftp.end();
  }

  async find(filenames) {
    const result = await this.ftp.list('/');
    const ftpFiles = result.map(file => {
      const { name, date } = file;
      return { name, date };
    });

    const foundFiles = [];

    filenames.forEach(filename => {
      const found = ftpFiles.find(ftpFile => ftpFile.name === filename);
      const date = found ? found.date : null;

      const file = {
        name: filename,
        exists: !!found,
        date,
        dateString: found ? format(date, 'dd/MM/yyyy HH:mm:ss') : null,
      };
      foundFiles.push(file);
    });

    return foundFiles;
  }

  async download(filename) {
    try {
      const stream = await this.ftp.get(filename);
      await new Promise((resolve, reject) => {
        stream.once('close', resolve);
        stream.once('error', reject);
        stream.pipe(fs.createWriteStream(process.env.PATH_LOCAL + filename));
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export default FtpServices;
