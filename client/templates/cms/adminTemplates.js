Template.adminForm.events({
  //on form submission update descriptions database
  'click button': function() {
    var content = Descriptions.find({title: this.title}).fetch();
    var textArea = document.getElementById(this.specialId);
    if (content.length > 0) {
      Descriptions.update({_id:  content[0]._id}, {$set: {description: textArea.value}});
      window.alert("Successfully updated description for: " + this.title);
    }
  }
});

Template.adminForm.helpers({
  'currentDescription': function() {
    //return what is currently in database for description
    var content = Descriptions.find({title: this.title }).fetch();
    if (content.length > 0) {
      return content[0].description;
    }
    else {
      return "";
    }
  },
  'specialId': function() {
    //automatically assign a specialId to self
    var strings = this.title.split(" ");
    var final = "";
    for (var i = 0; i < strings.length; i++) {
      final  = final + strings[i] + "-";
    }
    this.specialId = final + "textarea";
    return this.specialId;
  }
});

Template.adminImageForm.helpers({
  //automatically assign specialId to self based on title
  'specialId': function() {
    var strings = this.title.split(" ");
    var final = "";
    for (var i = 0; i < strings.length; i++) {
      final  = final + strings[i] + "-";
    }
    this.specialId = final + "image";
    return this.specialId;
  },
  //find the current image path from defaultImagePaths database
  'currentFile': function() {
    let defaultPath = DefaultImagePaths.findOne({title: this.specialId});
    if (defaultPath != null) {
      return defaultPath.path;
    }
  }
});

Template.adminImageForm.events({
  //upload new image to database and replace old one
  'click button': function() {
    var content = Descriptions.find({title: this.title}).fetch();
    var input = document.getElementById(this.specialId);
    if (input.files.length > 0) {
      var file = input.files[0];
      file.specialId = this.specialId;
      //path for default images
      let path = "assets/uploads/images/default/";

      /* update path to database */
      let result = DefaultImagePaths.findOne({ title: this.specialId });
      if (result == null) {
        //if there is no path currently then create new document
        DefaultImagePaths.insert( {title: this.specialId, path: path + this.specialId + "." + file.name.split(".").pop() } );
      }
      else {
        //else
        DefaultImagePaths.update({_id:  result._id}, {$set: {path: path + this.specialId + "." + file.name.split(".").pop() }});
      }

      var reader = new FileReader();
      reader.onload = (function(theFile) {
        var fileName = theFile.specialId;
        path = "/public/assets/uploads/images/default/";
        return function(e) {
          //upload image to server
          Meteor.call('file-upload', path, fileName, theFile.name.split(".").pop(), e.target.result.split(',')[1]);
        };
      })(file);
      reader.readAsDataURL(file);
      Meteor.call('add-overlay', 'Uploading...');
    }
  }
});

/* board of directors section */
/* Member form modal controller */
Template.adminAboutPage.events({
  'click #addNewBoardMemberBtn': function() {
    //show modal
    document.getElementById("board-member-form").style.display = "block";
    boardMemberFormOverlay.style.display = "block";
  },
  'click .board-edit-button': function() {
    //show modal
    Session.set('currentEditingMember', this._id);
    boardFormFirstNameInput.value = this.firstName;
    boardFormLastNameInput.value = this.lastName;
    boardFormRoleInput.value = this.role;
    boardFormDescriptionInput.value = this.description;
    boardFormPreviousImagePath.innerHTML = "(" + this.path + ")";
    document.getElementById("board-member-form").style.display = "block";
    boardMemberFormOverlay.style.display = "block";
  },
  'click .board-remove-button': function() {
    //remove a board of director
    let item = BoardOfDirectors.findOne({_id: this._id});
    let filename = "/public/" + item.path;
    Meteor.call('remove-file', filename);
    BoardOfDirectors.remove({_id: this._id });
  }
});

Template.adminAboutPage.helpers({
  'member': function() {
    //return all board of directors
    return BoardOfDirectors.find();
  },
});

Template.newBoardMemberForm.events({
  'click #boardMemberFormOverlay, click #newBoardMemberExitBtn': function() {
    document.getElementById("board-member-form").style.display = "none";
    boardMemberFormOverlay.style.display = "none";
  },
  'click #newBoardMemberAddButton': function() {
    document.getElementById("board-member-form").style.display = "none";
    boardMemberFormOverlay.style.display = "none";

    let firstName = boardFormFirstNameInput.value;
    let lastName = boardFormLastNameInput.value;
    let role = boardFormRoleInput.value;
    let description = boardFormDescriptionInput.value;

    if (Session.get('currentEditingMember') == null) {
      //insert new
      let storedId = BoardOfDirectors.insert({firstName: firstName, lastName: lastName, role: role, description: description, path: ""});
      let imageFile = boardFormImageInput;
      if (imageFile.files.length > 0) {
        let file = imageFile.files[0];
        file.specialName = storedId;

        var reader = new FileReader();
        reader.onload = (function(theFile) {
          var fileName = theFile.specialName;
          var path = "/public/assets/uploads/images/boardOfDirectors/";
          return function(e) {
            //upload image to server
            Meteor.call('file-upload', path, fileName, theFile.name.split(".").pop(), e.target.result.split(',')[1]);
          };
        })(file);
        reader.readAsDataURL(file);
        Meteor.call('add-overlay', 'Uploading...');
        var path = "assets/uploads/images/boardOfDirectors/";
        BoardOfDirectors.update({_id: storedId}, {$set: {path: path + storedId + "." + file.name.split(".").pop() }});
      }
    }
    else {
      let memberId = Session.get('currentEditingMember');
      BoardOfDirectors.update({_id: memberId}, {$set: { firstName: firstName, lastName: lastName, role: role, description: description}});

      if (boardFormImageInput.files.length > 0) {
        let file = boardFormImageInput.files[0];
        file.specialName = memberId;

        var reader = new FileReader();
        reader.onload = (function(theFile) {
          var fileName = theFile.specialName;
          var path = "/public/assets/uploads/images/boardOfDirectors/";
          return function(e) {
            //upload image to server
            console.log("UPLOADING");
            Meteor.call('file-upload', path, fileName, theFile.name.split(".").pop(), e.target.result.split(',')[1]);
          };
        })(file);
        reader.readAsDataURL(file);
        Meteor.call('add-overlay', 'Uploading...');

        var path = "assets/uploads/images/boardOfDirectors/";
        BoardOfDirectors.update({_id: memberId}, {$set: {path: path + memberId + "." + file.name.split(".").pop()}});
      }
    }

    boardFormFirstNameInput.value = "";
    boardFormLastNameInput.value = "";
    boardFormRoleInput.value = "";
    boardFormDescriptionInput.value = "";
    boardFormPreviousImagePath.innerHTML = "";
    delete Session.keys['currentEditingMember'];
  }
});
