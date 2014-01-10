export default Ember.Route.extend({
  model: function () {
    return EmberFire.Object.create({
      ref: new Firebase("https://atsjj.firebaseio.com/stream")
    });
  }
});
