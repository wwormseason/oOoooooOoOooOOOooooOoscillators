let ctx, osc, g, sel;

function setup() {
  createCanvas(340, 120);

  sel = createSelect().position(10, 10);
  selOptions = ["sine", "square", "triangle", "sawtooth"];
  selOptions.forEach((o) => sel.option(o));

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
    osc.type = sel.value();
    // changed frequency
    osc.frequency.value = 1000;
    g.gain.value = 0.2;

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
  if (osc) {
    osc.type = sel.value();
    // on change adds new sound on top of current sound
    // need to find way to change sounds?
  }
}
