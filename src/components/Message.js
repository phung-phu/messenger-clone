import React, { forwardRef } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import '../style/Message.css';

const Message = forwardRef(({message, username}, ref) => {
    const isUser = username === message.username;
    return (
        <div ref={ref} className={`msg_card ${isUser && 'msg_user'}`}>
            <Card className={isUser ? "msg_userCard": "msg_guestCard"}>
                <CardContent>
                    <Typography
                    variant="h5"
                    component="h2">
                    {!isUser && `${message.username || 'Unknown User'} says: `} {message.text}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message