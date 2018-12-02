if (Meteor.isServer) {
  Meteor.startup(() => {
    if (Descriptions.find().count() === 0) {
      Meteor.call('createDescription', 'About Section Description', "One sentence description about TBCCA. One sentence description of TBCCA right here.");

      Meteor.call('createDescription', 'Mission Short Description', "Description of Mission covering for more quick information.");

      Meteor.call('createDescription', 'History Short Description', "Description of History covering for more quick information.");

      Meteor.call('createDescription', 'Bylaws Short Description', "Description of Bylaws covering for more quick information.");

      Meteor.call('createDescription', 'Board Short Description', "Description of Board covering for more quick information.");

      Meteor.call('createDescription', 'About Us Description', "Lorem ipsum dolor sit amet, veniam eleifend duo ut, "
        + "vitae putent accommodare vim te. An qui prima solet posidonium. Ea modus dictas fabellas per. Tale deseruisse sea "
        + "ut, quem movet ad duo, vis eu enim iisque graecis. Eum malis recusabo an, eam id reque tantas graeci.");

      Meteor.call('createDescription', 'Mission Full Description', "Lorem ipsum dolor sit amet, veniam eleifend duo"
        + "ut, vitae putent accommodare vim te. An qui prima solet posidonium. Ea modus dictas fabellas per. Tale "
        + "deseruisse sea ut, quem movet ad duo, vis eu enim iisque graecis. Eum malis recusabo an, eam id reque tantas"
        + "graeci. Facete molestiae vim eu, cum viris nostrum efficiantur eu. Mel autem oblique lucilius in, dolorum oporteat"
        + "in pri, an decore integre intellegat mel. Mea an aliquam disputationi. Persequeris liberavisse qui at.");

      Meteor.call('createDescription', 'Vision Full Description', "Lorem ipsum dolor sit amet, veniam eleifend duo"
        + "ut, vitae putent accommodare vim te. An qui prima solet posidonium. Ea modus dictas fabellas per. Tale "
        + "deseruisse sea ut, quem movet ad duo, vis eu enim iisque graecis. Eum malis recusabo an, eam id reque tantas"
        + "graeci. Facete molestiae vim eu, cum viris nostrum efficiantur eu. Mel autem oblique lucilius in, dolorum oporteat"
        + "in pri, an decore integre intellegat mel. Mea an aliquam disputationi. Persequeris liberavisse qui at.");

      Meteor.call('createDescription', 'History Full Description', "Lorem ipsum dolor sit amet, veniam eleifend duo"
        + "ut, vitae putent accommodare vim te. An qui prima solet posidonium. Ea modus dictas fabellas per. Tale "
        + "deseruisse sea ut, quem movet ad duo, vis eu enim iisque graecis. Eum malis recusabo an, eam id reque tantas"
        + "graeci. Facete molestiae vim eu, cum viris nostrum efficiantur eu. Mel autem oblique lucilius in, dolorum oporteat"
        + "in pri, an decore integre intellegat mel. Mea an aliquam disputationi. Persequeris liberavisse qui at.");

      Meteor.call('createDescription', 'Bylaws Full Description', "");
    }

    if (Meteor.users.find().count() === 0) {
      Accounts.createUser({ username: "admin", email: "main@thunderbaychinese.ca", password: "bq3Ff7VysbsFkAbz" });
    }

    //setup public folder if it doesn't exist
    let fs = require('fs');
    if (!fs.existsSync('/public/assets/uploads/images/events'))
      Meteor.call('create-directory', '/public/assets/uploads/images/', 'events');
    if (!fs.existsSync('/public/assets/uploads/images/default'))
      Meteor.call('create-directory', '/public/assets/uploads/images/', 'default');
    if (!fs.existsSync('/public/assets/uploads/images/boardOfDirectors'))
      Meteor.call('create-directory', '/public/assets/uploads/images/', 'boardOfDirectors');
  });

  Meteor.publish('descriptions', function() {
    return Descriptions.find();
  });
  Meteor.publish('defaultImagePaths', function() {
    return DefaultImagePaths.find();
  });
  Meteor.publish('boardOfDirectors', function() {
    return BoardOfDirectors.find();
  });
  Meteor.publish('events', function() {
    return Events.find();
  });
}
//disable account creation
Accounts.config({
  forbidClientAccountCreation : true
});

if (Meteor.isClient) {
  Meteor.subscribe('descriptions');
  Meteor.subscribe('defaultImagePaths');
  Meteor.subscribe('boardOfDirectors');
  Meteor.subscribe('events');
}
