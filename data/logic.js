import db from './db.js'
const TEST = false

if (TEST) loadTestData()

function loadTestData() {
    [
        {
            description: 'Chores',
            datetime: '2022-04-29T18:49'
        },
        {
            description: 'Exercise',
            datetime: '2022-04-29T18:49'
        },
        {
            description: 'Homework (maths)',
            datetime: '2022-04-29T18:49'
        },
        {
            description: 'Homework (English)',
            datetime: '2022-04-29T18:49'
        }
    ].forEach(createItem)
}

function getFiltereDB() {
    return db.filter(item => !!item)
}

function isObject(variable) {
    return typeof variable === 'object'
}

var uniqueId
function generateId() {
    if (!uniqueId) uniqueId = 1

    return uniqueId++
}

function deref(variable) {
    return JSON.parse(JSON.stringify(variable))
}

// returns list of todo items
function listItems() {
    // break referrence to original object
    return deref(getFiltereDB())
}

/**
 * @param {*} item : {
 *      description
 *      datetime
 * }
 * @returns updatedItem
 */
function createItem(item) {
    // verify that we have both attributes
    // {
    //     description
    //     datetime
    // }
    if (!isObject(item) || !item?.description) {
        throw new Error("Item is invalid")
    }

    // generate a unique
    item.id = generateId()
    db.push(item)

    return item
}

/**
 * @param {*} id 
 * @returns Object
 */
function readItem(id) {
    return deref(getFiltereDB().find(item => item.id == id))
}

/**
 * @param {*} id 
 * @param {*} item 
 * @returns 
 */
function udpateItem(id, item) {
    // verify that we have both attributes
    // {
    //     description
    //     datetime
    // }
    if (!isObject(item) || !item?.description || !id) {
        throw new Error("Item is invalid")
    }

    var dbItem = getFiltereDB().find(item => item.id == id)

    dbItem.description = item.description
    dbItem.datetime = item.datetime

    return dbItem
}

/**
 * 
 * @param {*} id 
 * @returns Boolean 
 */
function deleteItem(id) {
    var index = db.findIndex(item => item?.id == Number(id))
    delete db[index]

    return true
}


export const logic = {
    listItems,
    createItem,
    readItem,
    udpateItem,
    deleteItem
} 