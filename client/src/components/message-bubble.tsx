import { Message, Friend } from "@shared/schema";
import { Box, Paper, Typography, Avatar, Slide } from "@mui/material";
import { keyframes } from "@mui/system";

interface MessageBubbleProps {
  message: Message;
  friend?: Friend;
}

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1);
  }
`;

export function MessageBubble({ message, friend }: MessageBubbleProps) {
  if (message.sent) {
    return (
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Box sx={{ maxWidth: { xs: '80%', sm: '70%', md: '60%' } }}>
            <Paper
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                borderRadius: 3,
                borderTopRightRadius: 1,
                px: 2,
                py: 1,
                mb: 0.5
              }}
            >
              <Typography variant="body2">
                {message.text}
              </Typography>
            </Paper>
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ display: 'block', textAlign: 'right', mr: 1 }}
            >
              {message.timestamp}
            </Typography>
          </Box>
        </Box>
      </Slide>
    );
  }

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
        {friend && (
          <Avatar 
            src={friend.avatar} 
            alt={friend.name}
            sx={{ width: 32, height: 32, flexShrink: 0 }}
          />
        )}
        <Box sx={{ maxWidth: { xs: '80%', sm: '70%', md: '60%' } }}>
          <Paper
            sx={{
              backgroundColor: 'grey.100',
              borderRadius: 3,
              borderTopLeftRadius: 1,
              px: 2,
              py: 1,
              mb: 0.5
            }}
          >
            <Typography variant="body2" color="text.primary">
              {message.text}
            </Typography>
          </Paper>
          <Typography 
            variant="caption" 
            color="text.secondary" 
            sx={{ display: 'block', ml: 1 }}
          >
            {message.timestamp}
          </Typography>
        </Box>
      </Box>
    </Slide>
  );
}

export function TypingIndicator({ friend }: { friend?: Friend }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
      {friend && (
        <Avatar 
          src={friend.avatar} 
          alt={friend.name}
          sx={{ width: 32, height: 32, flexShrink: 0 }}
        />
      )}
      <Paper
        sx={{
          backgroundColor: 'grey.100',
          borderRadius: 3,
          borderTopLeftRadius: 1,
          px: 2,
          py: 1,
          display: 'flex',
          gap: 0.5,
          alignItems: 'center'
        }}
      >
        {[0, 0.1, 0.2].map((delay, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              backgroundColor: 'grey.600',
              borderRadius: '50%',
              animation: `${bounce} 1.4s infinite ease-in-out both`,
              animationDelay: `${delay}s`
            }}
          />
        ))}
      </Paper>
    </Box>
  );
}
