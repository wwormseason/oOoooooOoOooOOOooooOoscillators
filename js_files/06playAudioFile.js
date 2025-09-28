let ctx, buf, sel, demo;

function getAudio() {
  sel = createSelect().position(220, 10);
  selOptions = [
    "DEMO_1.mp3",
    "DEMO_2.mp3",
    "DEMO_3.mp3",
    "DEMO_4.mp3",
    "DEMO_5.mp3",
  ];
  selOptions.forEach((o) => sel.option(o));
}

async function loadBuf(demo) {
  ctx = ctx || new AudioContext();
  getAudio();
  // booooo async functions return, my enemy >:(

  const res = await fetch(`../assets/${demo}`);
  const ab = await res.arrayBuffer();

  buf = await ctx.decodeAudioData(ab);
}

function setup() {
  createCanvas(340, 120);
  getAudio();
  createButton("Load")
    .position(10, 10)
    .mousePressed(() => {
      // when load is clicked the variable song is set to the current selection, which is then pushed into loadBuf so it gets the correct DEMO track
      let song = sel.value();
      loadBuf(song);
    });
  createButton("Play")
    .position(70, 10)
    .mousePressed(() => {
      if (!buf) {
        return;
      }

      const s = ctx.createBufferSource();
      s.buffer = buf;
      s.connect(ctx.destination);
      s.start();

      if (ctx.state === "suspended") {
        ctx.resume();
      } else {
        ctx.suspend();
      }
    });
}

function draw() {
  background(240);
  text(buf ? "Ready" : "Click Load", 10, 80);
  // if paused, will only play the original loaded sound
}
