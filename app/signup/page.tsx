"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage('Sign up successful! Check your email for confirmation');
        }
    };

    return (
        <div className="container mx-auto">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <div className="mb-4">
                    <label className="mr-2">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-gray-300 border rounded-md px-2"
                    />
                </div>
                <div>
                    <label className="mr-2">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-gray-300 border rounded-md px-2"
                    />
                </div>
                <button type="submit" className="bg-blue-500 border rounded-md hover:bg-blue-300 px-2 text-white">Sign Up</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}
