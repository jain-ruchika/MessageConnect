import { useState, useCallback } from "react";
import { Friend, Message, Conversation } from "@shared/schema";

const initialFriends: Friend[] = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b714?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    status: "Active now",
    lastMessage: "Hey! Are we still meeting for lunch today?",
    lastMessageTime: "2:34 PM",
    online: true,
  },
  {
    id: 2,
    name: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    status: "Active 5 minutes ago",
    lastMessage: "Thanks for the help with the project!",
    lastMessageTime: "1:18 PM",
    online: true,
  },
  {
    id: 3,
    name: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    status: "Active 1 hour ago",
    lastMessage: "Did you see the new design mockups?",
    lastMessageTime: "Yesterday",
    online: false,
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    status: "Active 2 days ago",
    lastMessage: "Let's catch up soon!",
    lastMessageTime: "Tuesday",
    online: false,
  },
  {
    id: 5,
    name: "Lisa Wang",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    status: "Active now",
    lastMessage: "Great presentation today! 👏",
    lastMessageTime: "Monday",
    online: true,
  },
];

const initialConversations: Conversation[] = [
  {
    friendId: 1,
    messages: [
      { id: 1, friendId: 1, text: "Hey! Are we still meeting for lunch today?", timestamp: "2:34 PM", sent: false },
      { id: 2, friendId: 1, text: "Yes, absolutely! How about 12:30 at the usual place?", timestamp: "2:35 PM", sent: true },
      { id: 3, friendId: 1, text: "Perfect! Can't wait to catch up on everything 😊", timestamp: "2:36 PM", sent: false },
      { id: 4, friendId: 1, text: "Same here! I have so much to tell you about the new project", timestamp: "2:37 PM", sent: true },
      { id: 5, friendId: 1, text: "Ooh, exciting! I'm definitely curious about all the details", timestamp: "2:38 PM", sent: false },
    ],
  },
  {
    friendId: 2,
    messages: [
      { id: 6, friendId: 2, text: "Hey, could you help me with the React component?", timestamp: "1:15 PM", sent: false },
      { id: 7, friendId: 2, text: "Of course! What do you need help with?", timestamp: "1:16 PM", sent: true },
      { id: 8, friendId: 2, text: "I'm having trouble with state management", timestamp: "1:17 PM", sent: false },
      { id: 9, friendId: 2, text: "Thanks for the help with the project!", timestamp: "1:18 PM", sent: false },
    ],
  },
  {
    friendId: 3,
    messages: [
      { id: 10, friendId: 3, text: "Did you see the new design mockups?", timestamp: "Yesterday", sent: false },
      { id: 11, friendId: 3, text: "Yes! They look amazing. Great work!", timestamp: "Yesterday", sent: true },
    ],
  },
  {
    friendId: 4,
    messages: [
      { id: 12, friendId: 4, text: "Let's catch up soon!", timestamp: "Tuesday", sent: false },
      { id: 13, friendId: 4, text: "Definitely! I'll check my calendar", timestamp: "Tuesday", sent: true },
    ],
  },
  {
    friendId: 5,
    messages: [
      { id: 14, friendId: 5, text: "Great presentation today! 👏", timestamp: "Monday", sent: false },
      { id: 15, friendId: 5, text: "Thank you! I was nervous but it went well", timestamp: "Monday", sent: true },
    ],
  },
];

export function useMessenger() {
  const [friends] = useState<Friend[]>(initialFriends);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedFriendId, setSelectedFriendId] = useState<number>(1);

  const [messageIdCounter, setMessageIdCounter] = useState(16);

  const selectedFriend = friends.find(f => f.id === selectedFriendId);
  const currentMessages = conversations.find(c => c.friendId === selectedFriendId)?.messages || [];

  const selectFriend = useCallback((friendId: number) => {
    setSelectedFriendId(friendId);
  }, []);

  const sendMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: messageIdCounter,
      friendId: selectedFriendId,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true,
    };

    setMessageIdCounter(prev => prev + 1);

    setConversations(prev => {
      const existingConversation = prev.find(c => c.friendId === selectedFriendId);
      if (existingConversation) {
        return prev.map(c => 
          c.friendId === selectedFriendId 
            ? { ...c, messages: [...c.messages, newMessage] }
            : c
        );
      } else {
        return [...prev, { friendId: selectedFriendId, messages: [newMessage] }];
      }
    });
  }, [selectedFriendId, messageIdCounter]);



  return {
    friends,
    selectedFriend,
    currentMessages,
    selectFriend,
    sendMessage,
  };
}
