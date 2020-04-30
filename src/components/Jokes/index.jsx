import React, { Component } from "react";
import "./index.css";

import Joke from "../Joke";
import SidePanel from "../SidePanel";

const INCREASE = "increase";

class Jokes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      jokes: [],
    };
    this.addJokes = this.addJokes.bind(this);
    this.changeScore = this.changeScore.bind(this);
  }

  async componentDidMount() {
    if (localStorage.getItem("jokes")) {
      this.setState({
        jokes: JSON.parse(localStorage.getItem("jokes")),
        loading: false,
      });
    } else {
      this.addJokes();
    }
  }

  componentDidUpdate() {
    localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
  }

  async addJokes() {
    this.setState({
      loading: true,
    });
    const headers = new Headers();
    headers.append("Accept", "application/json");
    const options = {
      method: "get",
      headers: headers,
      mode: "cors",
      cache: "default",
    };

    let jokeList = [];
    while (jokeList.length < 10) {
      const resp = await fetch(`https://icanhazdadjoke.com/`, options);
      const joke = await resp.json();

      if (this.nonExistingJoke(joke)) {
        joke.score = 0;
        jokeList.push(joke);
      }
    }

    this.setState((curStat) => ({
      jokes: [...curStat.jokes, ...jokeList].sort((a, b) => a.score < b.score),
      loading: false,
    }));
  }

  nonExistingJoke(joke) {
    return (
      (this.state.jokes.length > 0 &&
        !this.state.jokes.map((joke) => joke.id).includes(joke.id)) ||
      this.state.jokes.length === 0
    );
  }

  changeScore(id, action) {
    const newJokes = this.state.jokes
      .map((joke) => {
        if (joke.id === id) {
          action === INCREASE ? (joke.score += 1) : (joke.score -= 1);
        }

        return joke;
      })
      .sort((a, b) => a.score < b.score);

    this.setState({
      jokes: newJokes,
    });
  }

  render() {
    const jokes = this.state.jokes.map((joke) => {
      return (
        <Joke
          key={joke.id}
          id={joke.id}
          joke={joke.joke}
          score={joke.score}
          changeScore={this.changeScore}
        />
      );
    });

    return (
      <div className="Jokes">
        <SidePanel addJokes={this.addJokes} />
        <div
          className={`Jokes__list ${
            this.state.loading ? "Jokes__list-loading" : ""
          }`}
        >
          {this.state.loading ? <span className="loader">LOADER</span> : jokes}
        </div>
      </div>
    );
  }
}

export default Jokes;
