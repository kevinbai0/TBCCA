/* Description about us in home page */

Template.homePage.helpers({
  'aboutSectionDescription': function() {
    let content = Descriptions.find({ title: "About Section Description" }).fetch();
    if (content.length > 0) {
      return content[0].description;
    }
  },
  'mainImage': function() {
    let content = DefaultImagePaths.find({ title: "Home-Page-Main-Image-image" }).fetch();
    if (content.length > 0) {
      return content[0].path;
    }
  }
});

/* Short descriptions in about us preview section in home page*/
Template.aboutTabButton.helpers({
  'shortDescription': function() {
    if (this.text == "Mission") {
      let content = Descriptions.find({ title: "Mission Short Description" }).fetch();
      if (content.length > 0) {
        return content[0].description;
      }
    }
    else if (this.text == "History") {
      let content = Descriptions.find({ title: "History Short Description" }).fetch();
      if (content.length > 0) {
        return content[0].description;
      }
    }
    else if (this.text == "Bylaws") {
      let content = Descriptions.find({ title: "Bylaws Short Description" }).fetch();
      if (content.length > 0) {
        return content[0].description;
      }
    }
    else if (this.text == "Board") {
      let content = Descriptions.find({ title: "Board Short Description" }).fetch();
      if (content.length > 0) {
        return content[0].description;
      }
    }
  }
});
