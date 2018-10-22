import React, { Component } from 'react';
import { 
    Button, 
    Input,
    Grid,
    Segment,
    List,
    Container,
} from 'semantic-ui-react';

import './Game.css';
import history from '../../history';
import axios from 'axios';
import { generateNonce } from '../../utils';
import { withRouter } from 'react-router-dom';

const UserListItem = ({ username, points }) => (
    <List.Item>
        <List.Content>
            <List.Header>{username}</List.Header>
            <List.Description>Points: {points}</List.Description>
        </List.Content>
    </List.Item>
);

const UserList = ({ users }) => (
    <Segment inverted className="game-users-width">
        <List divided inverted relaxed>
            {
                users.map((user, i) => {
                    return <UserListItem key={i} username={user.username} points={user.points} />
                })
            }
        </List>
    </Segment>
);

class Game extends Component {
    state = {
        answer: '',
        gameid: '',
        users: [],
        correctness: '',
    };

    // TODO: Destructure everything
    async componentDidMount() {
        if(this.props.location.pathname === '/') {
            const nonce = generateNonce(16);
            history.push(`/${nonce}`);

            const game = await axios.post(`http://localhost:8080/game/${nonce}/user/anthony`);
            console.log(game);

            this.setState(() => {
                return { 
                    gameid: game.data.gameid,
                    users: game.data.users,
                };
            });
        } else {
            const { pathname } = this.props.location;

            await axios.put(`http://localhost:8080/game${pathname}/user/blah`);
            const game = await axios.get(`http://localhost:8080/game${pathname}`);
            console.log(game);

            this.setState(() => {
                return {
                    gameid: game.data.gameid,
                    users: game.data.users, 
                }
            });
        }
    }

    handleAnswer = () => {
        const isCorrect = this.validateAnswer(this.state.answer);

        this.setState(() => {
            return { correctness: (isCorrect) ? 'Correct' : 'False'}
        });
    };

    handleInput = (e) => {
        const val = e.target.value;

        this.setState(() => {
           return { answer: val,};
        });
    };

    validateAnswer = (answer) => {
        // TODO: Need to check if it's the correct answer
        // This will probably be done through sockets
        // For now this will just check the answer if it's correct

        // TODO: allow different casing for answers

        if(answer === 'european') {
            return true
        }

        return false;
    };

    render() {
        const { users } = this.state;
        console.log(users);

        return (
            // TODO: Some kind of Question will appear here
            <Grid className="game-container" verticalAlign="middle">
                <Grid.Column>
                    <Grid.Column className="game-question">
                        <Container>
                            <h2>What is the airspeed velocity of an unladen swallow?</h2>
                        </Container>
                    </Grid.Column>
                    <Grid.Column className="game-answer">
                        <Input 
                            action={
                                        <Button 
                                            primary 
                                            onClick={this.handleAnswer.bind(this)}
                                        >
                                            Answer
                                        </Button>
                                   } 
                            onChange={this.handleInput.bind(this)}
                            defaultValue={this.state.correctness}
                            placeholder="Answer..." 
                        />
                    </Grid.Column>
                    <Grid.Column className="game-users">
                        <UserList users={users} />
                    </Grid.Column>
                    <Grid.Column className="game-correctness">
                        <h3>{this.state.correctness}</h3>
                    </Grid.Column>
                </Grid.Column>
            </Grid>
        );
    }
}

export default withRouter(Game);