// www.antonwester.se → antonwester.se, keeping the path and query.
export default {
  fetch(request) {
    const url = new URL(request.url);
    url.hostname = 'antonwester.se';
    return Response.redirect(url.toString(), 301);
  },
};
