let ctx, osc, g, slider;

function setup() {
  createCanvas(340, 120);
  // min value, max value, beginning value, step value(amount the slider moves at a time when moved)
  slider = createSlider(0, 1, 0.2, 0.01).position(10, 80);
  const btn = createButton("Start").position(10, 10);
  btn.mousePressed(() => {
    ctx = ctx || new AudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    } else {
      ctx.suspend();
    }

    osc = ctx.createOscillator();
    g = ctx.createGain();
    // changed type
    osc.type = "triangle";
    osc.frequency.value = 220;
    g.gain.value = slider.value();
    // gets slider's current value

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

  // must use if statement because g does not exist before the button is pressed and will trigger an error if not used
  if (g) {
    g.gain.value = slider.value();
  }
}
