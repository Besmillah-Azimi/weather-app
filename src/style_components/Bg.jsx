import React, { useEffect, useRef } from "react";
import { useWeather } from "../contexts/WeatherContext";

export default function WeatherBackground() {
  const { state } = useWeather();
  const { rain, snow, lightning, clouds, timeOfDay, wind } = state;

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const animationIdRef = useRef(null);
  const assetsRef = useRef([]);
  const timersRef = useRef({});
  const imageLoadedRef = useRef(false);
  const cloudImgRef = useRef(null);

  const CANVAS_W = window.innerWidth;
  const CANVAS_H = window.innerHeight;
  const windSpeed = 30;

  const randomRange = (min, max, round = true) => {
    const v = Math.random() * (max - min) + min;
    return round ? Math.floor(v) : v;
  };

  // 🌥️ Load cloud image
  const loadCloudImage = (callback) => {
    const img = new Image();
    img.src = "/icons/weather/cloud_image.png";
    img.width = 1500;
    img.height = 400;
    img.onload = () => {
      cloudImgRef.current = img;
      imageLoadedRef.current = true;
      callback?.();
    };
  };

  // ☁️ Cloud class
  function Cloud(options = {}) {
    this.img = cloudImgRef.current;
    const scale = randomRange(40, 80) / 100;
    this.width = this.img.width * scale;
    this.height = this.img.height * scale;
    this.opacity = randomRange(60, 90) / 100;
    this.x = options.x ?? randomRange(-200, CANVAS_W + 200);
    this.y = options.y ?? randomRange(30, 160);
    this.xVelocity = (windSpeed - randomRange(5, 15)) / 120;
    this.floatOffset = Math.random() * Math.PI * 2;
    this.floatSpeed = randomRange(15, 35) / 1000;
  }
  Cloud.prototype.draw = function () {
    const ctx = ctxRef.current;
    this.x += this.xVelocity;
    this.floatOffset += this.floatSpeed;
    const floatY = Math.sin(this.floatOffset) * 5;
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(this.img, this.x, this.y + floatY, this.width, this.height);
    ctx.restore();
    if (this.x > CANVAS_W + 100) this.x = -this.width - 100;
    return true;
  };

  // 🌧️ Rain
  function RainDrop() {
    this.width = 2;
    this.height = randomRange(15, 25);
    this.x = randomRange(0, CANVAS_W);
    this.y = -10;
    this.yVelocity = 10;
  }
  RainDrop.prototype.draw = function () {
    const ctx = ctxRef.current;
    this.y += this.yVelocity;
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    return this.y < CANVAS_H;
  };

  // ❄️ Snow
  function SnowFlake() {
    this.reset();
  }
  SnowFlake.prototype.reset = function () {
    this.depth = Math.random() * 1.25 + 0.25;
    this.radius = (Math.random() * 3 + 0.6) * this.depth;
    this.x = Math.random() * (CANVAS_W + 200) - 100;
    this.y = Math.random() * -CANVAS_H;
    this.speedY = (Math.random() * 0.6 + 0.3) * this.depth * 1.2;
    this.speedX = (Math.random() * 0.6 - 0.3) * this.depth;
    this.opacity = Math.random() * 0.6 + 0.35;
    this.angle = Math.random() * Math.PI * 2;
    this.swing = Math.random() * 0.8 + 0.2;
    this.variation = Math.random() * 0.02 + 0.005;
  };
  SnowFlake.prototype.update = function (windBias = 0) {
    this.angle += this.variation;
    this.x +=
      Math.sin(this.angle) * this.swing +
      this.speedX +
      windBias * 0.5 * this.depth;
    this.y += this.speedY;
    if (this.y > CANVAS_H + this.radius) this.reset();
    if (this.x > CANVAS_W + 100) this.x = -100;
    if (this.x < -100) this.x = CANVAS_W + 100;
  };
  SnowFlake.prototype.draw = function () {
    const ctx = ctxRef.current;
    const r = this.radius;
    const g = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      r * 1.8
    );
    g.addColorStop(0, `rgba(255,255,255,${this.opacity})`);
    g.addColorStop(0.6, `rgba(255,255,255,${this.opacity * 0.6})`);
    g.addColorStop(1, `rgba(255,255,255,0)`);
    ctx.beginPath();
    ctx.fillStyle = g;
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fill();
  };

  // ⚡ Lightning
  function Lightning() {
    this.x = randomRange(0, CANVAS_W);
    this.age = 0;
    this.opacity = 0.8;
    this.points = [[this.x, 0]];
    while (this.points[this.points.length - 1][1] < CANVAS_H) {
      const last = this.points[this.points.length - 1];
      this.points.push([
        last[0] + randomRange(-10, 10),
        last[1] + randomRange(10, 50),
      ]);
    }
  }
  Lightning.prototype.draw = function () {
    const ctx = ctxRef.current;
    this.opacity -= 0.02;
    if (this.opacity <= 0) return false;
    ctx.beginPath();
    ctx.moveTo(this.points[0][0], this.points[0][1]);
    for (let i = 1; i < this.points.length; i++)
      ctx.lineTo(this.points[i][0], this.points[i][1]);
    ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();
    return true;
  };

  // 🌠 Comet (blazing shooting star)
  function Comet() {
    this.x = randomRange(-100, CANVAS_W / 2);
    this.y = randomRange(0, CANVAS_H / 3);
    this.length = randomRange(80, 160);
    this.speed = randomRange(10, 18);
    this.angle = Math.PI / 4; // 45° diagonal
    this.opacity = 1;
    this.fadeRate = 0.02;
  }
  Comet.prototype.draw = function () {
    const ctx = ctxRef.current;
    const tailX = this.x - Math.cos(this.angle) * this.length;
    const tailY = this.y - Math.sin(this.angle) * this.length;

    const grad = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
    grad.addColorStop(0, `rgba(255,255,255,${this.opacity})`);
    grad.addColorStop(1, `rgba(255,255,255,0)`);

    ctx.beginPath();
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();

    // movement
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.opacity -= this.fadeRate;

    return (
      this.opacity > 0 && this.x < CANVAS_W + 100 && this.y < CANVAS_H + 100
    );
  };

  // 🌌 Stars (subtle & realistic)
  let stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * CANVAS_W,
    y: Math.random() * CANVAS_H * 0.5,
    r: Math.random() * 1 + 0.2,
    twinkleSpeed: Math.random() * 0.015 + 0.005,
    phase: Math.random() * Math.PI * 2,
  }));

  const drawStars = (ctx) => {
    stars.forEach((star) => {
      const alpha =
        0.15 + Math.sin(Date.now() * star.twinkleSpeed + star.phase) * 0.1;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  // 🟦 Background gradient
  const drawGradient = (ctx, a, b) => {
    const g = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    g.addColorStop(0, a);
    g.addColorStop(1, b);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  };

  // 🌞 Sun
  const drawSun = (ctx) => {
    const x = CANVAS_W * 0.8;
    const y = CANVAS_H * 0.25;
    const baseRadius = 40;
    const time = Date.now() * 0.002;
    const pulse = Math.sin(time) * 1.5;
    const radius = baseRadius + pulse;

    const glow = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
    glow.addColorStop(0, "rgba(255,250,200,0.8)");
    glow.addColorStop(0.4, "rgba(255,220,120,0.4)");
    glow.addColorStop(1, "rgba(255,200,0,0)");
    ctx.beginPath();
    ctx.fillStyle = glow;
    ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
    ctx.fill();

    const core = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.8);
    core.addColorStop(0, "rgba(255,255,255,1)");
    core.addColorStop(1, "rgba(255,230,120,0.5)");
    ctx.beginPath();
    ctx.fillStyle = core;
    ctx.arc(x, y, radius * 1.2, 0, Math.PI * 2);
    ctx.fill();
  };

  // 🌙 Moon
  const drawMoon = (ctx) => {
    const x = CANVAS_W * 0.8;
    const y = CANVAS_H * 0.22;
    const baseRadius = 30;
    const time = Date.now() * 0.001;
    const shimmer = (Math.sin(time * 3) + 1) * 0.5;
    const radius = baseRadius + shimmer * 1.2;

    const halo = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
    halo.addColorStop(0, `rgba(255,255,255,${0.4 + shimmer * 0.2})`);
    halo.addColorStop(0.4, "rgba(220,230,255,0.25)");
    halo.addColorStop(1, "rgba(180,200,255,0)");
    ctx.beginPath();
    ctx.fillStyle = halo;
    ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
    ctx.fill();

    const moonGrad = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.3);
    moonGrad.addColorStop(0, "rgba(255,255,255,1)");
    moonGrad.addColorStop(1, "rgba(210,220,235,0.6)");
    ctx.beginPath();
    ctx.fillStyle = moonGrad;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x + 8, y - 4, radius * 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  };

  // 🎨 Background rendering
  const drawBackground = (ctx) => {
    switch (timeOfDay) {
      case "night":
        drawGradient(ctx, "#040615", "#101728");
        if (!clouds && !rain && !snow) {
          drawStars(ctx);
          drawMoon(ctx);
        }
        break;
      case "day":
        drawGradient(ctx, "#8fd3ff", "#3ba7d4");
        if (!clouds && !rain && !snow) drawSun(ctx);
        break;
      case "sunrise":
        drawGradient(ctx, "#94b7d5", "#ffb98f");
        break;
      case "sunset":
        drawGradient(ctx, "#180b0e", "#d7d38c");
        break;
      default:
        drawGradient(ctx, "#90dffe", "#38a3d1");
    }
  };

  // 🌀 Animation
  const animate = () => {
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    drawBackground(ctx);

    // draw assets
    for (let i = 0; i < assetsRef.current.length; i++) {
      if (!assetsRef.current[i].draw()) {
        assetsRef.current.splice(i, 1);
        i--;
      }
    }

    if (snow && timersRef.current.snowFlakes) {
      const windBias = wind ? Math.sin(Date.now() / 2000) : 0;
      timersRef.current.snowFlakes.forEach((f) => {
        f.update(windBias);
        f.draw();
      });
    }

    // Occasionally spawn a comet at night
    if (timeOfDay === "night" && Math.random() < 0.002) {
      assetsRef.current.push(new Comet());
    }

    animationIdRef.current = requestAnimationFrame(animate);
  };

  const startWeather = () => {
    if (!imageLoadedRef.current) return;
    if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    assetsRef.current = [];
    timersRef.current = {};

    if (clouds) {
      assetsRef.current.push(new Cloud({ x: -300 }));
      assetsRef.current.push(new Cloud({ x: 400 }));
      assetsRef.current.push(new Cloud({ x: 900 }));
      assetsRef.current.push(new Cloud({ x: 1300 }));
    }

    if (rain) {
      timersRef.current.rain = setInterval(
        () => assetsRef.current.push(new RainDrop()),
        60
      );
    }

    if (lightning) {
      const flash = () => {
        assetsRef.current.push(new Lightning());
        timersRef.current.light = setTimeout(flash, randomRange(2000, 7000));
      };
      flash();
    }

    if (snow) {
      timersRef.current.snowFlakes = Array.from(
        { length: 250 },
        () => new SnowFlake()
      );
    }

    animate();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;
    ctxRef.current = canvas.getContext("2d");
    loadCloudImage(startWeather);
    return () => {
      cancelAnimationFrame(animationIdRef.current);
      Object.values(timersRef.current).forEach(clearInterval);
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, [timeOfDay, clouds, rain, snow, lightning, wind]);

  return <canvas ref={canvasRef} className="canvas-background" />;
}
