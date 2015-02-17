Polymer('timer-app', {
  icon: 'check',
  running: false,
  instrument: 112,
  note: 92,

  ready: function() {
    console.log('nya');
    T.soundfont.setInstrument(this.instrument);
    T.soundfont.preload(this.note);
  },

  handleStart: function() {
    var that = this;

    if (that.running) {
      clearInterval(this.interval);
      that.running = false;
      that.icon = 'check';
      return;
    }

    that.running = true;
    that.icon = 'close';
    var period = parseFloat(that.$.period.value)* 1000;
    if (period <= 0 || period >= 60*60*24*1000) {
      console.log("Bad period " + period.toString());
      return;
    }

    var cur = new Date();
    T.soundfont.play(that.note, true);
    this.interval = setInterval(function(){
      T.soundfont.play(that.note, false);
      console.log(new Date() - cur);
      cur = new Date();
    }, period);
  }
});
