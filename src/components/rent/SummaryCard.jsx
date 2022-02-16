import React from 'react'

import './rentcard.css'


import { Stack, Button, Divider, Typography } from '@mui/material';


const SummaryCard = props => {
    return (
        <div className='rent-card'>
            <div className="rent-card__icon">
                <i className={props.icon}></i>
            </div>
            <div className="rent-card__info">
                <h4>{props.count}</h4>
                <span>{props.title}</span>
            </div>
        

            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle3" sx={{ color: 'text.primary' }}>
                    Pay Date: 5th
                </Typography>
                <Typography variant="subtitle3" sx={{ color: 'text.primary' }}>
                    Pay Date: 5th
                </Typography>
                <Typography variant="subtitle3" sx={{ color: 'text.primary' }}>
                    Pay Date: 5th
                </Typography>
                 
            
                </Stack>
        </div>
    )
}

export default SummaryCard
