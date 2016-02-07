/**
 * Created by kevin gosse on 06/02/2016.
 */

import AppDispatcher from '../AppDispatcher';
import {ActionTypes} from '../Constants';
import {EventEmitter} from 'events';

let _links = [];

class LinkStore extends EventEmitter {
    constructor(props){
        super(props);

        AppDispatcher.register(action => {
            switch (action.actionType){
                case ActionTypes.RECEIVE_LINKS:
                    _links = action.links;
                    console.log("3. In Store");
                    this.emit("change");
                    break;
                default:
            }
        });
    }

    getAll(){
        return _links;
    }
}

export default new LinkStore();
