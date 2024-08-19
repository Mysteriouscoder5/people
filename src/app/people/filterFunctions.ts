import { FilterFn, Row } from "@tanstack/react-table";
import { User } from "./columns";

export const roleFilterFunction: FilterFn<User> = (
  row: Row<User>,
  columnId: string,
  filterValue: string[]
) => {
  const rowData = row.original;
  const role = rowData.role;
  if (filterValue.length === 0) return true;
  return filterValue
    .map((val) => val.toLowerCase())
    .includes(role.toLowerCase());
};

export const teamsFilterFunction: FilterFn<User> = (
  row: Row<User>,
  columnId: string,
  filterValue: string[]
) => {
  const rowData = row.original;
  const teams = rowData.teams.map((team) => team.toLowerCase());
  if (filterValue.length === 0) return true;
  const filterTeams = filterValue.map((val) => val.toLowerCase());
  return filterTeams.every((filterTeam) => teams.includes(filterTeam));
};
