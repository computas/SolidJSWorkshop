import { Component } from 'solid-js';
import './DeadMessage.css';

const DeadMessage: Component = () => {
  return (
    <div class="dead-message">
      <p>Omg you died!</p>
      <p>Press 'r' or big button to reset</p>
    </div>
  );
};

export default DeadMessage;
