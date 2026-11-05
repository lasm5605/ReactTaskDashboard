import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



export function FilterTabs({ filter, onFilterChange }) {
  return (
    <Tabs className="tab" value={filter} onChange={(event, newValue) => onFilterChange(newValue)}
    sx={{}}
    >
      <Tab sx={{}} label="To Do" value="todo" />
      <Tab label="Ta Da" value="completed" />
    </Tabs>
  );
}
