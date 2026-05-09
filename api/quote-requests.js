const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_ALERT_EMAIL = process.env.ADMIN_ALERT_EMAIL;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'TxRacs Website <onboarding@resend.dev>';

const allowedServices = new Set([
  'AC Repair',
  'AC Installation',
  'Heating Repair',
  'Heating Installation',
  'Commercial HVAC',
  'Refrigeration',
  'Maintenance',
  'Emergency Service',
  'Thermostats',
]);

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(payload));
}

function getConfigStatus() {
  return {
    supabaseUrl: Boolean(SUPABASE_URL),
    supabaseServiceRoleKey: Boolean(SUPABASE_SERVICE_ROLE_KEY),
    resendApiKey: Boolean(RESEND_API_KEY),
    adminAlertEmail: Boolean(ADMIN_ALERT_EMAIL),
  };
}

function isConfigured() {
  return Object.values(getConfigStatus()).every(Boolean);
}

function normalizeLead(body) {
  return {
    name: String(body.name || '').trim(),
    phone: String(body.phone || '').trim(),
    email: String(body.email || '').trim(),
    service: String(body.service || '').trim(),
    message: String(body.message || '').trim(),
  };
}

function getRequestBody(request) {
  if (!request.body) return {};
  if (typeof request.body === 'string') {
    return JSON.parse(request.body);
  }
  return request.body;
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function validateLead(lead) {
  if (!lead.name || !lead.phone || !lead.service) {
    return 'Please provide name, phone, and service needed.';
  }

  if (!allowedServices.has(lead.service)) {
    return 'Please select a valid service.';
  }

  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return 'Please provide a valid email address.';
  }

  return '';
}

async function createQuoteRequest(lead) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/quote_requests`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      ...lead,
      status: 'New',
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Supabase insert failed: ${details}`);
  }

  const rows = await response.json();
  return rows[0];
}

async function sendAlertEmail(lead, savedLead) {
  const html = `
    <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6">
      <h2 style="color:#075dbf">New Quote Request</h2>
      <p>A visitor submitted a new TxRacs LLC quote request.</p>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:640px">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(lead.name)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(lead.phone)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(lead.email || 'Not provided')}</td></tr>
        <tr><td><strong>Service</strong></td><td>${escapeHtml(lead.service)}</td></tr>
        <tr><td><strong>Message</strong></td><td>${escapeHtml(lead.message || 'Not provided')}</td></tr>
        <tr><td><strong>Lead ID</strong></td><td>${escapeHtml(savedLead.id)}</td></tr>
      </table>
    </div>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: ADMIN_ALERT_EMAIL,
      reply_to: lead.email || undefined,
      subject: `New Quote Request - ${lead.service}`,
      html,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend alert failed: ${details}`);
  }

  return response.json();
}

export default async function handler(request, response) {
  if (request.method === 'GET') {
    sendJson(response, 200, {
      ok: true,
      configured: getConfigStatus(),
    });
    return;
  }

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'GET, POST');
    sendJson(response, 405, { error: 'Method not allowed.' });
    return;
  }

  if (!isConfigured()) {
    sendJson(response, 503, {
      error: 'Quote system is not configured yet.',
      code: 'CONFIG_MISSING',
      configured: getConfigStatus(),
    });
    return;
  }

  try {
    const lead = normalizeLead(getRequestBody(request));
    const validationError = validateLead(lead);

    if (validationError) {
      sendJson(response, 400, { error: validationError });
      return;
    }

    const savedLead = await createQuoteRequest(lead);
    await sendAlertEmail(lead, savedLead);

    sendJson(response, 201, {
      message: 'Quote request submitted successfully.',
      id: savedLead.id,
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : '';
    const code = message.startsWith('Supabase insert failed')
      ? 'SUPABASE_SAVE_FAILED'
      : message.startsWith('Resend alert failed')
        ? 'EMAIL_ALERT_FAILED'
        : 'QUOTE_SUBMIT_FAILED';

    sendJson(response, 500, {
      error: 'We could not submit your request right now. Please call us directly.',
      code,
    });
  }
}
