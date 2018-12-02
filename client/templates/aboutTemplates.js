Template.aboutPage.helpers({
  'aboutUsDescription': function() {
    let content = Descriptions.find({ title: "About Us Description" }).fetch();
    if (content.length > 0) {
      return content[0].description;
    }
  },
  'aboutUsMainImage': function() {
    let content = DefaultImagePaths.find({ title: "About-Us-Page-Image-image"}).fetch();
    if (content.length > 0) {
      return content[0].path;
    }
  },
  'missionFullDescription': function() {
    let content = Descriptions.find({ title: "Mission Full Description" }).fetch();
    if (content.length > 0) {
      return content[0].description;
    }
  },
  'visionFullDescription': function() {
    let content = Descriptions.find({ title: "Vision Full Description" }).fetch();
    if (content.length > 0) {
      return content[0].description;
    }
  },
  'historyFullDescription': function() {
    let content = Descriptions.find({ title: "History Full Description" }).fetch();
    if (content.length > 0) {
      return content[0].description;
    }
  },
  'bylawsFullDescription': function() {
    let content = Descriptions.find({ title: "Bylaws Full Description" }).fetch();
    if (content.length > 0) {
      return content[0].description;
    }
  },
  'member': function() {
    return BoardOfDirectors.find({}, {sort: {firstName: 1, lastName: 1}});
  }
});
