import React, { useState } from 'react';
import {
  Avatar,
  Backdrop,
  CardHeader,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import swal from "sweetalert";
import { useParams } from 'react-router-dom';
import EmailIcon from '@material-ui/icons/Email';
import ClassroomContext from './ClassroomContext';
import Row from 'reactstrap/lib/Row';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MemberService from '../APIService/MemberService';
import getUser from '../APIService/GetUser';
import ClearIcon from '@material-ui/icons/Clear';
import PopoverAction from './Popover';
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
export default function Member(props) {
  const user = getUser();
  const classes = useStyles();
  const [form, setForm] = useState({
    email: null,
  });
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setForm({
      [name]: value,
    });
  };
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = form;
    const formData = {
      email: email,
    };
    handleOpenBackdrop();
    handleCloseDialog();
    try{
      const response=await MemberService.inviteMember(idClass, formData);
      swal("Good job!", response.data.message, "success");
    }
    catch(error)
    {
      swal("Execution failed!", 'Please check email!', "error");
    }
    
    handleCloseBackdrop();
  };
  const [popover, setPopover]= useState({
    popoverBody:null,
    popoverOpen:null
  });
  const handleClick = (event, body) => {
    setPopover({
      popoverBody:body,
      popoverOpen:event.currentTarget
    })
  };
  const {popoverBody, popoverOpen}=popover;
  const handleRemoveMember = async (memberEmail) => {
    handleOpenBackdrop();
    handleCloseDialog();
    await MemberService.removeMember(idClass, memberEmail);
    window.location.reload();
    handleCloseBackdrop();
  }
  const handleClosePopover = () => {
    setPopover({
      popoverOpenL:null
    })
  };
  const { idClass } = useParams();
  return (
    <div className="contain">
      <ClassroomContext.Consumer>
        {(data) => {
          const { ownerName, ownerId, ownerAvatar, userJoined } = data;
          return (
            <div>
              <Typography variant="h4" component="h4" className="m-t">
                Teachers
              </Typography>
              <hr className="hr-mt" />
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="recipe"
                    src={ownerAvatar}
                    className={classes.avatar}
                  ></Avatar>
                }
                title={
                  <Typography variant="h6" component="h6">
                    {ownerName}
                  </Typography>
                }
              />
              <br />
              <br />
              <Row className="m-0">
                <Typography variant="h4" component="h4" className="m-t">
                  Classmates
                </Typography>
                {
                  ownerId == user.id
                  &&
                  <button
                    className={`btn-add-member left`}
                    onClick={handleClickOpen}
                  >
                    <PersonAddIcon className="i-a-m" />
                  </button>
                }

              </Row>
              <hr className="hr-mt" />
              {userJoined &&
                userJoined.map((e, key) => {
                  const { name, email, avatar } = e;
                  return (
                    <CardHeader
                      key={key}
                      avatar={
                        <Avatar
                          aria-label="recipe"
                          src={avatar}
                          className={classes.avatar}
                        ></Avatar>
                      }
                      action={
                        <div>
                          <EmailIcon onClick={(event)=>handleClick(event, <Typography className="p-15">{email}</Typography>)} />
                          {ownerId == user.id
                            &&
                            <ClearIcon className="action-clear" onClick={() => handleRemoveMember(email)} />
                          }
                        </div>
                      }
                      title={
                        <Typography variant="h6" component="h6">
                          {name}
                        </Typography>
                      }
                    />
                  );
                })}
              <PopoverAction body={popoverBody} open={popoverOpen} close={handleClosePopover}/>
              <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Invite member</DialogTitle>
                <form onSubmit={handleSubmit}>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      onChange={handleChange}
                      id="name"
                      label="Email Address"
                      name="email"
                      type="email"
                      required
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <button
                      class="MuiButtonBase-root MuiButton-root MuiButton-text"
                      onClick={handleCloseDialog}
                      tabindex="0"
                      type="button"
                    >
                      <span class="MuiButton-label">Cancel</span>
                      <span class="MuiTouchRipple-root"></span>
                    </button>
                    <button type="submit" className="btn-add-member m-0">
                      Invite
                    </button>
                  </DialogActions>
                </form>
              </Dialog>
              <Backdrop className={classes.backdrop} open={openBackdrop}>
                <CircularProgress color="secondary" />
              </Backdrop>
            </div>
          );
        }}
      </ClassroomContext.Consumer>
    </div>
  );
}
