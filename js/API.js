/**
 * Created by kevin gosse on 05/02/2016.
 */

import ServerActions from './actions/ServerActions';

let API = {
    fetchLinks(){
        console.log("1. In API");
        fetch('/data/links')
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                ServerActions.receiveLinks(data);
            })
    }
};

export default API;
