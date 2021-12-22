import React, { Component } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10,
    };

    constructor(props) {
        super(props);
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
            loading: false,
        };
        this.seenJokes = new Set(this.state.jokes.map((joke) => joke.text));
        console.log(this.seenJokes);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (this.state.jokes.length === 0) {
            this.getJokes();
        }
    }
    async getJokes() {
        try {
            let jokes = [];
            while (jokes.length < this.props.numJokesToGet) {
                let res = await axios.get("https://icanhazdadjoke.com/", {
                    headers: { Accept: "application/json" },
                });
                let newJoke = res.data.joke;
                if (!this.seenJokes.has(newJoke)) {
                    jokes.push({ id: uuidv4(), text: newJoke, votes: 0 });
                } else {
                    console.log("There is an duplicate");
                    console.log(newJoke);
                }
            }
            this.setState(
                (prvSt) => ({
                    loading: false,
                    jokes: [...prvSt.jokes, ...jokes],
                }),
                () =>
                    window.localStorage.setItem(
                        "jokes",
                        JSON.stringify(this.state.jokes)
                    )
            );
        } catch (e) {
            alert(e);
            this.setState({ loading: false });
        }
    }
    handleClick() {
        this.setState({ loading: true }, this.getJokes);
    }
    handleVote(id, delta) {
        this.setState(
            (prvSt) => ({
                jokes: prvSt.jokes.map((joke) =>
                    joke.id === id
                        ? { ...joke, votes: (joke.votes += delta) }
                        : joke
                ),
            }),
            () =>
                window.localStorage.setItem(
                    "jokes",
                    JSON.stringify(this.state.jokes)
                )
        );
    }
    render() {
        if (this.state.loading) {
            return (
                <div className="JokeList-spinner">
                    <i className="far fa-8x em em-heart_eyes_cat fa-spin" />
                    <h1 className="JokeList-title">Loading...</h1>
                </div>
            );
        }
        let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">
                        <span>Dad</span> jokes
                    </h1>
                    <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"></img>
                    <button
                        className="JokeList-getmore"
                        onClick={this.handleClick}
                    >
                        New Joke
                    </button>
                </div>
                <div className="JokeList-jokes">
                    {" "}
                    {jokes.map((joke) => (
                        <Joke
                            key={joke.id}
                            votes={joke.votes}
                            text={joke.text}
                            upvote={() => this.handleVote(joke.id, 1)}
                            downvote={() => this.handleVote(joke.id, -1)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default JokeList;
