import * as faceapi from 'face-api.js';
import { makeAudio } from '@solid-primitives/audio';
import { createSignal, createEffect, Show, onMount } from 'solid-js';
import GameConfig from '../game-config';
import Grid from '../Grid/Grid';
import { isFoodCollisionWithBody, isCollision, isFoodCollision } from '../helpers/collision';
import { getHead, getRandomPos } from '../helpers/get-body-part';
import { XMod, YMod } from '../helpers/position-map';
import { SnakeBodyPart } from '../types/snake-body-part';
import DeadMessage from './DeadMessage';

import './Game.css';

export default () => {
  const [snake, setSnake] = createSignal(GameConfig.initSnake);
  const [didEat, setDidEat] = createSignal(false);
  const [direction, setDirection] = createSignal(getHead(GameConfig.initSnake).direction);
  const [score, setScore] = createSignal(0);
  const [isDead, setIsDead] = createSignal(false);
  const [food, setFood] = createSignal(getRandomPos());
  const player = makeAudio('src/blip2.m4a');
  const [emotion, setEmotion] = createSignal('');

  setInterval(() => moveSnake(), 1000);

  let ref: HTMLVideoElement;
  let devices = [];
  document.body.addEventListener('keydown', (event) => handleKey(event.key));

  onMount(() => {
    const loadModels = async () => {
      console.log('loaded');
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('models'),
        faceapi.nets.faceExpressionNet.loadFromUri('models'),
      ]);
    };
    loadModels();
  });

  const startVideo = async () => {
    ref.srcObject = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        deviceId: navigator.mediaDevices.enumerateDevices()[0],
      },
      audio: false,
    });

    setInterval(async () => {
      const { expressions } = await faceapi
        .detectSingleFace(ref, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      const { emotion, score } = getExpressionScore(expressions);
      setEmotion(emotion);
      if (score > 0.65) {
        if (emotion === 'happy') {
          handleKey('ArrowUp');
        } else if (emotion === 'sad') {
          handleKey('ArrowLeft');
        } else if (emotion === 'angry') {
          handleKey('ArrowRight');
        } else if (emotion === 'surprised') {
          handleKey('ArrowDown');
        }
      }
    }, 500);
  };

  function getExpressionScore(expressions: faceapi.FaceExpressions) {
    const { expression, probability } = expressions.asSortedArray()[0];
    const expressionCorrected: string = expression === 'fearful' ? 'surprised' : expression;
    return { emotion: expressionCorrected, score: probability };
  }

  // We could move all content of effects to setInterval
  createEffect(() => {
    if (isCollision(snake())) {
      setIsDead(true);
    }
  }, []);

  createEffect(() => {
    if (isFoodCollision(snake(), food())) {
      setNewRandomFood();
      setDidEat(true);
      player.play();
      setScore(score() + 1);
    }
  });

  function handleKey(key: string) {
    if (key === 'r' && isDead()) reset();

    const head = getHead(snake());
    if (key === 'ArrowRight' && head.direction !== 'left') setDirection('right');
    if (key === 'ArrowLeft' && head.direction !== 'right') setDirection('left');
    if (key === 'ArrowUp' && head.direction !== 'down') setDirection('up');
    if (key === 'ArrowDown' && head.direction !== 'up') setDirection('down');
  }

  function getMovedHead(part: SnakeBodyPart) {
    const x = part.x + XMod[direction()];
    const y = part.y + YMod[direction()];
    return { direction: direction(), x, y };
  }

  function moveSnake(): void {
    const snakeBody = [...snake()];
    const head = getHead(snakeBody);
    if (didEat()) {
      setDidEat(false);
    } else {
      snakeBody.shift();
    }

    snakeBody.push(getMovedHead(head));
    setSnake(snakeBody);
  }

  function setNewRandomFood() {
    let food = getRandomPos();
    while (isFoodCollisionWithBody(food, snake())) {
      food = getRandomPos();
    }
    setFood(food);
  }

  function reset() {
    setDirection(getHead(GameConfig.initSnake).direction);
    setSnake(GameConfig.initSnake);
    setDidEat(false);
    setIsDead(false);
    setScore(0);
  }

  return (
    <>
      <video id="video" ref={ref} width="1280" height="720" autoplay></video>
      <button onClick={startVideo}>start</button>
      {emotion}
      <div
        style={{
          display: 'grid',
          'grid-template-columns': '1fr 1fr 1fr',
          'grid-template-rows': '1fr 1fr 1fr',
        }}
      >
        <span></span>
        <span>😀</span>
        <span></span>

        <span>😢</span>
        <span></span>
        <span>😡</span>

        <span></span>
        <span>😯</span>
        <span></span>
      </div>

      <div class="game-container">
        <div class="score-title">Score {score()}</div>
        <div class="board-container">
          <Show when={!isDead()} fallback={<DeadMessage />}>
            <Grid snake={snake()} food={food()} />
          </Show>
        </div>
      </div>
    </>
  );
};
