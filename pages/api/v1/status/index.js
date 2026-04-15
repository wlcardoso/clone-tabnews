function status (request, response) {
  response.status(200).json({chave: "São demais"})
}

export default status