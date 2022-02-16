
import React from 'react';

import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';

import axios from "axios";
import { useState, useEffect } from 'react';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components_mrk/Page';
import Label from '../components_mrk/Label';
import Scrollbar from '../components_mrk/Scrollbar';
import SearchNotFound from '../components_mrk/SearchNotFound';


import { RentRequestListHead, RentRequestListToolbar, RentRequestMoreMenu } from '../components/rentrequest/index';
import baseUrl from "../utils/common";

import { connect } from "react-redux";
import { fetchRentRequestAll } from "../actions/rentRequest";

//

// const rentRequests = [...Array(24)].map((_, index) => ({
//   id: faker.datatype.uuid(),
//   avatarUrl: mockImgAvatar(index + 1),
//   name: faker.name.findName(),
//   message: faker.message.messageName(),
//   isAccepted: faker.datatype.boolean(),
//   advertId: sample(['active', 'banned']),
//   createdAt: sample([
//     'Leader',
//     'Hr Manager',
//     'UI Designer',
//     'UX Designer',
//     'UI/UX Designer',
//     'Project Manager',
//     'Backend Developer',
//     'Full Stack Designer',
//     'Front End Developer',
//     'Full Stack Developer'
//   ])
// }));



const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'advertId', label: 'Advert', alignRight: false },
  { id: 'message', label: 'Phone No.', alignRight: false },
  { id: 'createdAt', label: 'Date', alignRight: false },
  { id: 'isAccepted', label: 'Status', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_rentRequest) => _rentRequest.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}




export default function RentRequest() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('rentRequestname');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [rentRequests, setRentRequests] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    
    const fetchRentRequestAll = () => {
      if(fetched === true) return;
      axios.get(
       `${baseUrl}/rentrequest/all`
      )
      .then(response => {
        console.log("Fetch rent Requests:"+response.data)
       setRentRequests(response.data);
       setFetched(true);
       return;
      })
      .catch(err => console.log("Fetch rentRequest Error:"+err.response));
    };
    fetchRentRequestAll([]);
  });


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rentRequests.map((n) => n.rentRequestname);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rentRequests.length) : 0;

  const filteredRentRequests = applySortFilter(rentRequests, getComparator(order, orderBy), filterName);

  const isRentRequestNotFound = filteredRentRequests.length === 0;

  return (
    <Page title="RentRequest |RevolveRent">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Rent Requests
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Request
          </Button>
        </Stack>

        <Card>
          <RentRequestListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RentRequestListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={rentRequests.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredRentRequests
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      // const { id, name, createdAt, advertId, message, avatarUrl, isAccepted } = row;
                      const  id= row.id;
                      const advertId = row.advertId;
                      const name = row.userId;
                      const message = row.message;
                      const createdAt = row.createdAt;
                      const isAccepted  = row.isAccepted ? "accepted" : "not accepted";
                   
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          createdAt="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{advertId}</TableCell>
                          <TableCell align="left">{message}</TableCell>
                          <TableCell align="left">{createdAt}</TableCell>
        
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(isAccepted === 'accepted' && 'success') || 'error'}
                            >
                              {sentenceCase(isAccepted)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <RentRequestMoreMenu userId={name} advertId = {advertId} rentRequestId= {id}/>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isRentRequestNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rentRequests.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
