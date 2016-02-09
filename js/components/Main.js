/**
 * Created by kevin gosse on 05/02/2016.
 */
import React from 'react';
import Relay from 'react-relay';
import Link from './Link';

class Main extends React.Component {
    static propTypes = {
        limit: React.PropTypes.number
    };

    static defaultProps = {
        limit: 3
    };

    setLimit = (e) => {
        let newLimit = Number(e.target.value);
        this.props.relay.setVariables({limit: newLimit});
    };

    render(){
        let content = this.props.store.linkConnection.edges.map(edge => {
            return <Link key={edge.node.id} link={edge.node} />;
        });
        return (
            <div>
                <h3>Links</h3>
                <select onChange={this.setLimit}>
                    <option value="2">2</option>
                    <option value="4" selected>4</option>
                </select>
                <ul>
                    {content}
                </ul>
            </div>
        )
    }
}

Main = Relay.createContainer(Main, {
    initialVariables: {
      limit: 4
    },
    fragments: {
        store: () => Relay.QL`
            fragment on Store {
                linkConnection(first: $limit){
                    edges {
                        node {
                            id,
                            ${Link.getFragment('link')}
                        }
                    }
                }
            }
        `
    }
});

export default Main;
