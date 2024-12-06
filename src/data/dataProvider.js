import {
  fetchUtils,
  DataProvider,
  GetListResult,
  GetOneResult,
  CreateResult,
  UpdateResult,
  DeleteResult,
} from "react-admin";
import ajax from "../ajax/fetchService";

const apiUrl = ""; // Your API URL
const httpClient = fetchUtils.fetchJson;

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const page = params.pagination.page - 1; // React Admin sử dụng 1-based index
    const size = params.pagination.perPage; // Số lượng mục trên mỗi trang

    const response = await ajax(
      `${apiUrl}/${resource}/list?page=${page}&size=${size}`,
      null,
      "GET"
    );

    // Đảm bảo mỗi item có id
    const dataWithId = response.data.map((item) => ({
      id: item.productId, // Sử dụng productId làm id
      ...item,
    }));

    return {
      data: dataWithId,
      total: response.total, // Trả về tổng số sản phẩm
    };
  },

  getOne: async (resource, params) => {
    const response = await ajax(
      `${apiUrl}/${resource}/${params.id}`,
      null,
      "GET"
    );

    // Ensure the response contains the required fields
    if (!response.productId) {
      console.error("Response does not contain a 'productId' key:", response);
      throw new Error("Response does not contain a 'productId' key");
    }

    // Map `productId` to `id` to match React-Admin's expectations
    return {
      data: {
        id: response.id, // React-Admin requires an 'id' field
        ...response,
      },
    };
  },

  create: async (resource, params) => {
    const data = await ajax(`${apiUrl}/${resource}`, null, "POST", params.data);
    return { data };
  },

  update: async (resource, params) => {
    try {
      console.log(
        "Sending PUT request to:",
        `${apiUrl}/${resource}/${params.id}`
      );
      console.log("Request data:", params.data);

      const data = await ajax(
        `${apiUrl}/${resource}/${params.id}`,
        null,
        "PUT",
        params.data
      );

      console.log("Response data:", data);
      return { data };
    } catch (error) {
      console.error("Error during update operation:", error);
      throw error; // Ném lỗi lại để hệ thống xử lý tiếp
    }
  },

  delete: async (resource, params) => {
    await ajax(`${apiUrl}/${resource}/${params.id}`, null, "DELETE");
    return { data: { id: params.id } }; // Return the deleted record's ID
  },

  getMany: async (resource, params) => {
    const data = await ajax(`${apiUrl}/${resource}`, null, "POST", {
      ids: params.ids,
    });
    return { data };
  },

  getManyReference: async (resource, params) => {
    const data = await ajax(`${apiUrl}/${resource}`, null, "GET");
    return { data, total: data.length };
  },

  updateMany: async (resource, params) => {
    const data = await ajax(`${apiUrl}/${resource}/bulk`, null, "PUT", {
      ids: params.ids,
      data: params.data,
    });
    return { data };
  },

  deleteMany: async (resource, params) => {
    await ajax(`${apiUrl}/${resource}/bulk`, null, "DELETE", {
      ids: params.ids,
    });
    return { data: params.ids.map((id) => ({ id })) }; // Return the deleted IDs
  },
};

export default dataProvider;
