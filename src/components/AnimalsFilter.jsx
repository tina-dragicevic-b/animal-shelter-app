import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
const AnimasFilter = ({
  setFilterByType,
  filterByNotAdopted,
  onFilterByAdoption,
  filterByAdopted,
  _animalTypes,
  filterByType,
}) => {
  return (
    <div
      style={{
        display: "grid",
        justifyContent: "space-between",
        marginBottom: "30px",
      }}
    >
      <div style={{ gridColumn: "1/2" }}>
        <Dropdown
          placeholder="Filter by Type"
          options={_animalTypes}
          value={filterByType}
          onChange={(e) => setFilterByType(e.value)}
        />
      </div>
      <div style={{ gridColumn: "2/3", color: "#0b213f" }}>
        <Checkbox
          value="Adopted"
          checked={filterByAdopted}
          onChange={onFilterByAdoption}
        />
        <label
          style={{
            fontFamily: "cursive",
            marginLeft: "2px",
            marginRight: "5px",
          }}
        >
          Adopted
        </label>
        <Checkbox
          value="Not adopted"
          checked={filterByNotAdopted}
          onChange={onFilterByAdoption}
        />
        <label style={{ fontFamily: "cursive", marginLeft: "2px" }}>
          Not adopted
        </label>
      </div>
    </div>
  );
}; export default AnimasFilter