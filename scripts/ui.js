class ChatUI {
    constructor(list) {
        this.list = list;
    }
    // A method that takes info from  getChat() and generates html
    render(data) {
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix: true}
        );
        const html = 
        `<li class="list-group-item">
           <span class="username">${data.username}</span>
           <span>${data.message}</span>
           <div class="time">${when}</div>
        `;
        this.list.innerHTML += html;
    }
    clear() {
        this.list.innerHTML = "";
    }
}