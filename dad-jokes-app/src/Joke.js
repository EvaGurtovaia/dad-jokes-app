import React, { Component } from "react";
import "./Joke.css";
import axios from "axios";

class Joke extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getBorderColor() {
        if (this.props.votes >= 15) {
            return "#4CAF50";
        } else if (this.props.votes >= 12) {
            return "#8BC34A";
        } else if (this.props.votes >= 9) {
            return "#CDDC39";
        } else if (this.props.votes >= 6) {
            return "#FFEB3B";
        } else if (this.props.votes >= 3) {
            return "#FFC107";
        } else if (this.props.votes >= 0) {
            return "#FF9800";
        } else {
            return "#f44336";
        }
    }

    async componentDidMount() {}

    render() {
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <i
                        className="fas fa-arrow-up"
                        onClick={this.props.upvote}
                    />
                    <span
                        className="Joke-votes"
                        style={{ borderColor: this.getBorderColor() }}
                    >
                        {this.props.votes}
                    </span>
                    <i
                        className="fas fa-arrow-down"
                        onClick={this.props.downvote}
                    />
                </div>
                <div className="Joke-text">{this.props.text}</div>
                <div className="Joke-smiley">
                    <i
                        class="em em-smiley_cat"
                        aria-role="presentation"
                        aria-label="SMILING CAT FACE WITH OPEN MOUTH"
                    ></i>
                </div>
            </div>
        );
    }
}

export default Joke;
