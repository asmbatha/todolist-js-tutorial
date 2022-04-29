import { logic } from './logic.js'

// returns list of todo items
function listItems() {
    return logic.listItems()
}

/**
 * @param {*} item : {
 *      description
 *      datetime
 * }
 * @returns updatedItem
 */
function createItem(item) {
    return logic.createItem(item)
}

/**
 * @param {*} id 
 * @returns Object
 */
function readItem(id) {
    return logic.readItem(id)
}

/**
 * @param {*} id 
 * @param {*} item 
 * @returns 
 */
function udpateItem(id, item) {
    return logic.udpateItem(id, item)
}

/**
 * 
 * @param {*} id 
 * @returns Boolean 
 */
function deleteItem(id) {
    return logic.deleteItem(id)
}

export const api = {
    listItems,
    createItem,
    readItem,
    udpateItem,
    deleteItem
} 