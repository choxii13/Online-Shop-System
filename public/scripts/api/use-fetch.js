export async function useFetch(api, method, errorMessage, body) {
  let response;
  try {
    if (body) {
      response = await fetch(api, {
        method: method,
        body: JSON.stringify({
          ...body,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      response = await fetch(api, {
        method: method,
      });
    }
  } catch (error) {
    alert(errorMessage);
  }

  if (!response.ok) {
    alert(errorMessage);
  }

  const responseData = await response.json();

  return responseData;
}
