import 'dotenv/config';
import { isBefore } from 'date-fns';

import app from './app';
import timer from './services/Timer';
import fileServices from './services/FileServices';
import FtpServices from './services/FtpServices';

app.listen(process.env.SERVER_PORT);

async function main() {
  const filenames = [
    'PrumaViewAnalitico_Web.txt',
    'PrumaViewAnalitico_Web_VIVO2.txt',
  ];

  const ftp = new FtpServices();
  await ftp.connect();

  // Find FTP files
  global.onlineFiles = await ftp.find(filenames);

  // Find local files
  global.localFiles = await fileServices.find({
    path: process.env.PATH_LOCAL,
    filenames,
  });

  let isUpdating = false;

  for (const filename of filenames) {
    const onlineFile = global.onlineFiles.find(f => f.name === filename);
    const localFile = global.localFiles.find(f => f.name === filename);

    if (
      (onlineFile.exists && !localFile.exists) ||
      isBefore(localFile.date, onlineFile.date)
    ) {
      console.log(`Copiando arquivo ${filename}`);
      isUpdating = true;
      await ftp.download(filename);
      fileServices.copy(filename);
    }
  }

  if (isUpdating) fileServices.writeFile(global.onlineFiles);

  await ftp.disconnect();
}

main();

timer.start({
  interval: 300000, // 5 minutos
  callback: () => {
    main();
  },
});
