import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import ProfileSetup from "../../auth/ProfileSetup";

export default function Profile({ setUserData, userData }) {
    const [username, setUsername] = useState(userData.username);
    const [avatar, setAvatar] = useState(userData.avatar);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [showAvatarModal, setShowAvatarModal] = useState(false);


    //ensures that submit button is disabled if none of the user details changed
    const isUnchanged =
        username === userData.username &&
        avatar === userData.avatar &&
        !newPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword && newPassword !== confirmPassword) {
            alert("New passwords do not match.");
            return;
        }

        //store the id in updatedUser
        const updatedUser = {
            id: userData.id,
        };

        //if there's any changes, update updatedUser
        if (username !== userData.username) updatedUser.username = username;
        if (avatar !== userData.avatar) updatedUser.avatar = avatar;
        if (newPassword) updatedUser.password = newPassword;

        try {
            const response = await axios.put(
                '/api/user/update-profile',
                updatedUser,
                {
                    params: newPassword ? { currentPassword } : {},
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            alert(response.data);

            //fetch user again from backend after update
            //to ensure that the update has reflected on the backend
            const res = await axios.get(
                `/api/user/getUser`, {
                    params: { id: userData.id }
                });
            //set userData in localStorage
            localStorage.setItem("userData", JSON.stringify(res.data));
            //reset the password fields to empty
            setNewPassword('');
            setConfirmPassword('');
            setCurrentPassword('');

            //update userData useState variable
            const storedUser = localStorage.getItem("userData");
            //set the new userData
            setUserData(JSON.parse(storedUser));

        } catch (error) {
            const errorMsg = error.response?.data;
            console.error("Error updating profile: ", errorMsg);
            alert(errorMsg);

        }
    };

    return (
        <div className="dash-tab">
            <div className="profile">
                <div className="profile-info">
                    <img
                        //the avatar will change when user selects a new one
                        src={`/avatars/${avatar}`}
                        alt={`${userData.username}'s avatar`}
                    />
                    {/*message will appear when user selects a new avatar*/}
                    {avatar!== userData.avatar&& (
                        <div className="text-center">
                            <p>You have selected a new avatar!
                                Submit changes to keep avatar.
                            </p>
                        </div>
                    )}
                    <div className="my-4">
                        {/*button to show modal for avatar selection */}
                        <Button variant="secondary" onClick={() => setShowAvatarModal(true)}>
                            Change Avatar
                        </Button>
                    </div>
                    <h3>{userData.username}</h3>
                    <p>{userData.role}</p>
                </div>

                <div className="profile-update-form">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4">
                            <Form.Label>Edit Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <h5>Change Password</h5>
                        <Form.Text muted>
                            You only need to fill in these fields to change your password.
                        </Form.Text>

                        <Form.Group className="mt-3">
                            <Form.Label>Enter current password</Form.Label>
                            <Form.Control
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                disabled={!newPassword}
                                required={!!newPassword}
                            />
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Form.Label>Enter new password</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Form.Label>Confirm new password</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        <div className="text-center">
                            <Button type="submit" className="mt-4" disabled={isUnchanged}>Submit Changes</Button>
                        </div>
                    </Form>

                    <ProfileSetup
                        show={showAvatarModal}
                        handleClose={() => setShowAvatarModal(false)}
                        onAvatarSelect={(selected) => {
                            setAvatar(selected.src); // update state with chosen avatar filename
                            setShowAvatarModal(false);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
