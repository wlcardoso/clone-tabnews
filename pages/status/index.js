import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
    return ( 
      <>
        <h1>Status do Site</h1>
        <h2>Banco de Dados</h2>
        <UpdatedAt />
      </>
    );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 10000,
  });

  let updatedAtText = "Carregando...";
  let databaseOpenedConnectionsText = "";
  let databaseVersionText = "";
  let databaseMaxConnectionsText = "";

  if(!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    databaseVersionText = `Versão do PostgreSQL: ${data.dependencies.database.version}`;
    databaseOpenedConnectionsText = `Conexões abertas: ${data.dependencies.database.opened_connections}`; 
    databaseMaxConnectionsText = `Conexões disponíveis: ${data.dependencies.database.max_connections}`; 
  }

  return (
    <div>
      <div>Última atualização: {updatedAtText}</div>
      {databaseMaxConnectionsText && <div>{databaseMaxConnectionsText}</div>}
      {databaseOpenedConnectionsText && <div>{databaseOpenedConnectionsText}</div>}
      {databaseVersionText && <div>{databaseVersionText}</div>}
    </div>
  );
}