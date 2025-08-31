function index(request, response) {
  response.status(200).json({'status': 'ok'});
}

export default index;
