Template.adminEvents.helpers({
  'events': function() {
    return Events.find().fetch();
  }
});

Template.adminEvents.events({
  'click #addNewEventBtn': function() {
    //find temporaryEvent
    let eventId = Events.insert({titleOfEvent: "", date: {year: "0", month: "0", day: "0"}, article: "", mainImagePath: "", images: [], links: [], published: false });
    Meteor.call('add-overlay', "Creating Event...");
    //create new directory for the event images
    console.log(eventId)
    let path = "/public/assets/uploads/images/events/";
    Meteor.call('create-directory', path, eventId);
    window.location.href = '/admin/manageEvents/' + eventId;
  },
  'click .delete-event-btn': function() {
    let result = window.confirm("Are you sure you want to delete this event");
    if (result) {
      //delete all images in directory
      let removedEvent = Events.findOne({_id: this._id});
      for (var i = 0; i < removedEvent.images.length; i++) {
        let filepath = "/public/" + removedEvent.images[i].path;
        Meteor.call('remove-file', filepath);
      }
      //remove directory
      Meteor.call('remove-empty-dir', '/public/assets/uploads/images/events/' + this._id);

      //remove event from database
      Events.remove({_id: this._id});
      Meteor.call("add-overlay", "Deleting Event...");
      if (removedEvent.images.length == 0) {
        window.location.reload();
      }
    }
  },
  'click .edit-event-btn': function() {
    window.location.href = "/admin/manageEvents/" + this._id;
  }
});

Template.adminEventTemplate.helpers({
  'eventTitle': function() {
    //return current title of event
    let currentEvent = Events.findOne({_id: window.location.href.split('/').pop()});
    if (currentEvent != null) return currentEvent.titleOfEvent;
  },
  'date': function() {
    let currentEvent = Events.findOne({_id: window.location.href.split('/').pop()});
    if (currentEvent != null) {
      let date = currentEvent.date;
      return date.year + "-" + date.month + "-" + date.day;
    }
  },
  'articleContent': function() {
    //return current article content
    let currentEvent = Events.findOne({_id: window.location.href.split('/').pop()});
    if (currentEvent != null) return currentEvent.article;
  },
  'color': function() {
    // set color for mainImagePath on the ui
    let currentEvent = Events.findOne({_id: window.location.href.split('/').pop()});
    if (this.path == currentEvent.mainImagePath) return 'rgb(0,255,0)';
    return 'transparent';
  },
  'imageContainer': function() {
    //all images
    let currentEvent = Events.findOne({_id: window.location.href.split('/').pop()});
    if (currentEvent != null) {
      let arr = currentEvent.images;
      return arr;
    }
  },
  'links': function() {
    //youtube links
    let currentEvent = Events.findOne({_id: window.location.href.split('/').pop()});
    if (currentEvent != null) {
      let arr = currentEvent.links;
      return arr;
    }
  },
  'isPublished': function() {
    let currentEvent = Events.findOne({_id: window.location.href.split('/').pop()});
    if (currentEvent != null) {
      return currentEvent.published;
    }
  }
});

Template.adminEventTemplate.events({
  'keyup': function(e) {
    //update all textfields
    let eventId = window.location.href.split('/').pop();
    let currentEvent = Events.findOne({_id: eventId});
    //update titleOfEvent
    Events.update({_id: eventId}, {$set: {titleOfEvent: titleOfEventInput.value }});
    //update articleContent
    Events.update({_id: eventId}, {$set: {article: articleContentTextArea.value }});

    //update respective caption if user is updating the caption
    if (this.path != null) {
      for (var i = 0; i < currentEvent.images.length; i++) {
        if (this.path = currentEvent.images[i].path) {
          currentEvent.images[i].caption = e.target.value;
          //update db
          Events.update({_id: eventId}, {$set: {images: currentEvent.images}});
        }
      }
    }
  },
  'change .event-date-picker': function(e) {
    let date = e.target.value;
    let splitted = date.split('-');

    let eventId = window.location.href.split('/').pop();
    let currentEvent = Events.findOne({_id: eventId});
    if (currentEvent != null) {
      Events.update({_id: eventId }, {$set: { date: {year: splitted[0], month: splitted[1], day: splitted[2] }}});
    }
  },
  'change #eventIsPublishedCheckBox': function() {
    let eventId = window.location.href.split('/').pop();
    let currentEvent = Events.findOne({_id: eventId});
    if (currentEvent != null) {
      Events.update({_id: eventId}, { $set: { published: eventIsPublishedCheckBox.checked }});
    }
  },
  'click #addVideoLinkToEventsButton': function() {
    //get currentEvent
    let eventId = window.location.href.split('/').pop();
    let currentEvent = Events.findOne({_id: eventId});
    //check if event exists and if url != "" and if url isn't already added
    if (currentEvent != null && videoLinkInputField.value != "" && currentEvent.links.indexOf(videoLinkInputField.value) == -1) {
      currentEvent.links.push(videoLinkInputField.value);
      //update database
      Events.update({_id: eventId}, {$set: {links: currentEvent.links}});
    }
  },
  //remove a video link from the database
  'click .video-link-remove-link-btn': function() {
    //get currentEvent
    let eventId = window.location.href.split('/').pop();
    let currentEvent = Events.findOne({_id: eventId});
    if (currentEvent != null) {
      let index = -1;
      for (var i = 0; i < currentEvent.links.length; i++) {
        if (currentEvent.links[i] == this) index = i;
      }
      if (index != -1) {
        //remove link
        currentEvent.links.splice(index, 1);
        //update database
        Events.update({_id: eventId}, {$set: {links: currentEvent.links}});
      }
    }
  },
  'change #imageFilesEvents': function() {
    /* add image to database */
    let eventId = window.location.href.split('/').pop();
    let currentEvent = Events.findOne({_id: eventId});
    //check if event exists
    if (currentEvent != null) {
      var input = document.getElementById("imageFilesEvents");
      if (input.files.length > 0) {
        let prevTime = 0;
        for (var i = 0; i < input.files.length; i++) {
          //path for default images
          var file = input.files[i];
          let date = new Date();
          let time = date.getTime();
          if (time == prevTime) {
            time = prevTime + 1;
          }
          file.newName = time;
          prevTime = time;
          let path = "assets/uploads/images/events/";

          //update to path to database
          currentEvent.images.push({ path: path + eventId + "/" + file.newName + "." + file.name.split(".").pop(), caption: ""});
          Events.update({_id: eventId}, {$set: {images: currentEvent.images}});

          var reader = new FileReader();
          reader.onload = (function(theFile) {
            var fileName = theFile.newName;
            path = "/public/assets/uploads/images/events/" + eventId + "/";
            return function(e) {
              //upload image to server
              Meteor.call('file-upload', path, fileName, theFile.name.split(".").pop(), e.target.result.split(',')[1]);
            };
          })(file);
          reader.readAsDataURL(file);
        }
        Meteor.call('add-overlay', "Uploading...");
        //set the main image path if currently it is null
        if (currentEvent.mainImagePath == "") Events.update({_id: eventId}, {$set: {mainImagePath: currentEvent.images[0].path }});
      }
    }
  },
  'click .set-image-as-main-btn-events-page': function(e) {
    //get eventId
    let eventId = window.location.href.split('/').pop();
    let currentEvent = Events.findOne({_id: eventId});
    Events.update({_id: eventId}, {$set: { mainImagePath: this.path}});
    let elements = document.getElementsByClassName("set-image-as-main-btn-events-page");
  },
  'click .remove-image-btn-edit-events-page': function(e) {
    let eventId = window.location.href.split('/').pop();
    let currentEvent = Events.findOne({_id: eventId});
    let index = -1;
    for (var i = 0; i < currentEvent.images.length; i++) {
      if (currentEvent.images[i].path == this.path) index = i;
    }

    if (index != -1) {
      //remove that image
      currentEvent.images.splice(index, 1);
      //update database
      Events.update({_id: eventId}, {$set: {images: currentEvent.images}});
      if (currentEvent.images.length > 0) {
        //set the main image path if currently it is null and if ^ there are still images
        if (currentEvent.mainImagePath == this.path) Events.update({_id: eventId}, {$set: {mainImagePath: currentEvent.images[0].path }});
      }
      else {
        //set main image path to null
        Events.update({_id: eventId}, {$set: {mainImagePath: "" }});
      }
      //remove from directory
      Meteor.call('remove-file', '/public/' + this.path);
      Meteor.call('add-overlay', "Removing File...");
    }
  }
});
