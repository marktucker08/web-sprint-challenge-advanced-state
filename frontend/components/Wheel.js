import React from 'react'
import { connect } from 'react-redux';
import { moveCounterClockwise, moveClockwise } from '../state/action-creators';

// export default function Wheel(props) {
const Wheel = (props) => {
  const { wheel, moveCounterClockwise, moveClockwise } = props;
  console.log(wheel);
  const counterClockwise = () => {
    moveCounterClockwise(wheel);
  }

  const clockwise = () => {
    moveClockwise(wheel);
  }

  return (
    <div id="wrapper">
      <div id="wheel">
      {[0, 1, 2, 3, 4, 5].map(idx => (
            <div key={idx} className={`cog${idx === wheel ? ' active' : ''}`} style={{ "--i": idx }}>
              {idx === wheel ? 'B' : null}
            </div>
          ))}
        {/* <div className="cog active" style={{ "--i": 0 }}>B</div>
        <div className="cog" style={{ "--i": 1 }}></div>
        <div className="cog" style={{ "--i": 2 }}></div>
        <div className="cog" style={{ "--i": 3 }}></div>
        <div className="cog" style={{ "--i": 4 }}></div>
        <div className="cog" style={{ "--i": 5 }}></div> // --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={counterClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={clockwise}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    wheel: state.wheel
  }
}


export default connect(mapStateToProps, {moveCounterClockwise, moveClockwise})(Wheel);