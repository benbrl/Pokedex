export async function login(email, password) {
  const url = `${import.meta.env.VITE_SERVER_URL_APP}/auth/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    const data = await response.json();
    localStorage.setItem("jwt", data.token);
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export async function register(username, email, password) {
  const url = `${import.meta.env.VITE_SERVER_URL_APP}/auth/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    const data = await response.json();
    localStorage.setItem("jwt", data.token);
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}