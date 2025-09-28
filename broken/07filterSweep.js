let ctx, osc, g, fil, slider, slider2;

function setup() {
  createCanvas(340, 120);

  slider = createSlider(0, 1200, 440, 1).position(10, 70);

  slider2 = createSlider(0, 1, 0.5, 0.01).position(10, 100);
  createButton("Start")
    .position(10, 30)
    .mousePressed(() => {
      ctx = ctx || new AudioContext();
      if (ctx.state === "suspended") {
        ctx.resume();
      } else {
        ctx.suspend();
      }

      osc = ctx.createOscillator();
      g = ctx.createGain();
      // a filter composed of two quadratic equations (biquad)
      fil = ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.value = 110;
      g.gain.value = slider2.value();

      // lowpass, highpass, bandpass, lowshelf, highsehled, peaking, notch, allpass
      // changed filter type
      fil.type = "notch";

      osc.connect(fil);
      g.connect(ctx.destination);

      osc.start();

      osc.onended = () => {
        osc.disconnect();
        g.disconnect();
      };
    });
}

function draw() {
  background(240);

  text("Cutoff: " + slider.value() + "Hz", 10, 20);

  text(slider.value(), 10, 70);
  text("Volume/Gain: " + slider2.value(), 10, 100);

  fil.frequency.value = slider.value();

  if (g) {
    g.gain.value = slider2.value();
  }
}
