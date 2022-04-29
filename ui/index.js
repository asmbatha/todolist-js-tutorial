import { api as data } from '../data/index.js'
import { parseHTML } from './helpers.js'

renderList()
attachEventListeners()

function renderList() {
    const listElement = document.querySelector('.list')
    listElement.innerHTML = ""

    data.listItems().forEach(item => {
        listElement.append(parseHTML(`
            <div class="list-item" data-item-id="${item.id}">
                <div class="description">
                    ${item.description}
                </div>
                <div class="datetime">
                    ${item.datetime}
                </div>
            </div>
        `))
    })
}

function attachEventListeners() {
    document.getElementById("add-new-button").onclick = function () {
        document.getElementById("create-item-dialog").show()
    }

    document.addEventListener('click', function (e) {
        // dialog close buttons
        if (e.target.classList.contains('dialog-close')) {
            e.preventDefault()
            e.target.closest('dialog').close()
            return false
        }

        // open read-item-dialog
        if (e.target.closest('.list-item')) {
            e.preventDefault()
            var dialog = document.getElementById("read-item-dialog")
            dialog.show()

            var itemId = e.target.closest('.list-item').dataset.itemId

            var itemData = data.readItem(itemId)

            dialog.querySelector('.description').innerHTML = itemData.description
            dialog.querySelector('.datetime').innerHTML = itemData.datetime
            document.querySelector("#read-item-dialog [name=item-id]").value = itemId

            return false
        }
    })

    // submit new item
    document.getElementById("create-item").onclick = function () {
        var item = {
            description: document.querySelector("#create-item-dialog [name=description]").value,
            datetime: document.querySelector("#create-item-dialog [name=datetime]").value
        }

        try {
            data.createItem(item)
        } catch (error) {
            alert(error)
        }

        document.querySelector("#create-item-dialog [name=description]").value = ""
        document.querySelector("#create-item-dialog [name=datetime]").value = ""

        renderList()
        document.getElementById('create-item-dialog').close()
    }

    // open edit-item-dialog
    document.getElementById("edit-item").onclick = function () {
        document.getElementById("read-item-dialog").close()

        var itemId = document.querySelector("#read-item-dialog [name=item-id]").value
        var itemData = data.readItem(itemId)

        document.querySelector("#edit-item-dialog [name=description]").value = itemData.description
        document.querySelector("#edit-item-dialog [name=datetime]").value = itemData.datetime
        document.querySelector("#edit-item-dialog [name=item-id]").value = itemId

        document.getElementById("edit-item-dialog").show()
    }

    // edit item
    document.getElementById("update-item").onclick = function () {
        var item = {
            description: document.querySelector("#edit-item-dialog [name=description]").value,
            datetime: document.querySelector("#edit-item-dialog [name=datetime]").value
        }

        var itemId = document.querySelector("#edit-item-dialog [name=item-id]").value

        try {
            data.udpateItem(itemId, item)
        } catch (error) {
            alert(error)
        }

        document.querySelector("#edit-item-dialog [name=description]").value = ""
        document.querySelector("#edit-item-dialog [name=datetime]").value = ""

        renderList()
        document.getElementById('edit-item-dialog').close()
    }

    // delete-item
    document.getElementById("delete-item").onclick = function () {
        var itemId = document.querySelector("#read-item-dialog [name=item-id]").value

        try {
            data.deleteItem(itemId)
        } catch (error) {
            alert(error)
        }

        renderList()
        document.getElementById("read-item-dialog").close()
    }
}