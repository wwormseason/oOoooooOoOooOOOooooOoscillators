let ctx, o, an, buf;

function setup() {
  c = createCanvas(340, 120);

  const btn = createButton("Play").position(10, 30);
  btn.mousePressed(() => {
    ctx = ctx || new AudioContext();

    if (ctx.state === "suspended") {
      ctx.resume();
    } else {
      ctx.suspend();
    }

    o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = 220;
    an = ctx.createAnalyser();
    // fft = Fast Fourier Transform
    // fft is an algorithm is a sequece that converts signal into a representation in frequency
    // fft must be a power of 2
    // chnaged fftSize
    an.fftSize = 16384;
    o.connect(an);
    o.connect(ctx.destination);
    o.start();

    g2 = c.drawingContext;

    o.onended = () => {
      o.disconnect();
      an.disconnect();
    };
  });
}

function draw() {
  if (!an) {
    return;
  }
  requestAnimationFrame(draw);
  const time = new Uint8Array(an.fftSize);
  an.getByteTimeDomainData(time);

  g2.clearRect(0, 0, 340, 120);
  g2.beginPath();
  for (let i = 0; i < time.length; i++) {
    const x = (i / time.length) * 340;
    const y = (time[i] / 255) * 120;
    i ? g2.lineTo(x, y) : g2.moveTo(x, y);
  }
  g2.stroke();
}
