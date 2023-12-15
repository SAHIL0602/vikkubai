import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { log } from 'console';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  users: any[] = [];
  selectedUser: any | null = null;
  user:any;

  messages: { sender: string; text: string; timestamp: string; }[] = [];
  selectedUserMessage: string = '';
  constructor(public authService: AuthService, private cookieService: CookieService,private db: AngularFirestore) {

    const userDataString = this.cookieService.get('userData');
    if (userDataString) {
   this.user = JSON.parse(userDataString);
   console.log(this.user);
    }


  }

  ngOnInit() {
    this.authService.getAllUsers().then((users) => {
      this.users = users.filter((u: { email: any; }) => u.email !== this.user.email);
      this.messages = []; 
    });
  }
  openChat(user: any) {
    this.selectedUser = user; 
    console.log(this.selectedUser);
    this.loadChatMessages()
    
  }

  async loadChatMessages() {
    if (this.selectedUser && this.selectedUser.email) {
      const chats = await this.authService.getMessagesByEmail(this.selectedUser.email);
      console.log(chats);
      

      this.messages = chats;
      console.log(this.messages);
      
    }}
  sendMessage() {
    if (this.selectedUser && this.selectedUser.name && this.selectedUser.name !== 'You') {
      const currentDate = new Date();
      const timestamp = currentDate.toLocaleString(); 
  
      let text ={
        sender: this.user.email,
        reciever : this.selectedUser.email,
        text: this.selectedUserMessage ,
        timestamp: timestamp
      };
      console.log(text);

      this.db.collection("UserChat").add(text);
  
      this.selectedUserMessage = '';

      this.loadChatMessages()

    }
  
}
isMyMessage(messageSender: string): boolean {
  return messageSender === this.user.email;
}


}