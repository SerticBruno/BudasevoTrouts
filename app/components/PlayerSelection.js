
import { FormControl, InputLabel, Select, MenuItem, } from "@mui/material";

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
          {players.map((player) => (
            <MenuItem key={player._id} value={player._id}>
              {player.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
};
  
export default PlayerSelection;