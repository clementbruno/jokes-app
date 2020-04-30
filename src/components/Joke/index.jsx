import React from "react";
import "./index.css";

const INCREASE = "increase";
const DECREASE = "decrease";

const Joke = ({ joke, changeScore, id, score }) => {
  const emojis = ["😫", "🙂", "😄", "😂", "🤣"];
  let styleClass;
  let emoji = emojis[1];

  if (score > 15) {
    styleClass = "Joke__controls__score--great";
    emoji = emojis[emojis.length - 1];
  } else if (score > 10) {
    styleClass = "Joke__controls__score--good";
    emoji = emojis[emojis.length - 2];
  } else if (score > 0) {
    styleClass = "Joke__controls__score--average";
    emoji = emojis[emojis.length - 3];
  } else if (score < 0) {
    styleClass = "Joke__controls__score--negative";
    emoji = emojis[0];
  }

  function handleClick(e) {
    const action = e.target.dataset.action;
    changeScore(id, action);
  }

  return (
    <div className="Joke">
      <div className="Joke__controls">
        <span
          data-action={INCREASE}
          aria-label="Joke__controls__emojiUp"
          role="img"
          className="Joke__controls__emojiUp"
          onClick={handleClick}
        >
          ⬆
        </span>
        <span className={`Joke__controls__score ${styleClass}`}>{score}</span>
        <span
          data-action={DECREASE}
          aria-label="Joke__controls__emojiDown"
          role="img"
          className="Joke__controls__emojiDown"
          onClick={handleClick}
        >
          ⬇
        </span>
      </div>
      <div className="Joke__content">{joke}</div>
      <div className="Joke__emoji-container">
        <span aria-label="Joke__emoji" role="img" className="Joke__emoji">
          {emoji}
        </span>
      </div>
    </div>
  );
};

export default Joke;
