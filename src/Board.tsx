import { createSignal, createEffect, Show, createRenderEffect } from "solid-js";

import Body from "./Snake/Body";
import Food from "./Food";
import { SnakeBodyPart } from "./types/snake-body-part";
import GameConfig from "./game-config";

export type FoodType = {
  x: number;
  y: number;
};

const StartSnake: SnakeBodyPart[] = [
  {
    direction: "right",
    x: 0,
    y: 0,
    id: "0",
  },
  {
    direction: "right",
    x: 1,
    y: 0,
    id: "0",
  },
];

const YMod = {
  up: -1,
  down: 1,
  left: 0,
  right: 0,
};

const XMod = {
  up: 0,
  down: 0,
  left: -1,
  right: 1,
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getFood(): FoodType {
  return {
    x: getRandomInt(GameConfig.max),
    y: getRandomInt(GameConfig.max),
  };
}

function getHead(body: SnakeBodyPart[]): SnakeBodyPart {
  return body[body.length - 1];
}

export default () => {
  const [speed, setSpeed] = createSignal(GameConfig.initSpeed);
  const [score, setScore] = createSignal(0);
  const [snakeLength, setSnakeLength] = createSignal(GameConfig.initLength);
  const [isDead, setIsDead] = createSignal(false);
  const [bodyParts, setBodyParts] = createSignal(StartSnake);
  const [food, setFood] = createSignal(getFood());
  const [direction, setDirection] = createSignal("right");

  function onKeyDown(event: KeyboardEvent) {
    const dir = direction();
    if (event.key === "ArrowRight" && dir !== "left") setDirection("right");
    if (event.key === "ArrowLeft" && dir !== "right") setDirection("left");
    if (event.key === "ArrowUp" && dir !== "down") setDirection("up");
    if (event.key === "ArrowDown" && dir !== "up") setDirection("down");
  }

  function getNewPart(part: SnakeBodyPart) {
    const x = part.x + XMod[direction()];
    const y = part.y + YMod[direction()];
    return { ...part, direction: direction(), x, y };
  }

  function getNewParts(): SnakeBodyPart[] {
    const body = [...bodyParts()];
    const head = getHead(body);
    if (body.length === snakeLength()) {
      body.shift();
    }

    body.push(getNewPart(head));
    return body;
  }

  function reset() {
    setSnakeLength(GameConfig.initLength);
    setDirection("right");
    setBodyParts(StartSnake);
    setIsDead(false);
  }

  function isOutOfBounds(head: SnakeBodyPart) {
    const isOutOfBoundsTopLeft = head.x < 0 || head.y < 0;
    const isOutOfBoundsBottomRight =
      head.x >= GameConfig.max || head.y >= GameConfig.max;
    return isOutOfBoundsTopLeft || isOutOfBoundsBottomRight;
  }

  function isCollisionWithBody(head: SnakeBodyPart, body: SnakeBodyPart[]) {
    return body.some(
      (part) => part !== head && part.x === head.x && part.y === head.y
    );
  }

  createRenderEffect(() => {
    document.body.addEventListener("keydown", onKeyDown);
  });

  createEffect(() => {
    const head = getHead(bodyParts());
    const bodyColl = isCollisionWithBody(head, bodyParts());

    if (isOutOfBounds(head) || bodyColl) {
      setIsDead(true);
    }
  });

  createEffect(() => {
    const head = getHead(bodyParts());
    const eatFood = head.x === food().x && head.y === food().y;

    if (eatFood) {
      if (score() % GameConfig.speedIncrease === 0) {
        setSpeed(speed() - GameConfig.speedModifier);
      }
      setSnakeLength(snakeLength() + 1);
      setFood(getFood());
      setScore(score() + 1);
    }
  });

  // TODO: Need to set new interval on speedChange
  setInterval(() => {
    setBodyParts(getNewParts());
  }, speed());

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid black",
        height: `${GameConfig.max * 40}px`,
        width: `${GameConfig.max * 40}px`,
      }}
    >
      <div>Score {score()}</div>
      <div>Speed {speed()}</div>
      <Show
        when={!isDead()}
        fallback={
          <>
            <p>Omg you died!</p>
            <button onClick={reset}>Reset</button>
          </>
        }
      >
        <Body bodyParts={bodyParts()} />
        <Food pos={food()} />
      </Show>
    </div>
  );
};
