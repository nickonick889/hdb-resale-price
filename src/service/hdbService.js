
export async function createHdb(data) {
  const url = "https://api.airtable.com/v0/appKaz6joPu3GkP3r/tblWCZ02SFBXM226w";
  const token = import.meta.env.VITE_AIRTABLE_TOKEN;

  if (!token) {
    throw new Error("Missing VITE_AIRTABLE_TOKEN in environment variables.");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: data }),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to create Airtable record:", error.message);
    throw error;
  }
}