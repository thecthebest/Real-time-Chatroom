// Class for creating chat object
class Chatsroom {
    constructor(room, username) {
        // Create properties specific to class instances
        this.room = room;
        this.username = username;
        // Property to store link to chat document in firestore
        this.chats = db.collection("chats");
        // Allow to unsubsribe from the current chat room
        this.unsub;
    }
    // A method for creating new documents in firestore
    async addChat(message) {
        // Create a new Date Object
        const now = new Date();
        // A new object to store the info about the chat
        const chat = {
            message : message,
            username: this.username,
            room: this.room,
            // Log the time & date when sending a message to firebase
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        return await this.chats.add(chat);
    }
    // A method to listen for changes in real time
    getChat(callback) {
        // To unsubscribe form changes when this.unsub is called
        this.unsub = this.chats
            // Listen to a specific room
            .where('room', '==', this.room)
            // order the result in Asc order
            .orderBy('created_at')
            // Listen for changes
            .onSnapshot((snapshot) => {
                // Call for each for every elements in docChanges
                snapshot.docChanges().forEach((change) => {
                    // Listen for only added type of change
                    if (change.type === "added") {
                        callback("added", this.type);
                    }
                });
            })

    }
    // A method for changing username
    updateName(username) {
        // Set the name to the parameter
        this.username = username;
    }
    // A method for changing chat room
    updateRoom(room) {
        // Set the name to the parameter
        this.room = room;
        // Check before ubsubscribing as the value of this.usub may be undefined
        if (this.unsub) {
            this.unsub;
        }
        console.log("Room Updated");
    }
}