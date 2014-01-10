export default Ember.ObjectController.extend({
  peer: null,

  actions: {
    start: function () {
      if (this.get('peer') == null) {
        var _this = this;

        this.set('peer', new RTCPeerConnection(null));

        getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'screen'
            },
            optional: []
          }
        },
        /* then */
        function (stream) {
          _this.get('peer').addStream(stream);
          _this.get('peer').createOffer(function (description) {
            _this.get('peer').setLocalDescription(description);
            _this.set('rtc', description);
          });
        },
        /* fail */
        function (event) {
          console.log('getUserMedia error:', event);
        });
      }
    },

    stop: function () {
      if (this.get('peer') != null) {
        this.get('peer').close();
        this.set('peer', null);
        this.set('rtc', null);
      }
    }
  }
});
