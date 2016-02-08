/**
 * Created by kevin gosse on 05/02/2016.
 */

import ServerActions from './actions/ServerActions';

let API = {
    fetchLinks(){
        console.log("1. In API");
        fetch('/graphql', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `{
                    links {
                        _id,
                        title,
                        url
                    }
                }`
            })
        })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                ServerActions.receiveLinks(resp.data.links);
            })
    }
};

export default API;
