Polymer('timer-app', {
  icon: 'check',
  running: false,

  ready: function() {
    console.log('nya');
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

    var sine1 = new T("sin", {freq:440, mul:0.5});
    var sine2 = new T("sin", {freq:660, mul:0.5});
    var cur = new Date();
    this.interval = setInterval(function(){
      new T("perc", {r:500}, sine1, sine2).on("ended", function() {
        this.pause();
      }).bang().play();
      console.log(new Date() - cur);
      cur = new Date();
    }, period);
  }
});
