import React, { useEffect, useState } from 'react';

interface User {
    fullName: string;
    email: string;
    phoneNumber: string;
    dob: string; // Adjust the type if necessary (e.g., Date)
}


const LoginAndLogout = () => {
    const [userDetails, setUserDetails] = useState<User | null>(null);

    useEffect(() => {
        // Retrieve user data from sessionStorage
        const userData = sessionStorage.getItem('userDetails');
        if (userData) {
            setUserDetails(JSON.parse(userData));
        } else {
            
        }
    }, []);

    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Details</h1>
            <p><strong>Full Name:</strong> {userDetails.fullName}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
            <p><strong>Date of Birth:</strong> {userDetails.dob}</p>
            {/* Add logout functionality */}
        </div>
    );
};

export default LoginAndLogout;
