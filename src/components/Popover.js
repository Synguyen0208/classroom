import React, { useState } from 'react';
import { Popover } from '@material-ui/core';
export default function PopoverAction(props) {
    const {body, open, close}=props;
    const openPopover = Boolean(open);
    const idPopover = openPopover ? 'simple-popover' : undefined;
    return (

        <Popover
            id={idPopover}
            open={openPopover}
            anchorEl={open}
            onClose={close}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            {body}
        </Popover>
    );
}
