import { Meteor }          from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

Descriptions = new Mongo.Collection('descriptions');
DefaultImagePaths = new Mongo.Collection('defaultImagePaths');
BoardOfDirectors = new Mongo.Collection('boardOfDirectors');
Events = new Mongo.Collection('events');

Descriptions.allow({
  insert() { return false; },
  update() {
    if (Meteor.userId() != null) {
      return true;
    }
    return false;
  },
  remove() { return false; }
});
Descriptions.deny({
  insert() { return true; },
  update() {
    if (Meteor.userId() != null) {
      return false;
    }
    return true;
  },
  remove() { return true; }
});

DefaultImagePaths.allow({
  insert() {
    if (Meteor.userId() != null) {
      return true;
    }
    return false;
  },
  update() {
    if (Meteor.userId() != null) {
      return true;
    }
    return false;
  },
  remove() {
    if (Meteor.userId() != null) {
      return true;
    }
    return false;
  }
});
DefaultImagePaths.deny({
  insert() {
    if (Meteor.userId() != null) {
      return false;
    }
    return true;
  },
  update() {
    if (Meteor.userId() != null) {
      return false;
    }
    return true;
  },
  remove() {
    if (Meteor.userId() != null) {
      return false;
    }
    return true;
   }
});

BoardOfDirectors.allow({
  insert() {
    if (Meteor.userId() != null) {
      return true;
    }
    return false;
  },
  update() {
    if (Meteor.userId() != null) {
      return true;
    }
    return false;
  },
  remove() {
    if (Meteor.userId() != null) {
      return true;
    }
    return false;
  }
});
BoardOfDirectors.deny({
  insert() {
    if (Meteor.userId() != null) {
      return false;
    }
    return true;
  },
  update() {
    if (Meteor.userId() != null) {
      return false;
    }
    return true;
  },
  remove() {
    if (Meteor.userId() != null) {
      return false;
    }
    return true;
   }
});

Events.allow({
  insert() {
    if (Meteor.userId() != null) {
      return true;
    }
    return false;
  },
  update() {
    if (Meteor.userId() != null) {
      return true;
    }
    return false;
  },
  remove() {
    if (Meteor.userId() != null) {
      return true;
    }
    return false;
  }
});
Events.deny({
  insert() {
    if (Meteor.userId() != null) {
      return false;
    }
    return true;
  },
  update() {
    if (Meteor.userId() != null) {
      return false;
    }
    return true;
  },
  remove() {
    if (Meteor.userId() != null) {
      return false;
    }
    return true;
   }
});
