import { useMemo, useState } from "react";
import type { Ticket } from "./types"

const seedTickets: Ticket[] = [
    {
        id: "t1",
        subject: "Fix login button alignment",
        status: "open",
        priority: "normal",
        createdAt: Date.now() - 1000*60*60*24,
    },
    {
        id: "t2",
        subject: "403 on /tickets endpoint",
        status: "in_progress",
        priority: "high",
        createdAt: Date.now() - 1000*60*60*15,
    },
];

function formatDate(ms: number) {
    return new Date(ms).toLocaleString();
}

export default function UserTicketList() {
    const [tickets] = useState<Ticket[]>(seedTickets);

    const stats = useMemo(() => {
        const open = tickets.filter(t => t.status === "open").length;
        const inProgress = tickets.filter(t => t.status === "in_progress").length;
        const onHold = tickets.filter(t => t.status === "on_hold").length;
        const complete = tickets.filter(t => t.status === "complete").length;
        return { open, inProgress, onHold, complete, total: tickets.length };
    }, [tickets]);

    return(
        <div style={{ maxWidth: 800, margin: "40px auto", padding: 16, fontFamily: "system-ui" }}>
            <h1>Ticket Tracker</h1>

            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                <Stat label="Open" value={stats.open} />
                <Stat label="In Progress" value={stats.inProgress} />
                <Stat label="On Hold" value={stats.onHold} />
                <Stat label="Complete" value={stats.complete} />
            </div>

            <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
                {tickets.map((t) => (
                    <li key={t.id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                            <strong>{t.subject}</strong>
                            <span style={{ opacity: 0.8 }}>{formatDate(t.createdAt)}</span>
                        </div>

                        <div style={{ display: "flex", gap: 10, marginTop: 8, fontSize: 14 }}>
                            <Badge label={`status: ${t.status}`} />
                            <Badge label={`priority: ${t.priority}`} />
                            <Badge label={`id: ${t.id}`} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Stat({ label, value }: { label: string; value: number }) {
    return (
        <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12, minWidth: 120 }}>
            <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{value}</div>
        </div>
    );
}

function Badge({ label }: { label: string }) {
    return (
        <span style={{ border: "1px solid #ddd", borderRadius: 999, padding: "2px 8px" }}>
            {label}
        </span>
    );
}