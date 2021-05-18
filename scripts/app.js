// Handle to ul
const chatList = document.querySelector(".chat-list");
// Handle to New chat form
const newChatForm = document.querySelector(".new-chat");
// Handel to for changing the username
const newNameForm = document.querySelector(".new-name");
// Handel for altertin user name change
const updateMessage = document.querySelector(".update-mssg");
// Retrive the name form local storage if there is not any name previoulsy save use anonymous
const userName = localStorage.getItem("name") ? localStorage.getItem("name"):"anonymous";
// Handle to chatroom buttons
const chatButtons = document.querySelector(".chat-rooms");
// Class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatsroom("general", userName);
// Event listener for user message input
newChatForm.addEventListener("submit", (event) => {
    // Prevent broswer default action 
    event.preventDefault();
    // take the input and store in message + remove spaces
    const message = newChatForm.message.value.trim();
    // call the method and pass the user message
    chatroom.addChat(message)
      // since it return a promise
      .then(() => {
          // once the response is received then clear the form
          newChatForm.reset();
          // console.log("New message added");
          }
        )
        // Catch error if there is any
      .catch((err)=> {console.log(err);});
});
// Event listener for new user name
newNameForm.addEventListener("submit", (event) => {
    // Prevent broswer default action 
    event.preventDefault();
    // take the input and store in message + remove spaces
    const newName = newNameForm.name.value.trim();
    console.log(newName);
    // Update name
    chatroom.updateName(newName);
    // Save the name to local storage
    localStorage.setItem("name", newName);
    // Reset from
    newNameForm.reset();
    // Display the message for 3 seconds and then disappear
    updateMessage.innerText = 
    `Your name was updated to ${newName}`;
    setTimeout(()=> {updateMessage.innerText = "";}, 3000);
});
// Event listener for chat room buttons
chatButtons.addEventListener("click", (event) => {
  if (event.target.nodeName === "BUTTON") {
    // Clear old messages
    chatUI.clear();
    // Update the room
    chatroom.updateRoom(event.target.getAttribute("id"));
    // Call the method and pass chatUI as a call back
    chatroom.getChat(data => chatUI.render(data))

  }
});
// get chats and render
chatroom.getChat((data) => {
    chatUI.render(data)
    console.log(data);
});