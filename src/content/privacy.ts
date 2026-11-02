import type { Locale } from './routes';
import { site } from './site';

export interface PrivacyContent {
  seo: { title: string; description: string };
  h1: string;
  intro: string;
  updated: string;
  sections: Array<{ h: string; p: string[] }>;
}

export const UPDATED = '2026-11-02';

export const privacy: Record<Locale, PrivacyContent> = {
  sv: {
    seo: {
      title: 'Integritet | Anton Wester',
      description: 'Vad antonwester.se sparar när du bokar ett samtal, skickar ett meddelande eller använder chatten, vem som får uppgifterna och hur du ber om att få dem raderade.',
    },
    h1: 'Integritet',
    intro: `Sidan drivs av ${site.company}. Här står vad som händer med de uppgifter du lämnar. Frågor går till ${site.email}.`,
    updated: `Senast uppdaterad ${UPDATED}`,
    sections: [
      {
        h: 'Boka ett samtal',
        p: [
          'Du fyller i namn, e-postadress, företag (valfritt) och ett meddelande om vad samtalet gäller. Uppgifterna skickas till mig som e-post.',
          'Bokningen läggs i min Google Kalender. Din e-postadress går dit som gäst, så att Google kan skicka inbjudan med Meet-länk. Ditt namn, ditt företag och ditt meddelande står inte i kalenderinbjudan.',
          'Sidan läser min kalender bara för att se vilka tider som är lediga, för att skapa mötet och för att räkna bokningar som gjorts härifrån. Sidan sparar inget annat kalenderinnehåll.',
          'Bokningsformuläret skyddas av Cloudflare Turnstile. Din IP-adress används för att begränsa hur många försök som får göras och skickas till Turnstile för kontrollen.',
        ],
      },
      {
        h: 'Kontaktformuläret',
        p: ['Det du skriver skickas som e-post till mig via Cloudflare.'],
      },
      {
        h: 'Chatten',
        p: ['Din fråga i chatten skickas till Cloudflare Workers AI, som skriver svaret.'],
      },
      {
        h: 'Statistik',
        p: ['Sidan använder Umami för besöksstatistik.'],
      },
      {
        h: 'Varför, hur länge och dina rättigheter',
        p: [
          'Jag använder uppgifterna för att svara dig och för att hålla mötet.',
          'De ligger kvar i min inkorg och min kalender så länge det behövs för det. Skriv till mig om du vill se eller radera dina uppgifter.',
        ],
      },
    ],
  },
  en: {
    seo: {
      title: 'Privacy | Anton Wester',
      description: 'What antonwester.se keeps when you book a call, send a message or use the chat, who receives it, and how to ask to see or delete your data.',
    },
    h1: 'Privacy',
    intro: `This site is run by ${site.company}. Here is what happens to the details you give. Questions go to ${site.email}.`,
    updated: `Last updated ${UPDATED}`,
    sections: [
      {
        h: 'Booking a call',
        p: [
          'You enter your name, email address, company (optional) and a message about what the call is for. The details are emailed to me.',
          'The booking goes into my Google Calendar. Your email address goes there as a guest, so Google can send the invite with a Meet link. Your name, company and message are not in the calendar invite.',
          'The site reads my calendar only to see which times are free, to create the meeting, and to count bookings made from here. The site stores no other calendar content.',
          'The booking form is protected by Cloudflare Turnstile. Your IP address is used to limit how many attempts are allowed, and it is sent to Turnstile for the check.',
        ],
      },
      {
        h: 'The contact form',
        p: ['What you write is emailed to me through Cloudflare.'],
      },
      {
        h: 'The chat',
        p: ['Your question in the chat is sent to Cloudflare Workers AI, which writes the answer.'],
      },
      {
        h: 'Statistics',
        p: ['The site uses Umami for visitor statistics.'],
      },
      {
        h: 'Why, how long, and your rights',
        p: [
          'I use the details to answer you and to hold the meeting.',
          'They stay in my mailbox and calendar as long as that takes. Write to me if you want to see or delete your data.',
        ],
      },
    ],
  },
};
