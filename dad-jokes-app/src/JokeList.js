import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10,
    };

    constructor(props) {
        super(props);
        this.state = { jokes: [] };
    }

    async componentDidMount() {
        let jokes = [];
        while (jokes.length < this.props.numJokesToGet) {
            let res = await axios.get("https://icanhazdadjoke.com/", {
                headers: { Accept: "application/json" },
            });
            jokes.push(res.data.joke);
        }
        this.setState({ jokes: jokes });
    }

    render() {
        return (
            <div className="JokeLists">
                <h1>Dad's jokes</h1>
                {this.state.jokes.map((joke) => (
                    <div> {joke}</div>
                ))}
                ;
            </div>
        );
    }
}

export default JokeList;
