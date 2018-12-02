Template.eventsPage.helpers({
  'event': function() {
    let currentlyDisplaying = Session.get('displayingEvents');
    if (currentlyDisplaying == null) {
      currentlyDisplaying = 'pastOnly';
      Session.set('displayingEvents', 'pastOnly');
    }

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (currentlyDisplaying == 'pastOnly') {
      return Events.find({date: { $gte: { date: {year: year, month: month, day: day}}}, published: true}, {sort: { date: -1}});
    }
    else {
      return Events.find({date: { $lt: {year: year, month: month, day: day}}, published: true}, {sort: { date: 1}});
    }
  },
  'headerColorPast': function() {
    let currentlyDisplaying = Session.get('displayingEvents');
    if (currentlyDisplaying == null) {
      currentlyDisplaying = 'pastOnly';
      Session.set('displayingEvents', 'pastOnly');
    }
    if (currentlyDisplaying == 'pastOnly') return '#F74C4C;';
    else return "#95989A";
  },
  'headerColorUpcoming': function() {
    let currentlyDisplaying = Session.get('displayingEvents');
    if (currentlyDisplaying == null) {
      currentlyDisplaying = 'pastOnly';
      Session.set('displayingEvents', 'pastOnly');
    }
    if (currentlyDisplaying == 'pastOnly') return '#95989A;';
    else return "#F74C4C;";
  }
});

Template.eventsPage.events({
  'click #pastEventsHeader': function() {
    Session.set('displayingEvents', 'pastOnly');
  },
  'click #upcomingEventsHeader': function() {
    Session.set('displayingEvents', 'upcomingOnly');
  }
});
