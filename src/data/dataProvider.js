import ajax from "../ajax/fetchService";
const useDataProvider = (jwt) => {
  const apiUrl = "/products"; // Đường dẫn API của bạn

  return {
    getList: (resource, params) => {
      const { page, perPage } = params;
      return ajax(
        `${apiUrl}`, 
        jwt, 
        "GET", 
        ""
      ).then((data) => ({
        data,
        total: 100, // Bạn có thể tính tổng số bản ghi nếu cần
      }));
    },

    getOne: (resource, params) => {
      return ajax(
        `${apiUrl}/${resource}/${params.id}`, 
        jwt, 
        "GET", 
        ""
      ).then((data) => ({
        data,
      }));
    },

    create: (resource, params) => {
      return ajax(
        `${apiUrl}/${resource}`, 
        jwt, 
        "POST", 
        params.data
      ).then((data) => ({
        data,
      }));
    },

    update: (resource, params) => {
      return ajax(
        `${apiUrl}/${resource}/${params.id}`, 
        jwt, 
        "PUT", 
        params.data
      ).then((data) => ({
        data,
      }));
    },

    delete: (resource, params) => {
      return ajax(
        `${apiUrl}/${resource}/${params.id}`, 
        jwt, 
        "DELETE", 
        ""
      ).then((data) => ({
        data,
      }));
    },

    // Các phương thức khác nếu cần
    getMany: (resource, params) => {
      return ajax(
        `${apiUrl}/${resource}?_id_in=${params.ids.join(",")}`, 
        jwt, 
        "GET", 
        ""
      ).then((data) => ({
        data,
      }));
    },

    getManyReference: (resource, params) => {
      return ajax(
        `${apiUrl}/${resource}?${params.target}=${params.id}`, 
        jwt, 
        "GET", 
        ""
      ).then((data) => ({
        data,
        total: data.length, // Bạn có thể tính tổng tùy thuộc vào dữ liệu
      }));
    },

    updateMany: (resource, params) => {
      return Promise.all(
        params.ids.map((id) =>
          ajax(`${apiUrl}/${resource}/${id}`, jwt, "PUT", params.data)
        )
      ).then(() => ({
        data: params.ids,
      }));
    },

    deleteMany: (resource, params) => {
      return Promise.all(
        params.ids.map((id) =>
          ajax(`${apiUrl}/${resource}/${id}`, jwt, "DELETE", "")
        )
      ).then(() => ({
        data: params.ids,
      }));
    },
  };
};

export default useDataProvider;
