let ctx, osc, g, slider;

function setup() {
  createCanvas(340, 120);

  slider = createSlider(80, 1200, 440, 1).position(10, 80);
  const btn = createButton("Start").position(10, 30);
  btn.mousePressed(() => {
    ctx = ctx || new AudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    } else {
      ctx.suspend();
    }

    osc = ctx.createOscillator();
    g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = slider.value();
    // changed gain value
    g.gain.value = 0.85;

    osc.connect(g);
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

  text("Frequency: " + slider.value() + "Hz", 10, 20);

  if (osc) {
    osc.frequency.value = slider.value();
  }
}
