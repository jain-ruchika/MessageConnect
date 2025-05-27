import { Friend } from "@shared/schema";
import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Badge,
  Divider
} from "@mui/material";
import { Search, Edit } from "@mui/icons-material";

interface FriendsListProps {
  friends: Friend[];
  selectedFriendId: number;
  onSelectFriend: (friendId: number) => void;
}

export function FriendsList({ friends, selectedFriendId, onSelectFriend }: FriendsListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="h2">
            Chats
          </Typography>
          <IconButton>
            <Edit />
          </IconButton>
        </Box>
      </Box>

      {/* Search Bar */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          placeholder="Search conversations"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            sx: { borderRadius: 3 }
          }}
        />
      </Box>

      {/* Friends List */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List disablePadding>
          {filteredFriends.map((friend, index) => (
            <Box key={friend.id}>
              <ListItem disablePadding>
                <ListItemButton
                  selected={selectedFriendId === friend.id}
                  onClick={() => onSelectFriend(friend.id)}
                  sx={{
                    borderLeft: selectedFriendId === friend.id ? 4 : 0,
                    borderColor: 'primary.main',
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                      },
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: friend.online ? '#4caf50' : '#9e9e9e',
                          color: friend.online ? '#4caf50' : '#9e9e9e',
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          border: '2px solid white',
                        },
                      }}
                    >
                      <Avatar src={friend.avatar} alt={friend.name} />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" noWrap>
                          {friend.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {friend.lastMessageTime}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {friend.lastMessage}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
              {index < filteredFriends.length - 1 && <Divider variant="inset" component="li" />}
            </Box>
          ))}
        </List>
      </Box>
    </Paper>
  );
}
