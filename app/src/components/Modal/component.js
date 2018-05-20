import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Modal extends React.Component {
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.onCancel}
            />,
            <FlatButton
                label={this.props.confirmTitle}
                primary={true}
                keyboardFocused={true}
                onClick={this.props.onConfirm}
            />,
        ];

        return (
            <MuiThemeProvider>
                <Dialog
                    title={this.props.title}
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.onCancel}
                />
            </MuiThemeProvider>
        );
    }
}

export default Modal;