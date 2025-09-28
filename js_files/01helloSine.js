let ctx;

function setup() {
  createCanvas(340, 120);
  noLoop();
}

function draw() {
  background(240);
  text("Click to play 440 Hertz", 10, 20);
}

function mousePressed() {
  ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();

  // if not playing, play the context
  if (ctx.state === "suspended") {
    ctx.resume();
  } else {
    ctx.suspend();
  }

  const osc = ctx.createOscillator();
  const g = ctx.createGain();

  // type of wave, changes sound
  // sine is the best sounding :/
  osc.type = "sine";
  // sets frequency in hertz
  osc.frequency = 440;
  // value of gain; gain is amplification applied to original sound signal
  // changed gain
  g.gain.value = 1;

  //connecting the oscillator to gain and gain to context
  osc.connect(g);
  g.connect(ctx.destination);

  const t = ctx.currentTime;

  // automatically stops oscillator after 1 second from playing
  osc.start(t);
  osc.stop(t + 1);

  // on ending oscillator disconnects oscillator and gain
  // optional but its probably good practice
  osc.onended = () => {
    osc.disconnect();
    g.disconnect();
  };
}
