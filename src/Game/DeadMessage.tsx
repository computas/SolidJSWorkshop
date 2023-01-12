import { Component } from 'solid-js';
import './DeadMessage.css';

type Props = {
  resetClicked: () => void;
};

const DeadMessage: Component<Props> = ({ resetClicked }) => {
  return (
    <div class="dead-message">
      <p>Omg you died!</p>
      <button class="reset-button" onClick={resetClicked}>
        Reset
      </button>
    </div>
  );
};

export default DeadMessage;
