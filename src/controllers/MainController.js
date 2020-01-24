import path from 'path';

class MainController {
  index(req, res) {
    return res.sendFile(path.join(__dirname, '../views/index.html'));
  }

  status(req, res) {
    return res.json({
      onlineFiles: global.onlineFiles,
      localFiles: global.localFiles,
    });
  }
}

export default new MainController();
