import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//function to render the avatars
function SelectAvatar({onSelect}){
    const avatars=[
        {src: "female1.png"}, {src: "female2.png"}, {src: "female3.png"}, {src: "female4.png"},
        {src: "male1.png"}, {src: "male2.png"}, {src: "male3.png"}, {src: "male4.png"}
    ]
    return(
        <div className="d-flex justify-content-center flex-wrap">
            {avatars.map((avatar, index) => (
                <div key={index} className="text-center p-2">
                    <img
                        src={`/avatars/${avatar.src}`}
                        alt={`avatar-${index}`}
                        height="100"
                        width="auto"
                        onClick={() => onSelect?.(avatar)}
                    />&nbsp;
                </div>
            ))}
        </div>
    )
}

export default function ProfileSetup({ show, handleClose, onAvatarSelect }) {
    const handleAvatarSelect = (avatarSrc) => {
        onAvatarSelect(avatarSrc); //pass avatar to parent (UserRegistration)
        handleClose();// close modal
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Select Your Avatar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*render avatars*/}
                <SelectAvatar onSelect={handleAvatarSelect} />
            </Modal.Body>
        </Modal>
    );
}
