import { useState } from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  useMediaQuery,
  useTheme,
  Drawer
} from "@mui/material";
import { 
  Search, 
  MoreVert, 
  Menu 
} from "@mui/icons-material";
import { FriendsList } from "@/components/friends-list";
import { ChatArea } from "@/components/chat-area";
import { useMessenger } from "@/hooks/use-messenger";

const DRAWER_WIDTH = 320;

export default function Messenger() {
  const { friends, selectedFriend, currentMessages, selectFriend, sendMessage } = useMessenger();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSelectFriend = (friendId: number) => {
    selectFriend(friendId);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Messenger
          </Typography>
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <IconButton color="inherit">
            <MoreVert />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              mt: { xs: 7, sm: 8 }
            },
          }}
        >
          <FriendsList
            friends={friends}
            selectedFriendId={selectedFriend?.id || 0}
            onSelectFriend={handleSelectFriend}
          />
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              mt: 8
            },
          }}
          open
        >
          <FriendsList
            friends={friends}
            selectedFriendId={selectedFriend?.id || 0}
            onSelectFriend={handleSelectFriend}
          />
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: { xs: 7, sm: 8 },
          height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' }
        }}
      >
        <ChatArea
          friend={selectedFriend}
          messages={currentMessages}
          onSendMessage={sendMessage}
          onBack={handleDrawerToggle}
        />
      </Box>
    </Box>
  );
}
