import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import axios from "axios";

export default function Profile({ userData }) {
    const [username, setUsername] = useState(userData.username);
    const [avatar, setAvatar] = useState(userData.avatar);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword && newPassword !== confirmPassword) {
            alert("New passwords do not match.");
            return;
        }

        const updatedUser = {
            id: userData.id,
        };

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
                    },
                    withCredentials: true, // <-- important if you're using cookies/session-based auth
                }
            );

            alert("✅ " + response.data);
            // Optionally refresh state or UI here
            window.location.reload();

        } catch (error) {
            const errorMsg = error.response?.data || "Something went wrong.";
            console.error("Update error:", errorMsg);
            alert(errorMsg);
        }
    };

    return (
        <div className="dash-tab">
            <div className="profile">
                <div className="profile-info">
                    <img
                        src={`/avatars/${avatar}`}
                        alt={`${username}'s avatar`}
                    />
                    <div className="mb-3">
                        {/* Placeholder for future avatar modal */}
                        <Button variant="secondary">
                            Change Avatar
                        </Button>
                    </div>
                    <h3>{username}</h3>
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
                            <Button type="submit" className="mt-4">Submit Changes</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
