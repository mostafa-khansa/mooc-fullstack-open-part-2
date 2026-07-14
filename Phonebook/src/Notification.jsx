const Notification = ({ message, type }) => {
    if (message === null) {
        return null;
    }

    const notificationStyle = { fontSize: '12px', fontStyle: 'italic', color: 'white', padding: '4px' }

    switch (type) {
        case 'success':
            notificationStyle.backgroundColor = 'green'
            break
        case 'danger':
            notificationStyle.backgroundColor = 'red'
            break
    }


    return (
        <div style={notificationStyle}>
            {message}
        </div>
    );
}

export default Notification