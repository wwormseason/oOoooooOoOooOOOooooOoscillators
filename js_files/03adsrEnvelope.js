let ctx;

function setup() {
  createCanvas(340, 120);
}

function draw() {
  background(240);
  text("Click canvas for blip", 10, 20);
}

function mousePressed() {
  ctx = ctx || new AudioContext();

  if (ctx.state === "suspended") {
    ctx.resume();
  } else {
    ctx.suspend();
  }

  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = 260;

  osc.connect(g);
  g.connect(ctx.destination);

  const t = ctx.currentTime;

  g.gain.setValueAtTime(0, t);
  // gradual linear change to Audio param
  // value, endTime
  // changed time values
  g.gain.linearRampToValueAtTime(0.7, t + 0.05);
  g.gain.linearRampToValueAtTime(0.0001, t + 0.2);

  osc.start(t);
  osc.stop(t + 0.25);
}
