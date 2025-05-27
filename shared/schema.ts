// Plain TypeScript interfaces for the messenger app

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface Friend {
  id: number;
  name: string;
  avatar: string;
  status: string;
  lastMessage?: string;
  lastMessageTime?: string;
  online: boolean;
}

export interface Message {
  id: number;
  friendId: number;
  text: string;
  timestamp: string;
  sent: boolean;
}

export interface Conversation {
  friendId: number;
  messages: Message[];
}

// Input types for creating new records
export type CreateUser = Omit<User, 'id'>;
export type CreateFriend = Omit<Friend, 'id'>;
export type CreateMessage = Omit<Message, 'id'>;
