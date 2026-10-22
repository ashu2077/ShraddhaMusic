// Vercel serverless function: receives Pre-registration form submissions and
// writes them to an Excel table in OneDrive via Microsoft Graph, using an
// Entra ID app registration (client credentials flow — no interactive login).
//
// Required environment variables (set in Vercel project settings, never committed):
//   MS_TENANT_ID     - Entra ID tenant ID
//   MS_CLIENT_ID     - App registration's client ID
//   MS_CLIENT_SECRET - App registration's client secret value
//
// The Excel file is referenced by its OneDrive sharing URL below, resolved to a
// driveItem via Graph's /shares endpoint — no need to hardcode a folder path.

const SHARE_URL =
  'https://shraddhasmusicacademy-my.sharepoint.com/:x:/g/personal/ashutosh_admin_shraddhasmusicacademy_onmicrosoft_com/IQAqejLBTu3QQZTdQ9n9yHMEAa0fNpHJVZlEIIV2kBarUKg?e=cWCbkr';
const TABLE_NAME = 'Table1';

// Column order must match the Excel table's header row exactly:
// Creation Date/Time, Student Full Name, Student Email, Student Date of Birth,
// Student Age, Instrument(s) Learning, Lesson Goals/Preferences, How Did You
// Find Us, Parent/Guardian Full Name, Parent/Guardian Email, Parent/Guardian
// Phone, Mailing Address, Relationship to Student, Assessment Availability

function encodeShareUrl(url) {
  const base64 = Buffer.from(url, 'utf-8').toString('base64');
  const base64url = base64.replace(/=+$/, '').replace(/\//g, '_').replace(/\+/g, '-');
  return `u!${base64url}`;
}

async function getAccessToken() {
  const tenantId = process.env.MS_TENANT_ID;
  const clientId = process.env.MS_CLIENT_ID;
  const clientSecret = process.env.MS_CLIENT_SECRET;

  const res = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'https://graph.microsoft.com/.default',
    }),
  });

  if (!res.ok) {
    throw new Error(`Token request failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  return data.access_token;
}

async function resolveDriveItem(token) {
  const encoded = encodeShareUrl(SHARE_URL);
  const res = await fetch(
    `https://graph.microsoft.com/v1.0/shares/${encoded}/driveItem?$select=id,parentReference`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) {
    throw new Error(`Failed to resolve share URL: ${res.status} ${await res.text()}`);
  }
  const item = await res.json();
  return { driveId: item.parentReference.driveId, itemId: item.id };
}

function graphBase({ driveId, itemId }) {
  return `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/workbook/tables/${TABLE_NAME}`;
}

async function addRow(token, driveItem, values) {
  const res = await fetch(`${graphBase(driveItem)}/rows`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [values] }),
  });
  if (!res.ok) {
    throw new Error(`Failed to add row: ${res.status} ${await res.text()}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  try {
    const data = req.body || {};
    const studentEmail = (data.studentEmail || '').trim();
    if (!studentEmail) {
      res.status(200).json({ ok: false, error: 'Student email address is required.' });
      return;
    }

    const token = await getAccessToken();
    const driveItem = await resolveDriveItem(token);

    await addRow(token, driveItem, [
      new Date().toISOString(),
      data.studentFullName || '',
      studentEmail,
      data.studentDob || '',
      data.studentAge ?? '',
      data.instrument || '',
      data.lessonGoals || '',
      data.howDidYouFindUs || '',
      data.parentFullName || '',
      data.parentEmail || '',
      data.parentPhone || '',
      '', // Mailing Address — not collected by the form, column kept for sheet compatibility
      data.relationship || '',
      data.assessmentAvailability || '',
    ]);

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Pre-registration submit failed:', err);
    res.status(200).json({ ok: false, error: 'Server error: ' + err.message });
  }
}
