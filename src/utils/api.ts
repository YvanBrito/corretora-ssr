const API_URL = `http://${process.env.NEXT_PUBLIC_BACKEND_API}`;

function serialize(
  obj: { [x: string]: any; hasOwnProperty: (arg0: string) => any },
  prefix?: string
): string {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push(
        v !== null && typeof v === "object"
          ? serialize(v, k)
          : encodeURIComponent(k) + "=" + encodeURIComponent(v)
      );
    }
  }
  return str.join("&");
}

async function post(path: string, body: unknown) {
  await fetch(`${API_URL}/${path}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => {
      throw err;
    });
}

async function get(path: string, params: any) {
  console.log("url", `${API_URL}/${path}?${serialize(params)}`);
  return await fetch(`${API_URL}/${path}?${serialize(params)}`)
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => {
      throw err;
    });
}

const api = { post, get };

export default api;
