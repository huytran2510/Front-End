import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  EditButton,
  TextInput,
  Create,
  NumberField,
  BooleanField,
  NumberInput,
  BooleanInput,
  FileInput,
  FileField,
  useNotify,
  useRedirect,
} from "react-admin";
import ajax from "../../ajax/fetchService";

// Hiển thị danh sách sản phẩm
export const listProducts = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="productId" label="ID" />
      <TextField source="productName" label="Name" />
      <NumberField source="unitPrice" label="Unit Price" />
      <NumberField source="unitsInStock" label="Units in Stock" />
      <BooleanField source="discontinued" label="Discontinued" />
      <EditButton basePath="/products" />
    </Datagrid>
  </List>
);

// Chỉnh sửa sản phẩm
export const editProduct = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="productId" label="ID" disabled />
      <TextInput source="productName" label="Tên" />
      <NumberInput source="unitPrice" label="Giá" />
      <NumberInput source="unitsInStock" label="Số lượng tồn kho" />
      <BooleanInput source="discontinued" label="Hoạt động" />
      <NumberInput source="categoryId" label="Category ID" />
      {/* File input for image */}
      <FileInput source="urlImage" label="Image" accept="image/*">
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Edit>
);

// Tạo sản phẩm mới
export const CreateProduct = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    if (values && values.hasOwnProperty("productName")) {
      formData.append("productName", values.productName);
    }
    // Thêm thông tin sản phẩm dưới dạng JSON
    formData.append(
      "productDTO",
      new Blob(
        [
          JSON.stringify({
            productName: values.productName,
            unitPrice: values.unitPrice,
            unitsInStock: values.unitsInStock,
            discontinued: values.discontinued,
          }),
        ],
        { type: "application/json" }
      )
    );
  
    // Thêm file ảnh
    if (values.urlImage && values.urlImage.length > 0) {
      values.urlImage.forEach((file) => {
        formData.append("images", file.raw); // file.raw là file gốc từ input
      });
    }
  
    try {
      const response = await fetch("/products", {
        method: "POST",
        body: formData, // Chỉ gửi formData, không tự đặt header Content-Type
      });
  
      if (!response.ok) {
        throw new Error("Failed to create product");
      }
  
      const data = await response.json();
      console.log("Product created:", data);
  
      notify("Product created successfully!");
      redirect("list", "products");
    } catch (error) {
      console.error("Error:", error);
      notify(`Error: ${error.message}`, { type: "warning" });
    }
  };
  

  return (
    <Create {...props}>
      <SimpleForm save={handleSubmit}>
        <TextInput source="productName" label="Tên sản phẩm" />
        <NumberInput source="unitPrice" label="Giá" />
        <NumberInput source="unitsInStock" label="Số lượng tồn kho" />
        <BooleanInput source="discontinued" label="Ngừng bán" />
        <NumberInput source="categoryId" label="ID Danh mục" />
        <FileInput
          source="urlImage"
          label="Ảnh sản phẩm"
          accept="image/*"
          multiple
        >
          <FileField source="src" title="title" />
        </FileInput>
      </SimpleForm>
    </Create>
  );
};
