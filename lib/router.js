Meteor.startup(function() {
  Router.route('/', {
    name: "home",
    template: 'homePage'
  });
  Router.route('/about', {
    name: "about",
    template: 'aboutPage'
  });
  Router.route('/events', {
    name: "events",
    template: 'eventsPage'
  });
  Router.route('/activities', {
    name: "activities",
    template: 'activitiesPage'
  });
  Router.route('/resources', {
    name: 'resources',
    template: 'resourcesPage'
  });
  Router.route('/admin', {
    name: 'admin',
    template: 'adminPage'
  });
  Router.route('/admin/manageHome', {
    name: 'adminHomePage',
    template: 'adminManageHome'
  });
  Router.route('/admin/manageAbout', {
    name: 'adminAboutPage',
    template: 'adminAboutPage'
  });
  Router.route('/admin/manageEvents', {
    name: 'adminEventsPage',
    template: 'adminEvents'
  });
  Router.route('/admin/manageEvents/:_id', {
    template: 'adminEventTemplate'
  });
});
