import React, { useState, useEffect } from "react";
import { Button, Form, Input, Upload, Modal } from "antd";
import {
  createProduct,
  setModalState,
  editProducts,
  setEditProduct,
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
// import { deleteProduct } from "./../../store/actions";
// !!!
// !!!! lets start
// !!!! lets start
// !!!! lets start
export const CreateProduct = () => {
  const dispatch = useDispatch();
  const editProduct = useSelector((store) => store.editProduct);
  const [form] = Form.useForm();
  const isModalOpen = useSelector((store) => store.isModalOpen);
  const isModalCreate = useSelector((store) => store.isModalCreate);
  //!!!! useEffect
  useEffect(() => {
    // console.log("editProduct", editProduct);
    if (!editProduct) return;
    form.setFieldsValue(editProduct);
  }, [form, editProduct]);
  //!!!! when close modal
  const closeModal = () => {
    dispatch(setModalState(false));
    dispatch(setEditProduct(null));
    form.resetFields();
  };
  //?
  // ! On finish (createProduct)
  const onFinish = (values) => {
    // console.log("Success:", values);
    if (editProduct) {
      dispatch(editProducts(values, editProduct.id));
    } else {
      dispatch(createProduct(values));
    }
    setTimeout(() => {
      form.resetFields();
    }, 0);
    //
    dispatch(setModalState(false));
    //
    //   const deleteItem = (values) => {
    //     dispatch(deleteProduct(values));
    //     console.log(values);
    //   };
    //
  };
  console.log("editProduct", editProduct);
  //
  // !!! On finish (Error)
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //
  // const handleDelete = (products) => {
  //   dispatch(deleteProduct(products.id));
  // };
  //
  const title = editProduct ? "Update" : "Send";
  const modalTitle = editProduct ? "Update Product" : "Create Product";

  return (
    <div>
      <h1>Create Product</h1>
      <Form
        style={{ marginLeft: 20, marginTop: 35, width: 400 }}
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input Product Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input Product Price!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/*  */}
        <Form.Item
          style={{ marginLeft: 165 }}
          name="image"
          valuePropName="file"
        >
          <Upload
            accept=".png, .jpg"
            listType="picture-card"
            beforeUpload={() => false}
            multiple={false}
            maxCount={1}
          >
            <Button>Upload</Button>
          </Upload>
        </Form.Item>
        {/*  */}
        <Form.Item>
          <Button
            style={{
              backgroundColor: "#9254de",
              width: 150,
              height: 33,
              marginTop: 10,
              marginLeft: 145,
              borderRadius: 25,
              border: "none",
            }}
            type="primary"
            htmlType="submit"
          >
            {title}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
