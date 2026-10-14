import type { L10n, ScanFunction } from './types';

export const scan: L10n<ScanFunction[]> = {
  sv: [
    { id: 'cs', name: 'Kundtjänst', steps: [
      { label: 'Läsa och sortera inkommande mejl', mode: 'agent', share: 0.25 },
      { label: 'Skriva svarsutkast från era hjälpartiklar', mode: 'agent', share: 0.35 },
      { label: 'Kontrollera ton och fakta', mode: 'you', share: 0.15 },
      { label: 'Skicka och logga i CRM', mode: 'agent', share: 0.10 },
      { label: 'Hantera specialfallen', mode: 'assist', share: 0.15 },
    ] },
    { id: 'finance', name: 'Ekonomi', steps: [
      { label: 'Matcha fakturor mot ordrar', mode: 'agent', share: 0.30 },
      { label: 'Jaga saknade kvitton', mode: 'agent', share: 0.20 },
      { label: 'Kontera transaktioner', mode: 'assist', share: 0.25 },
      { label: 'Attestera betalningar', mode: 'you', share: 0.10 },
      { label: 'Sammanfatta månadsbokslutet', mode: 'assist', share: 0.15 },
    ] },
    { id: 'sales', name: 'Försäljning', steps: [
      { label: 'Researcha kunden', mode: 'agent', share: 0.30 },
      { label: 'Skriva första kontakten', mode: 'assist', share: 0.20 },
      { label: 'Kvalificera inkommande leads', mode: 'agent', share: 0.20 },
      { label: 'Ta samtalet', mode: 'you', share: 0.20 },
      { label: 'Uppdatera CRM efteråt', mode: 'agent', share: 0.10 },
    ] },
    { id: 'admin', name: 'Administration', steps: [
      { label: 'Sammanfatta långa dokument', mode: 'agent', share: 0.25 },
      { label: 'Föra över data mellan system', mode: 'agent', share: 0.25 },
      { label: 'Boka möten och skicka påminnelser', mode: 'assist', share: 0.15 },
      { label: 'Svara på interna frågor', mode: 'assist', share: 0.15 },
      { label: 'Granska och fatta beslut', mode: 'you', share: 0.20 },
    ] },
    { id: 'reporting', name: 'Rapportering', steps: [
      { label: 'Hämta siffror från fem system', mode: 'agent', share: 0.35 },
      { label: 'Bygga veckorapporten', mode: 'agent', share: 0.25 },
      { label: 'Hitta vad som ändrats och varför', mode: 'assist', share: 0.20 },
      { label: 'Bestämma vad ni gör åt det', mode: 'you', share: 0.20 },
    ] },
  ],
  en: [
    { id: 'cs', name: 'Customer service', steps: [
      { label: 'Read and sort incoming email', mode: 'agent', share: 0.25 },
      { label: 'Draft replies from your help docs', mode: 'agent', share: 0.35 },
      { label: 'Check tone and facts', mode: 'you', share: 0.15 },
      { label: 'Send and log it in the CRM', mode: 'agent', share: 0.10 },
      { label: 'Handle the odd cases', mode: 'assist', share: 0.15 },
    ] },
    { id: 'finance', name: 'Finance', steps: [
      { label: 'Match invoices to orders', mode: 'agent', share: 0.30 },
      { label: 'Chase missing receipts', mode: 'agent', share: 0.20 },
      { label: 'Code transactions', mode: 'assist', share: 0.25 },
      { label: 'Approve payments', mode: 'you', share: 0.10 },
      { label: 'Write the month-end summary', mode: 'assist', share: 0.15 },
    ] },
    { id: 'sales', name: 'Sales', steps: [
      { label: 'Research the account', mode: 'agent', share: 0.30 },
      { label: 'Write the first outreach', mode: 'assist', share: 0.20 },
      { label: 'Qualify inbound leads', mode: 'agent', share: 0.20 },
      { label: 'Run the call', mode: 'you', share: 0.20 },
      { label: 'Update the CRM afterwards', mode: 'agent', share: 0.10 },
    ] },
    { id: 'admin', name: 'Administration', steps: [
      { label: 'Summarise long documents', mode: 'agent', share: 0.25 },
      { label: 'Move data between systems', mode: 'agent', share: 0.25 },
      { label: 'Book meetings and send reminders', mode: 'assist', share: 0.15 },
      { label: 'Answer internal questions', mode: 'assist', share: 0.15 },
      { label: 'Review and decide', mode: 'you', share: 0.20 },
    ] },
    { id: 'reporting', name: 'Reporting', steps: [
      { label: 'Pull numbers from five systems', mode: 'agent', share: 0.35 },
      { label: 'Build the weekly report', mode: 'agent', share: 0.25 },
      { label: 'Spot what changed and why', mode: 'assist', share: 0.20 },
      { label: 'Decide what to do about it', mode: 'you', share: 0.20 },
    ] },
  ],
};
