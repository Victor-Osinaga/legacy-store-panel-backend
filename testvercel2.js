import config from "./config.js";
import getRepoId from "./src/utils/github/getRepoId.js";

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

  // NOMBRE DEL PROYECTO, ESTE SERIA EL NOMBRE DE PROYECTO QUE INGRESE EL USUARIO ______________________________________________________
  const projectName = "victor-tiendaaa-legacystore";
  //   CREACION DEL PROYECTO _______________________________________________________________________________________________________________________________________________________________
  const response = await fetch("https://api.vercel.com/v11/projects", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.vercel_token}`, // Token Vercel
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: projectName, // Nombre del proyecto
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
      installCommand: "npm install", // --omit=dev se usa para omitir las dependencias de desarrollo, en este caso no es recomendable porque omite la instalacion del paquete "vite" que es necesario para hacer el build
      buildCommand: "npm run build",
      devCommand: "npm run dev",
      outputDirectory: "dist",
    }),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Error en la creación del proyecto:", errorDetails);
    return "error al crear el proyecto";
  }

  const projectData = await response.json();
  console.log("Proyecto creado exitosamente:", projectData);

  // OBTENIENDO ID DE REPOSITORIO LEGACY STORE ____________________________________________________
  console.log("Obteniendo id del repositorio");
  const repoId = await getRepoId();
  console.log("id obtenido: ", repoId);

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
      body: JSON.stringify({
        name: projectName, // si se usa "project" este queda inhabilitado
        project: projectName,
        target: "production",
        // files: [],
        // gitMetadata: {
        //   remoteUrl:
        //     "https://github.com/Victor-Osinaga/legacy-store-frontend.git",
        //   commitAuthorName: "victor", // Nombre del autor del commit, puedes usar tu nombre o el de la persona que hace el commit
        //   commitMessage: "initial deploy client", // Mensaje del commit. Puedes personalizarlo según el mensaje del primer commit o el que se quiere usar.
        //   commitRef: "main", // Usará el último commit de la rama "main"
        //   commitSha: "ee85b030040c30ba71167d7e96bce64a76871548", // Esto debe ser el SHA del último commit, puedes obtenerlo con `git log` o `git rev-parse HEAD`
        // },
        projectSettings: {
          //   buildCommand: "npm run build",
          //   devCommand: "npm run dev",
          installCommand: "npm install", // --omit=dev se usa para omitir las dependencias de desarrollo, en este caso no es recomendable porque omite la instalacion del paquete "vite" que es necesario para hacer el build
          framework: "vite",
          //   outputDirectory: "dist",
          //   rootDirectory: null,
        },

        // NEW
        gitSource: {
          ref: "main",
          repoId: repoId,
          type: "github",
          // sha: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
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
