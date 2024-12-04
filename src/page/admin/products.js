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
  } from 'react-admin'
  
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
        <TextInput source="productName" label="Name" />
        <NumberInput source="unitPrice" label="Unit Price" />
        <NumberInput source="unitsInStock" label="Units in Stock" />
        <BooleanInput source="discontinued" label="Discontinued" />
      </SimpleForm>
    </Edit>
  );
  
  // Tạo sản phẩm mới
  export const createProduct = (props) => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="productName" label="Name" />
        <NumberInput source="unitPrice" label="Unit Price" />
        <NumberInput source="unitsInStock" label="Units in Stock" />
        <BooleanInput source="discontinued" label="Discontinued" />
      </SimpleForm>
    </Create>
  );
  