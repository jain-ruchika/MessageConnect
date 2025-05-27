import { Friend, Message } from "@shared/schema";
import { MessageBubble } from "./message-bubble";
import { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  useTheme,
  useMediaQuery,
  Fab
} from "@mui/material";
import {
  ArrowBack,
  Add,
  EmojiEmotions,
  Send
} from "@mui/icons-material";

interface ChatAreaProps {
  friend?: Friend;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onBack?: () => void;
}

export function ChatArea({ friend, messages, onSendMessage, onBack }: ChatAreaProps) {
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!friend) {
    return (
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'background.default'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Welcome to Messenger
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select a friend to start chatting
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Chat Header */}
      <Paper 
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider', 
          p: 2,
          borderRadius: 0
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {onBack && isMobile && (
              <IconButton onClick={onBack} edge="start">
                <ArrowBack />
              </IconButton>
            )}
            <Avatar src={friend.avatar} alt={friend.name} />
            <Box>
              <Typography variant="subtitle1" fontWeight="medium">
                {friend.name}
              </Typography>
              <Typography 
                variant="body2" 
                color={friend.online ? 'success.main' : 'text.secondary'}
              >
                {friend.status}
              </Typography>
            </Box>
          </Box>

        </Box>
      </Paper>

      {/* Chat Messages */}
      <Box 
        sx={{ 
          flex: 1, 
          overflow: 'auto', 
          p: 2, 
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} friend={!message.sent ? friend : undefined} />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Message Input */}
      <Paper 
        sx={{ 
          borderTop: 1, 
          borderColor: 'divider', 
          p: 2,
          borderRadius: 0
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'end', gap: 1 }}>
          <IconButton>
            <Add />
          </IconButton>
          <TextField
            fullWidth
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            size="small"
            multiline
            maxRows={4}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <EmojiEmotions />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { borderRadius: 3 }
            }}
          />
          <Fab 
            color="primary" 
            size="small" 
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
          >
            <Send />
          </Fab>
        </Box>
      </Paper>
    </Box>
  );
}
