import config from "./config.js";

async function createAndDeployVercel() {
  //   const getProject = await fetch(
  //     "https://api.vercel.com/v9/projects/amba_branch",
  //     {
  //       headers: {
  //         Authorization: `Bearer ${config.vercel_token}`,
  //       },
  //       method: "get",
  //     }
  //   );

  //   if (!getProject.ok) {
  //     const errorDetails = await getProject.text();
  //     console.error("error al obtener proyecto", errorDetails);
  //     return "error al obtener el proyecto";
  //   }
  //   console.log("getProject: ", await getProject.json());

  //   return;

  //   CREACION DEL PROYECTO _______________________________________________________________________________________________________________________________________________________________
  const response = await fetch("https://api.vercel.com/v10/projects", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.vercel_token}`, // Token Vercel
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "victor-tienda-legacystore", // Nombre del proyecto
      gitRepository: {
        repo: "Victor-Osinaga/legacy-store-frontend", // Repositorio en formato "owner/nombre-del-repo"
        type: "github", // Tipo de proveedor (puede ser "github", "gitlab", etc.)
      },
      framework: "vite", // Framework utilizado
      environmentVariables: [
        {
          key: "VITE_ENV",
          value: "prod",
          target: ["production"],
          type: "encrypted", // Especifica el tipo
        },
        {
          key: "VITE_BACK_LEGACY_PANEL_URL_PROD",
          value: "https://legacy-store-panel-backend.vercel.app/api-store",
          target: ["production"],
          type: "encrypted", // Especifica el tipo
        },
      ],
      //   installCommand: "npm install --omit=dev",
      //   buildCommand: "npm run build",
      //   devCommand: "npm run dev",
      //   outputDirectory: "dist",
    }),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Error en la creación del proyecto:", errorDetails);
    return "error al crear el proyecto";
  }

  const projectData = await response.json();
  console.log("Proyecto creado exitosamente:", projectData);

  //   DEPLOY DEL PROYECTO ___________________________________________________________________________________________________________________________________________________________________
  console.log("deployando...");

  const deployed = await fetch(
    // "https://api.vercel.com/v13/deployments?forceNew=1",
    "https://api.vercel.com/v13/deployments",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.vercel_token}`, // Token Vercel
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify({
      //     name: "victor-tienda-legacystore", // Nombre del proyecto
      //   }),
      // body: JSON.stringify({
      //   name: "victor-tienda-legacystore", // Nombre del proyecto
      //   target: "production", // O "staging", dependiendo del entorno
      //   files: [],
      // }),
      body: JSON.stringify({
        name: "victor-tienda-legacystore",
        project: "victor-tienda-legacystore",
        target: "production",
        files: [],
        gitMetadata: {
          remoteUrl:
            "https://github.com/Victor-Osinaga/legacy-store-frontend.git",
          commitAuthorName: "victor", // Nombre del autor del commit, puedes usar tu nombre o el de la persona que hace el commit
          commitMessage: "initial deploy client", // Mensaje del commit. Puedes personalizarlo según el mensaje del primer commit o el que se quiere usar.
          commitRef: "main", // Usará el último commit de la rama "main"
          commitSha: "ee85b030040c30ba71167d7e96bce64a76871548", // Esto debe ser el SHA del último commit, puedes obtenerlo con `git log` o `git rev-parse HEAD`
        },
        projectSettings: {
          //   buildCommand: "npm run build",
          //   devCommand: "npm run dev",
          installCommand: "npm install --omit=dev",
          framework: "vite",
          //   outputDirectory: "dist",
          //   rootDirectory: null,
        },
      }),
    }
  );

  if (!deployed.ok) {
    const errorDetails = await deployed.text();
    console.error("Error en hacer el deploy del proyecto:", errorDetails);
    return "error al deployar el proyecto";
  }

  const deployedData = await deployed.json();
  console.log("Proyecto deployado exitosamente:", deployedData);
}

const result = await createAndDeployVercel();
console.log("createAndDeployVercel: ", result);
