"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import style from "./page.module.css";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CustomizedDialogs from "../add-schecdule/page";
import {
  getSchecduleList,
  deleteSchecdule,
  searchScheduleByTitle,
} from "../api/api";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

type YourDataType = {
  title: string;
  description: string;
  subject: string;
  schecdule: string;
  _id: string;
};

export default function BasicTable() {
  const [list, setList] = useState<YourDataType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const prepareSchecduleList = async () => {
    const listData = await getSchecduleList();
    setList(listData?.data.data);
  };

  const handleSearch = async () => {
    const tiles = await searchScheduleByTitle(searchQuery);
    setList(tiles.data);
  };

  const handleChange = (e: any) => {
    setSearchQuery(e.target.value);
    handleSearch();
  };

  const deleteSingleSchecdule = async (id: string) => {
    await deleteSchecdule(id);
  };
  React.useEffect(() => {
    prepareSchecduleList();
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box className="searchField">
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleChange}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon className="search-icon" />
          </IconButton>
        </Box>
        <CustomizedDialogs />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Schedule</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(list || []).map((listValues, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{listValues.title}</TableCell>
                <TableCell>{listValues.description}</TableCell>
                <TableCell>{listValues.subject}</TableCell>
                <TableCell>{listValues.subject}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex" }}>
                    <CustomizedDialogs
                      editScheduleId={listValues._id}
                      editModeProp="editModeProp"
                    />
                    <Box onClick={() => deleteSingleSchecdule(listValues._id)}>
                      <DeleteIcon />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
