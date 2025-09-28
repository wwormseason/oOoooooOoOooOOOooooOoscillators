let ctx,
  nextTime = 0,
  isOn = false,
  pattern = [0, 2, 4, 7],
  step = 0,
  slider,
  btn;

function setup() {
  createCanvas(340, 120);

  slider = createSlider(40, 200, 120, 1).position(10, 70);

  btn = createButton("Start Seq").position(10, 10).mousePressed(toggle);
}

function tick() {
  if (!isOn) {
    return;
  }
  const spb = 60 / slider.value();
  console.log(spb);
  while (nextTime < ctx.currentTime + 0.1) {
    console.log(nextTime, ctx.currentTime, "t");
    const midi = 60 + pattern[step % pattern.length]; // C major slice

    playAt(mtof(midi), nextTime);
    nextTime += spb / 2; // 8th notes
    step++;
  }
  requestAnimationFrame(tick);
}

function playAt(freq, t) {
  const o = ctx.createOscillator(),
    g = ctx.createGain();
  o.type = "triangle";
  o.frequency.setValueAtTime(freq, t);
  o.connect(g);
  g.connect(ctx.destination);
  g.gain.setValueAtTime(0, t);
  //changed ramp values and time values
  g.gain.linearRampToValueAtTime(0.8, t + 0.05);
  g.gain.exponentialRampToValueAtTime(0.005, t + 0.8);
  o.start(t);
  o.stop(t + 0.3);
}

function mtof(m) {
  return 440 * Math.pow(2, (m - 69) / 12);
}

function toggle() {
  ctx = ctx || new AudioContext();
  if (ctx.state === "suspended") ctx.resume();
  isOn = !isOn;
  btn.html(isOn ? "Stop Seq" : "Start Seq");
  if (isOn) {
    nextTime = ctx.currentTime + 0.05;
    tick();
  }
}

function draw() {
  background(240);

  text("BPM: " + slider.value(), 10, 70);
}
