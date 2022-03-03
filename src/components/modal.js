import { collapseClasses, FormControl } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { Component, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const allTerms = [1,2,3,4,5,6,7,8,9,10,11,12]
    const [term, setTerm] = React.useState(0)
    const handleTermChange = event => {
      setTerm(event.target.value);
    }
    return (
      <div>
        <Button onClick={handleOpen}>Change Term</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Which term would you like to move this class to?
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Term</InputLabel>
              <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={term}
              label="Term"
              onChange={handleTermChange}
              >
                {allTerms.map((term) => <MenuItem value={term}>{term}</MenuItem>)}
              </Select>
            </FormControl>
            <Button onClick={handleClose}>OK</Button>
          </Box>
        </Modal>
      </div>
    );
  }

  export default BasicModal;