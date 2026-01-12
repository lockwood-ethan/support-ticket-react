export type TicketStatus = "open" | "in_progress" | "on_hold" | "complete";
export type TicketPriority = "normal" | "high" | "critical";

export type Ticket = {
    id: string;
    subject: string;
    status: TicketStatus;
    priority: TicketPriority;
    createdAt: number;
}