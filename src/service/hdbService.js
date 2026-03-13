
const DATA_GOV_URL = "/api/datagov/api/action/datastore_search";
const RESOURCE_ID = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc";
const AIRTABLE_URL = "https://api.airtable.com/v0/appKaz6joPu3GkP3r/Table%201";


export async function getHdbResalePage(offset = 0, pageSize = 100, filters = {}) {
  const query = new URLSearchParams({
    resource_id: RESOURCE_ID,
    limit: String(pageSize),
    offset: String(offset),
    sort: "month desc",
  });

  if (Object.keys(filters).length > 0) {
    query.set("filters", JSON.stringify(filters));
  }

  const apiKey = import.meta.env.VITE_DATA_GOV_API_KEY;
  const headers = apiKey ? { "x-api-key": apiKey } : {};
  const response = await fetch(`${DATA_GOV_URL}?${query.toString()}`, { headers });

  if (response.status === 429) {
    throw new Error("Rate limit reached for data.gov.sg. Wait 10 seconds or add VITE_DATA_GOV_API_KEY.");
  }
  if (!response.ok) {
    await parseErrorResponse(response, "Failed to fetch HDB resale data");
  }

  const payload = await response.json();
  if (payload?.success === false) {
    throw new Error(payload?.errorMsg || "data.gov.sg returned an unsuccessful response.");
  }

  const records = payload?.result?.records ?? [];
  const total = payload?.result?.total ?? records.length;
  return { records, total, offset, pageSize };
}



function getAirtableToken() {
	const token = import.meta.env.VITE_AIRTABLE_TOKEN;
  if (!token) {
    throw new Error("Missing VITE_AIRTABLE_TOKEN in environment variables.");
  }
  return token;
}

async function parseErrorResponse(response, prefix) {
  const text = await response.text();
  throw new Error(`${prefix} (${response.status}): ${text}`);
}

async function fetchAirtable(path = "", options = {}) {
  const token = getAirtableToken();
  const response = await fetch(`${AIRTABLE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    await parseErrorResponse(response, "Airtable request failed");
  }

  return response.json();
}



export async function getWatchlist() {
	const payload = await fetchAirtable();
  return (payload.records ?? []).map((record) => ({
    ...record.fields,
    floor_area_sqm: record.fields.floor_area_sqm ?? record.fields.area,
    airtableId: record.id,
  }));
}

export async function createHdb(data) {
  const { _full_count, rank, ...rawFields } = data;
  const fields = {
    ...rawFields,
    _id: rawFields._id != null ? String(rawFields._id) : undefined,
    area: rawFields.area ?? rawFields.floor_area_sqm,
  };
  const response = await fetchAirtable("", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });
  // Airtable can return either a single record object or { records: [...] }.
  if (response?.id) {
    return response;
  }

  return response.records?.[0] ?? null;
}

export async function deleteHdb(airtableId) {
  if (!airtableId) {
    throw new Error("Missing Airtable record id for watchlist removal.");
  }

  return fetchAirtable(`/${airtableId}`, {
    method: "DELETE",
  });
}
