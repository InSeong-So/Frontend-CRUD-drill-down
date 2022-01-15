import HTTPClient from './HTTPClient.js';

const httpClient = new HTTPClient({
  mode: 'no-cors',
  cache: 'no-cache',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
  referrer: 'no-referrer',
});

const http = {
  async load({ category }: { category: string }) {
    return await httpClient.get(`/api/category/${category}/menu`, null, {
      from: `Load "${category}" menu`,
    });
  },
  async create({ category }: { category: string }, params: any) {
    return await httpClient.post(
      `/api/category/${category}/menu`,
      params,
      null,
      { from: `Create "${category}" "${params.data}"` },
    );
  },
  async update(
    { category, menuId }: { category: string; menuId: string },
    params: any,
  ) {
    return await httpClient.put(
      `/api/category/${category}/menu/${menuId}`,
      params,
      null,
      { from: `Update "${category}" "${params.data}"` },
    );
  },
  async soldOut(
    { category, menuId }: { category: string; menuId: string },
    params: any,
  ) {
    return await httpClient.put(
      `/api/category/${category}/menu/${menuId}/soldout`,
      params,
      null,
      { from: `Sold-Out "${category}" "${params.data}"` },
    );
  },
  async delete({ category, menuId }: { category: string; menuId: string }) {
    return await httpClient.delete(
      `/api/category/${category}/menu/${menuId}`,
      null,
      { from: `Delete "${category}" menu` },
    );
  },
};

export default http;
