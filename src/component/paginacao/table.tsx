import { useThemeApp } from "@/hooks/use-theme-app";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Fragment } from "react";
import { LoadingApp } from "../loading/loading-app";

export type ISort = "asc" | "desc";

export interface ISortingTable {
  field: string;
  sort: ISort;
}

interface TablaAppProps {
  columns: any[];
  rows: any[];
  sorting?: ISortingTable;
  setSorting?: (sorting: ISortingTable) => void;
  minWidth?: number;
  selecionarLinha?: (row: any, index: number) => void;
  stickyHeader?: boolean;
  maxHeigth?: number | string;
  height?: number | string;
  marginTop?: string;
  onDoubleClick?: (item: any, index: number, key?: string) => void;
  borderCollapse?:
    | "collapse"
    | "inherit"
    | "initial"
    | "revert"
    | "revert-layer"
    | "separate"
    | "unset";
  loading?: boolean;
}

export function TableApp(props: TablaAppProps) {
  const { backgroundColor, cores, borderRadius } = useThemeApp();
  return (
    <TableContainer
      sx={{
        height: props.height,
        maxHeight: props.maxHeigth,
        marginTop: props.marginTop,
        "&::-webkit-scrollbar": { width: "8px", height: "8px" },
        "::-webkit-scrollbar-track": {
          backgroundColor: backgroundColor.default,
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: `${cores.primary.main} !important`,
          borderRadius: borderRadius,
        },
      }}
    >
      <Table
        size="small"
        sx={{
          minWidth: props.minWidth ?? 650,
          width: "100%",
          borderCollapse: props.borderCollapse,
        }}
        aria-label="simple table"
        stickyHeader={props.stickyHeader}
      >
        <TableHead>
          <TableRow>
            {props.columns.map((column, index) => (
              <TableCell
                key={index}
                align={column.align}
                sx={{
                  width: column.width,
                  cursor: column.sortable ? "pointer" : "default",
                  ":hover": {
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
                  },
                  padding: "3px 10px 3px 10px",
                }}
                onClick={() => {
                  if (column.sortable && props.setSorting) {
                    props.setSorting({
                      field: column.field,
                      sort:
                        props.sorting?.field === column.field &&
                        props.sorting?.sort === "asc"
                          ? "desc"
                          : "asc",
                    });
                  }
                }}
              >
                {column.headerName}
                {column.sortable && (
                  <TableSortLabel
                    active={props.sorting?.field === column.field}
                    direction={
                      props.sorting?.field === column.field
                        ? props.sorting?.sort
                        : "asc"
                    }
                  />
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {props.loading ? (
          <LoadingApp comBox />
        ) : (
          <TableBody>
            {props.rows.map((row, index) => (
              <Fragment key={index}>
                <TableRow
                  onDoubleClick={() => {
                    if (props.onDoubleClick) {
                      props.onDoubleClick(row, index);
                    }
                  }}
                  onClick={() => {
                    if (props.selecionarLinha) {
                      props.selecionarLinha(row, index);
                    }
                  }}
                  sx={{
                    cursor: "pointer",
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      backgroundColor: backgroundColor.default,
                    },
                  }}
                >
                  {props.columns.map((column, i) => (
                    <TableCell
                      align={column.align}
                      key={i}
                      width={column.width}
                    >
                      {column.renderCell
                        ? column.renderCell(row, index)
                        : row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
