let ctx, o, g, p, slider;

function setup() {
  createCanvas(340, 120);

  slider = createSlider(-1, 1, 0, 0.01).position(10, 70);

  const btn = createButton("Play").position(10, 30);
  btn.mousePressed(() => {
    ctx = ctx || new AudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    } else {
      ctx.suspend();
    }

    o = ctx.createOscillator();
    g = ctx.createGain();
    // panning is distribution of audio signal
    // for example when kikuo songs will have sections that only come out of the right headphone, panning
    // changes gain and frequency
    p = ctx.createStereoPanner();

    o.type = "sawtooth";
    o.frequency.value = 1200;
    g.gain.value = 0.8;
    p.pan.value = slider.value();
    o.connect(g);
    o.connect(p);
    p.connect(ctx.destination);
    o.start();

    o.onended = () => {
      o.disconnect();
      g.disconnect();
      p.disconnect();
    };
  });
}

function draw() {
  background(240);

  if (p) {
    p.pan.value = slider.value();
    console.log(p.pan.value);
  }

  text(slider.value(), 10, 70);
}
