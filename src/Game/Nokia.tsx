import { children, Component, ParentProps } from 'solid-js';
import './Nokia.scss';

type Props = {
  resetClicked: () => void;
  directionClicked: (dir: string) => void;
} & ParentProps;

const Nokia: Component<Props> = (props) => {
  const c = children(() => props.children);

  return (
    <div class="container">
      <div class="oval-container">
        <div class="nokia3310">
          <div class="nokia-head-container">
            <div class="speaker">
              <div class="hole"></div>
              <div class="hole"></div>
              <div class="hole"></div>
              <div class="hole"></div>
              <div class="hole"></div>
            </div>
            <div class="logo">NOKIA</div>

            <div class="screen-container">{c()}</div>

            <div class="bottom-oval" onClick={props.resetClicked}>
              <div class="big button top"></div>
            </div>
          </div>
          <div class="bottom-buttons">
            <div class="big button left">
              <span>C</span>
            </div>
            <div class="big button right">
              <span>&lt;</span>
              <span>&gt;</span>
            </div>
          </div>
          <div class="keyboard">
            <div class="button-key-container">
              <div class="button-key left">
                <span class="special">1</span>
                <span class="minitext compact">o_o</span>
              </div>
            </div>
            <div class="button-key-container" onClick={() => props.directionClicked('ArrowUp')}>
              <div class="button-key middle">
                <span class="special">2</span>
                <span class="minitext">abc</span>
              </div>
            </div>
            <div class="button-key-container invert">
              <div class="button-key right">
                <span class="special">3</span>
                <span class="minitext">def</span>
              </div>
            </div>
            <div class="button-key-container" onClick={() => props.directionClicked('ArrowLeft')}>
              <div class="button-key left">
                <span class="special">4</span>
                <span class="minitext">ghi</span>
              </div>
            </div>
            <div class="button-key-container">
              <div class="button-key middle">
                <span class="special">5</span>
                <span class="minitext">jkl</span>
              </div>
            </div>
            <div
              class="button-key-container invert"
              onClick={() => props.directionClicked('ArrowRight')}
            >
              <div class="button-key right">
                <span class="special">6</span>
                <span class="minitext">mno</span>
              </div>
            </div>
            <div class="button-key-container">
              <div class="button-key left">
                <span class="special">7</span>
                <span class="minitext">pqrs</span>
              </div>
            </div>
            <div class="button-key-container" onClick={() => props.directionClicked('ArrowDown')}>
              <div class="button-key middle">
                <span class="special">8</span>
                <span class="minitext">tuv</span>
              </div>
            </div>
            <div class="button-key-container invert">
              <div class="button-key right">
                <span class="special">9</span>
                <span class="minitext">wxyz</span>
              </div>
            </div>
            <div class="button-key-container">
              <div class="button-key left">
                <span class="special">*</span>
                <span class="minitext">+</span>
              </div>
            </div>
            <div class="button-key-container">
              <div class="button-key middle">
                <span class="special">0</span>
                <span class="minitext rotate">[</span>
              </div>
            </div>
            <div class="button-key-container invert">
              <div class="button-key right">
                <span class="special">#</span>
                <span class="minitext home"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nokia;
