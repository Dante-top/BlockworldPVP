import styles from './marketplace_search.module.scss'
import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material/";
import CancelIcon from '@mui/icons-material/Cancel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { SortData } from '../../constants';

const Marketpace_search = () => {
    const [value, setValue] = useState("");
    return (
        <div className={`${styles.m_search} d-flex`}>
            <TextField
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                }}
                className={`${styles.searchBar}`}
                placeholder="Search for a Blockhead"
                type="text"
                variant="outlined"
                fullWidth
                size="small"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),

                    endAdornment: value && (
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setValue("")}
                        >
                            <CancelIcon />
                        </IconButton>
                    )
                }}
            />
            <FormControl
                className={`${styles.sort_content}`}
                sx={{ m: 1, minWidth: 200 }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native" className={`${styles.sort_label}`}>
                    Sort By
                </InputLabel>
                <NativeSelect
                    sx={{
                        '& .MuiSelect-select': { padding: 1.3, color: 'white', fontSize: 12 },
                        '& .Mui-focused': { border: 'none' },
                        '& .MuiNativeSelect-select': { padding: 0.5, color: 'white', fontSize: 14 }
                    }}
                    id="demo-simple-select-helper"
                    defaultValue={10}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={10}>Recently Listed</option>
                    {
                        SortData.map((items, index) => (
                            <option value={index}>
                                {items.name}
                            </option>
                        ))
                    }
                </NativeSelect>
            </FormControl>
        </div>
    );
}

export default Marketpace_search