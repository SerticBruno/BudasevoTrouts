import { FormControl, InputLabel, Select, MenuItem, Typography, ListSubheader } from "@mui/material";

const PlayerSelection = ({ players, selectedPlayers, setSelectedPlayers }) => {
    const getPlayerNamesByIds = (selectedIds) => {
      return selectedIds
        .map((id) => players.find((player) => player._id === id)?.name)
        .filter((name) => name)
        .join(", ");
    };

    return (
      <FormControl fullWidth>
        <InputLabel>Select 14 Players</InputLabel>
        <Select
          multiple
          value={selectedPlayers}
          onChange={(e) => setSelectedPlayers(e.target.value)}
          renderValue={(selected) => getPlayerNamesByIds(selected).split(", ").join(", ")}
          label="Select 14 Players"
        >
          {/* Non-clickable item to display the count of selected players */}
          <ListSubheader style={{ pointerEvents: 'none' }}>
            {`Selected Players: ${selectedPlayers.length}`}
          </ListSubheader>

          {players.map((player) => (
            <MenuItem key={player._id} value={player._id}>
              {player.name}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="subtitle1" mt={2} >
          {`Selected Players: ${selectedPlayers.length}`}
        </Typography>
      </FormControl>
    );
};

export default PlayerSelection;
