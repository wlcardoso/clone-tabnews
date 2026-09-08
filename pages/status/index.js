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
      <SystemStatus />
    </>
  );
}

function SystemStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 10000,
  });

  if (isLoading) {
    return <div>Carregando</div>;
  }

  const { updated_at, dependencies } = data;
  const { version, opened_connections, max_connections } =
    dependencies.database;

  const updatedAtText = new Date(updated_at).toLocaleString("pt-BR");

  return (
    <div>
      <div>Última atualização: {updatedAtText}</div>
      <div>Conexões disponíveis: {max_connections}</div>
      <div>Conexões abertas: {opened_connections}</div>
      <div>Versão do PostgreSQL: {version}</div>
    </div>
  );
}
