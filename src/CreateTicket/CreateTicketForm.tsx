import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { createTicket } from "./CreateTicket.ts";

export function CreateTicketForm() {
    const { getAccessTokenSilently } = useAuth0();
    
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await createTicket(getAccessTokenSilently, {
            subject,
            body
        });

        setSubject("");
        setBody("");
    };

    return(
        <form onSubmit={handleSubmit}>
            <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            required
            />

            <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Describe the issue in detail"
            required
            />

            <button type="submit">Submit</button>
        </form>
    )
}