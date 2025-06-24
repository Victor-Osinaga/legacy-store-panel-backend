import config from "../../../config.js";

export default async function getRepoId() {
  const GITHUB_TOKEN = config.github_token;
  const owner = "Victor-Osinaga";
  const repo = "legacy-store-frontend";

  if (!GITHUB_TOKEN) {
    return console.error("❌ Token de GitHub no definido");
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.error("❌ Error al obtener el repo:");
    console.error("Status:", response.status);
    console.error("Body:", result);
    return;
  }

  console.log("✅ Repository ID:", result.id);
  return result.id;
}

getRepoId();
