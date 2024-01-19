import { Modal, Box, Typography, Button } from '@mui/material';

const GameHost = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="div">
          Host a Game
        </Typography>
        {/* Your form fields go here */}
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
};

export default GameHost;
