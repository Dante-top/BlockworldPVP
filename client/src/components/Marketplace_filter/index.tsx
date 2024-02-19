import styles from './marketplace_filter.module.scss'
import * as React from 'react';
import { useState } from 'react';
import { FilterData } from '../../constants';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { styled } from "@mui/material/styles";

const StyledAutocomplete = styled(Autocomplete)({
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
        // Default transform is "translate(14px, 20px) scale(1)""
        // This lines up the label with the initial cursor position in the input
        // after changing its padding-left.
        transform: "translate(34px, 20px) scale(1);"
    },
    "& .MuiOutlinedInput-root": {
        padding: 0
    },
    "& .MuiFormLabel-root": {
        color: "white"
    },
    "& .MuiAutocomplete-inputRoot": {
        color: "white",
    },
    "& .MuiInputBase-root:focused": {
        border: 'none'
    }
});

const Marketplace_filter = () => {
    const [minCount, setminCount] = useState(0);
    const [maxCount, setmaxCount] = useState(0);
    const minIncrease = (count: number) => {
        setminCount(count + 1);
    }
    const minDecrease = (count: number) => {
        if (count < 1) {
            return
        }
        setminCount(count - 1);
    }
    const maxIncrease = (count: number) => {

        setmaxCount(count + 1);
    }
    const maxDecrease = (count: number) => {
        if (count < 1) {
            return
        }
        setmaxCount(count - 1);
    }
    return (
        <div className='col-xxl-3 col-xl-4 col-ls-4'>
            <div className={`${styles.m_filter} d-flex flex-column`}>
                <div className='text-center'>
                    <p className={`${styles.title}`}>FILTERS</p>
                </div>
                <div className={`${styles.amount_content} d-flex flex-row justify-content-center align-items-center`}>
                    <div className={`${styles.min_amount} d-flex flex-row`}>
                        <span className={`${styles.amount_text}`}>
                            <p>Min.&nbsp;SOL</p>
                            <p>{minCount}</p>
                        </span>
                        <span className={`${styles.arrow} d-flex flex-column justify-content-center align-items-center`}>
                            <a onClick={() => { minIncrease(minCount) }}><img src='../../img/Polygon 2.png' /></a>
                            <a onClick={() => { minDecrease(minCount) }}><img src='../../img/Polygon 1.png' /></a>
                        </span>
                    </div>
                    <div className={`${styles.min_amount} d-flex flex-row`}>
                        <span className={`${styles.amount_text}`}>
                            <p>Max.&nbsp;SOL</p>
                            <p>{maxCount}</p>
                        </span>
                        <span className={`${styles.arrow} d-flex flex-column justify-content-center align-items-center`}>
                            <a onClick={() => { maxIncrease(maxCount) }}><img src='../../img/Polygon 2.png' /></a>
                            <a onClick={() => { maxDecrease(maxCount) }}><img src='../../img/Polygon 1.png' /></a>
                        </span>
                    </div>
                </div>
                <div className={`${styles.rarity} d-flex flex-column justify-content-center align-items-center`}>
                    {
                        FilterData.items.map((items) => (
                            <Stack spacing={3} sx={{ width: '92%', color: "white" }}>
                                <StyledAutocomplete
                                    className={`${styles.rarity_body}`}
                                    multiple
                                    id="tags-outlined"
                                    options={items.content.map((option) => option.name)}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            className={`${styles.rarity_item}`}
                                            {...params}
                                            label={items.title}
                                            placeholder={items.title}
                                        />
                                    )}
                                />
                            </Stack>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
export default Marketplace_filter