/**
 * Created by kevin gosse on 05/02/2016.
 */

import AppDispatcher from '../AppDispatcher';
import {ActionTypes} from '../Constants';

let ServerActions = {
    receiveLinks(links){
        console.log('2. In ServerActions');
        AppDispatcher.dispatch({
            actionType: ActionTypes.RECEIVE_LINKS,
            links
        });
    }
};

export default ServerActions;
