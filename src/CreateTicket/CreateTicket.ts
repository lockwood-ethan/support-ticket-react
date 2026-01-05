import type { CreateTicketRequest } from "./CreateTicketRequest.ts";

const postTicketEndpoint = import.meta.env.VITE_CREATE_TICKET_ENDPOINT;

export async function createTicket(
    getAccessTokenSilently: () => Promise<string>,
    ticket: CreateTicketRequest
): Promise<void> {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(postTicketEndpoint, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ticket)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create ticket: ${response.status} ${errorText}`);
    }
}