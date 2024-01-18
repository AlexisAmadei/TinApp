function checkApiResponse(response) {
    if (response.status === 200) {
        return "OK";
    } else if (response.status === 400) {
        return "API error: 400 Bad Request";
    } else if (response.status === 403) {
        return "API error: 403 Forbidden";
    } else if (response.status === 404) {
        return "Ressource non trouvée";
    } else if (response.status === 429) {
        return "API error: 429 Too Many Requests";
    } else if (response.status === 500) {
        return "API error: 500 Internal Server Error";
    } else if (response.status === 503) {
        return "API error: 503 Service Unavailable. Try again later.";
    } else {
        return "Unknown error";
    }
}

export default checkApiResponse;