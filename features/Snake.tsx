"use client";

import { useEffect, useRef, useState } from "react";

type Point = [number, number];
type Status = "ready" | "playing" | "paused" | "over" | "won";
type Game = {
  snake: Point[];
  previous: Point[];
  food: Point;
  direction: Point;
  queue: Point[];
  status: Status;
  score: number;
  best: number;
};
const STEP = 120;
const SIZE = 16;
function fresh(best = 0): Game {
  const snake: Point[] = [
    [8, 8],
    [7, 8],
    [6, 8],
  ];
  return {
    snake,
    previous: snake,
    food: [12, 8],
    direction: [1, 0],
    queue: [],
    status: "ready",
    score: 0,
    best,
  };
}
function advance(game: Game) {
  const direction = game.queue.shift() || game.direction;
  const head: Point = [
    game.snake[0][0] + direction[0],
    game.snake[0][1] + direction[1],
  ];
  const ate = head[0] === game.food[0] && head[1] === game.food[1];
  const body = ate ? game.snake : game.snake.slice(0, -1);
  if (
    head.some((value) => value < 0 || value >= SIZE) ||
    body.some(([x, y]) => x === head[0] && y === head[1])
  ) {
    game.status = "over";
    return;
  }
  game.previous = game.snake;
  game.snake = [head, ...body];
  game.direction = direction;
  if (!ate) return;
  game.score++;
  game.best = Math.max(game.best, game.score);
  const occupied = new Set(game.snake.map(([x, y]) => y * SIZE + x));
  const free = Array.from({ length: SIZE * SIZE }, (_, i) => i).filter(
    (i) => !occupied.has(i),
  );
  if (!free.length) {
    game.status = "won";
    return;
  }
  const next = free[Math.floor(Math.random() * free.length)];
  game.food = [next % SIZE, Math.floor(next / SIZE)];
}
export default function Snake({ active = true }: { active?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const game = useRef<Game>(fresh());
  const controls = useRef<{
    start: () => void;
    pause: () => void;
    turn: (direction: Point) => void;
  }>({
    start: () => {},
    pause: () => {},
    turn: () => {},
  });
  const swipe = useRef<Point | null>(null);
  const [ui, setUi] = useState<{ status: Status; score: number; best: number }>(
    { status: "ready", score: 0, best: 0 },
  );
  useEffect(() => {
    const context = canvas.current?.getContext("2d", { alpha: true });
    if (!context) return;
    let frame = 0;
    let last = 0;
    let elapsed = 0;
    let accent = "#63dfae";
    const palette = () => {
      accent =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--accent")
          .trim() || "#63dfae";
      draw(1);
    };
    const observer = new MutationObserver(palette);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const sync = () =>
      setUi({
        status: game.current.status,
        score: game.current.score,
        best: game.current.best,
      });
    function draw(progress: number) {
      const model = game.current;
      context!.clearRect(0, 0, 512, 512);
      const unit = 512 / SIZE;
      context!.fillStyle = "#f2a078";
      const [fx, fy] = model.food;
      context!.beginPath();
      context!.arc((fx + 0.5) * unit, (fy + 0.5) * unit, 8, 0, Math.PI * 2);
      context!.fill();
      model.snake.forEach(([x, y], index) => {
        const previous =
          model.previous[Math.min(index, model.previous.length - 1)];
        const px = (previous[0] + (x - previous[0]) * progress) * unit;
        const py = (previous[1] + (y - previous[1]) * progress) * unit;
        context!.fillStyle = index === 0 ? "#d9f7e9" : accent;
        context!.beginPath();
        context!.roundRect(px + 2, py + 2, unit - 4, unit - 4, 6);
        context!.fill();
        if (index === 0) {
          context!.fillStyle = "#183d29";
          const horizontal = model.direction[0] !== 0;
          for (const offset of [-5, 5]) {
            context!.beginPath();
            context!.arc(
              px + 16 + (horizontal ? model.direction[0] * 6 : offset),
              py + 16 + (horizontal ? offset : model.direction[1] * 6),
              2,
              0,
              Math.PI * 2,
            );
            context!.fill();
          }
        }
      });
    }
    const loop = (time: number) => {
      if (game.current.status !== "playing") {
        draw(1);
        frame = 0;
        return;
      }
      elapsed += last ? Math.min(time - last, STEP * 2) : 0;
      last = time;
      while (elapsed >= STEP && game.current.status === "playing") {
        const oldScore = game.current.score;
        advance(game.current);
        elapsed -= STEP;
        if (
          oldScore !== game.current.score ||
          game.current.status !== "playing"
        ) {
          sync();
          if (game.current.score !== oldScore)
            try {
              localStorage.setItem("snake-best", String(game.current.best));
            } catch {}
        }
      }
      draw(game.current.status === "playing" ? elapsed / STEP : 1);
      if (game.current.status === "playing")
        frame = requestAnimationFrame(loop);
      else frame = 0;
    };
    const beginLoop = () => {
      cancelAnimationFrame(frame);
      elapsed = 0;
      last = 0;
      frame = requestAnimationFrame(loop);
    };
    const pause = () => {
      if (game.current.status === "playing") {
        game.current.status = "paused";
        cancelAnimationFrame(frame);
        frame = 0;
        draw(1);
        sync();
      }
    };
    controls.current = {
      start: () => {
        if (!active) return;
        game.current = { ...fresh(game.current.best), status: "playing" };
        sync();
        container.current?.focus({ preventScroll: true });
        beginLoop();
      },
      pause: () => {
        if (game.current.status === "paused" && active) {
          game.current.status = "playing";
          sync();
          container.current?.focus({ preventScroll: true });
          beginLoop();
        } else pause();
      },
      turn: (direction) => {
        const model = game.current;
        if (!active || model.status !== "playing" || model.queue.length >= 2)
          return;
        const lastDirection = model.queue.at(-1) || model.direction;
        if (
          direction[0] === lastDirection[0] &&
          direction[1] === lastDirection[1]
        )
          return;
        if (
          direction[0] + lastDirection[0] === 0 &&
          direction[1] + lastDirection[1] === 0
        )
          return;
        model.queue.push(direction);
      },
    };
    const hidden = () => {
      if (document.hidden) pause();
    };
    window.addEventListener("blur", pause);
    document.addEventListener("visibilitychange", hidden);
    frame = requestAnimationFrame(() => {
      try {
        game.current.best = Math.max(
          game.current.best,
          Number(localStorage.getItem("snake-best")) || 0,
        );
      } catch {}
      if (!active && game.current.status === "playing")
        game.current.status = "paused";
      palette();
      sync();
      if (active && game.current.status === "playing") beginLoop();
    });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("blur", pause);
      document.removeEventListener("visibilitychange", hidden);
    };
  }, [active]);
  const directions: Record<string, Point> = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    w: [0, -1],
    s: [0, 1],
    a: [-1, 0],
    d: [1, 0],
  };
  const message = {
    ready: "Ready when you are",
    playing: "Enjoy the little things.",
    paused: "Paused",
    over: "Game over. One more?",
    won: "You filled the board!",
  }[ui.status];
  return (
    <div
      ref={container}
      className="game-card"
      tabIndex={0}
      aria-label="Snake game. Arrow keys or WASD to move. Space to pause."
      onBlur={(e) => {
        if (
          !e.currentTarget.contains(e.relatedTarget) &&
          game.current.status === "playing"
        )
          controls.current.pause();
      }}
      onKeyDown={(e) => {
        if (directions[e.key]) {
          e.preventDefault();
          controls.current.turn(directions[e.key]);
        } else if (
          (e.key === " " && e.target === e.currentTarget) ||
          e.key === "Escape"
        ) {
          e.preventDefault();
          controls.current.pause();
        }
      }}
    >
      <div className="game-head">
        <div>
          <small>A LITTLE ARCADE BREAK</small>
          <h3>Snake</h3>
        </div>
        <div className="score">
          {ui.score}
          <small>BEST {ui.best}</small>
        </div>
      </div>
      <canvas
        className="snake-canvas"
        ref={canvas}
        width={512}
        height={512}
        role="img"
        aria-label={`Snake board. Score ${ui.score}. ${message}`}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          swipe.current = [e.clientX, e.clientY];
          container.current?.focus({ preventScroll: true });
        }}
        onPointerUp={(e) => {
          if (!swipe.current) return;
          const dx = e.clientX - swipe.current[0],
            dy = e.clientY - swipe.current[1];
          if (Math.max(Math.abs(dx), Math.abs(dy)) > 15)
            controls.current.turn(
              Math.abs(dx) > Math.abs(dy)
                ? [Math.sign(dx), 0]
                : [0, Math.sign(dy)],
            );
          swipe.current = null;
        }}
        onPointerCancel={() => {
          swipe.current = null;
        }}
      />
      <div className="game-actions">
        <span role="status">{message}</span>
        <button onClick={() => controls.current.start()}>
          {ui.status === "ready" ? "Play" : "Restart"}
        </button>
        {(ui.status === "playing" || ui.status === "paused") && (
          <button onClick={() => controls.current.pause()}>
            {ui.status === "paused" ? "Resume" : "Pause"}
          </button>
        )}
      </div>
      <p className="game-hint">Arrow keys / WASD to steer · Space to pause</p>
      <div className="dpad">
        {(
          [
            { label: "Left", arrow: "←", dir: [-1, 0] },
            { label: "Up", arrow: "↑", dir: [0, -1] },
            { label: "Down", arrow: "↓", dir: [0, 1] },
            { label: "Right", arrow: "→", dir: [1, 0] },
          ] as { label: string; arrow: string; dir: Point }[]
        ).map(({ label, arrow, dir }) => (
          <button
            key={label}
            aria-label={label}
            onPointerDown={(e) => {
              e.preventDefault();
              controls.current.turn(dir);
            }}
            onClick={(e) => {
              if (e.detail === 0) controls.current.turn(dir);
            }}
          >
            {arrow}
          </button>
        ))}
      </div>
    </div>
  );
}
