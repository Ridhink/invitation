import { safeBase64 } from '@/lib/base64';

export function generateInvitationLink(uid, guestName, baseUrl) {
    const url = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
    const encodedName = safeBase64.encode(guestName);
    return `${url}/${uid}?guest=${encodedName}`;
}

export function generateBulkInvitationLinks(uid, guestNames, baseUrl) {
    return guestNames.map(name => ({
        name,
        link: generateInvitationLink(uid, name, baseUrl)
    }));
}

export function printInvitationLinks(uid, guestNames, baseUrl = 'http://localhost:5173') {
    const links = generateBulkInvitationLinks(uid, guestNames, baseUrl);
    console.log('\n=== Personalized Invitation Links ===\n');
    links.forEach(({ name, link }) => {
        console.log(`${name}:\n${link}\n`);
    });
    return links;
}
