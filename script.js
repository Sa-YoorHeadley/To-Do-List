//Local Storage
const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'

function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY,JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}

function saveAndDisplay(){
    save()
    display()
}

//List Elements
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)
const listContainer = document.querySelector('[data-list-container]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteSelectedList = document.querySelector('[data-delete-selected-list]')

//Task Elements
const listDisplayContainer = document.querySelector("[data-list-display-container]")
const tasksContainer = document.querySelector("[data-tasks]")
const listTitleElement = document.querySelector("[data-list-title]")
const listCountElement = document.querySelector("[data-list-count]")

function display(){
    clearElement(listContainer)
    displayLists()

    if(selectedListId == null){
        listDisplayContainer.style.display = "none"
    }
    else{
        listDisplayContainer.style.display = ""
        displayTasks(selectedListId)
    }
}

//Function to display lists
function displayLists(){
    lists.forEach(list =>{
        const listElement = document.createElement('li')
        listElement.classList.add('list-name')

        listElement.dataset.listId = list.id
        listElement.innerText = list.name

        if(list.id === selectedListId){
            listElement.classList.add('active-list')
        }
        
        listContainer.appendChild(listElement)
    })
}

//Adding list
newListForm.addEventListener("submit", event => {
    event.preventDefault()
    const listName = newListInput.value
    if(listName == null || listName === "") return
    const list = createList(listName)
    newListInput.value = ""
    lists.push(list)
    saveAndDisplay()
})

//Set selected list 
listContainer.addEventListener("click", event =>{
    if(event.target.tagName.toLowerCase() === "li"){
        selectedListId = event.target.dataset.listId
        saveAndDisplay()
    }
})

//Delete selected list
deleteSelectedList.addEventListener("click", () =>{
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null
    saveAndDisplay()
})

function createList(listName){
    return { id: JSON.stringify(Date.now()), name : listName, tasks: [] }
}

//Clear element
function clearElement(element){
    element.innerHTML = ''
}

//Function to display tasks
function displayTasks(selectedListId){

}

display()