if (Meteor.isServer) {
  Meteor.methods({
    'createDescription': function(title, content) {
      check(title, String);
      check(content, String);
      Descriptions.insert({
        title: title,
        description: content
      });
    },
    'file-upload': function(path, filename, extension, data) {
      const fs = require('fs');
      fs.readdir(process.env.PWD + path, (err, files) => {
        if (files != null) {
          for (var i = 0; i < files.length; i++) {
            var original = files[i].split(".")[0];
            if (original == filename) {
              fs.unlink(process.env.PWD + path + files[i], function (err) {
                if (err) throw err;
              });
            }
          }
        }
        fs.writeFile(process.env.PWD + path + filename + "." + extension, Buffer(data,'base64'), function (err) {
          if (err) throw err;
        });
      });
    },

    'remove-file': function(path) {
      const fs = require('fs');
      fs.unlink(process.env.PWD + path, function (err) {
        if (err) throw err;
      });
    },
    'remove-empty-dir': function(path) {
      const fs = require('fs');
      fs.rmdir(process.env.PWD + path, function (err) {
        if (err) throw err;
      });
    },
    'create-directory': function(path, newFolderName) {
      const fs = require('fs');
      if(!fs.existsSync(process.env.PWD + path + newFolderName)) {
        fs.mkdirSync(process.env.PWD + path + newFolderName);
      }
    }
  });
}

if(Meteor.isClient) {
  Meteor.methods({
    'add-overlay': function(warningMessage) {
      let tempOverlay = document.createElement('div');
      let reloadingP = document.createElement('p');
      let textNode = document.createTextNode(warningMessage + " Do not refresh the page");
      reloadingP.style="color: white; margin: auto; width: 100vw; text-align: center; font-size: 6vw;"
      reloadingP.appendChild(textNode);
      tempOverlay.appendChild(reloadingP);
      tempOverlay.style="position: absolute; left: 0; right: 0; top: 0; bottom: 0;background-color: rgba(0,0,0,0.5);";

      document.body.appendChild(tempOverlay);
    }
  })
}
