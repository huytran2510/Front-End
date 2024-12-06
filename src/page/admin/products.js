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
  
    // Thêm thông tin sản phẩm vào FormData dưới dạng JSON
    formData.append(
      "product",
      new Blob([JSON.stringify({
        productId: values.productId,
        productName: values.productName,
        unitPrice: values.unitPrice,
        unitsInStock: values.unitsInStock,
        discontinued: values.discontinued,
        categoryId: values.categoryId
      })], { type: "application/json" })
    );
  
    // Thêm ảnh vào FormData
    if (values.urlImage && values.urlImage.length > 0) {
      for (let i = 0; i < values.urlImage.length; i++) {
        formData.append("images", values.urlImage[i]);
      }
    }
  
    try {
      // Gửi yêu cầu tạo sản phẩm bằng fetch
      const response = await fetch("/products", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log("Created product:", data);
      notify("Product created successfully");
      redirect("list", "products"); // Chuyển hướng đến danh sách sản phẩm
    } catch (error) {
      notify("Error creating product", "warning");
      console.error("Error:", error);
    }
  };
  

  return (
    <Create {...props}>
      <SimpleForm save={handleSubmit}>
        <TextInput source="productName" label="Tên" />
        <NumberInput source="unitPrice" label="Giá" />
        <NumberInput source="unitsInStock" label="Số lượng tồn kho" />
        <BooleanInput source="discontinued" label="Hoạt động" />
        <NumberInput source="categoryId" label="Category ID" />
        {/* File input for image */}
        <FileInput source="urlImage" label="Image" accept="image/*" multiple>
          <FileField source="src" title="title" />
        </FileInput>
      </SimpleForm>
    </Create>
  );
};
