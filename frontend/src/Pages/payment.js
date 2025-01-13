import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';

const Payment = () => {
    // Replace with your live Paystack public key
    const publicKey = "pk_live_your_real_public_key_here"; 
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState(0);

    const componentProps = {
        email,
        amount: amount * 100, // Convert to kobo (Paystack's currency format)
        publicKey,
        text: "Pay Now",
        onSuccess: (response) => alert("Payment Successful: " + response.reference),
        onClose: () => alert("Transaction was not completed")
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Paystack Payment</h1>
            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <PaystackButton {...componentProps} />
        </div>
    );
};

export default Payment;
