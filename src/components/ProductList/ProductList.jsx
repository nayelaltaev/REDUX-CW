import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, List, Modal, Button, Image, Form } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
//
import {
  fetchProducts,
  setModalState,
  setEditProduct,
  deleteProduct,
} from "./../../store/actions";
import { CreateProduct } from "../ProductForm/CreateProduct";

//!!! lets start
//!!! lets start
//!!! lets start
export const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products).sort(
    (a, b) => b.id - a.id
  );
  const productsLoading = useSelector((store) => store.productsLoading);
  const isModalOpen = useSelector((store) => store.isModalOpen);
  const [form] = Form.useForm();
  const editProduct = useSelector((store) => store.editProduct);
  const isModalCreate = useSelector((store) => store.isModalCreate);

  // !!! useEffect
  // !!! useEffect
  // !!! useEffect
  useEffect(() => {
    setInterval(() => {
      //  Run a function or set any state here
      dispatch(fetchProducts());
    }, 10000);

    // dispatch(fetchProducts());
  }, []);

  //!!! Delete
  const deleteItem = (values) => {
    dispatch(deleteProduct(values));
    console.log(values);
  };
  // console.log('products', products)
  //!!! Modal
  const showModal = () => {
    dispatch(setModalState(true));
  };
  const closeModal = () => {
    dispatch(setModalState(false));
  };
  // Edit
  // const handleEdit = (product) => {
  //   dispatch(setEditProduct(product));
  //   showModal();
  // dispatch(deleteProduct(product.id));
  // };
  // !!! Update
  const handleEdit = (values) => {
    dispatch(setEditProduct(values));
    showModal();
    // dispatch(setModalType(false));
  };
  // ! Render

  return (
    <div>
      <h1 style={{ marginTop: 35, marginLeft: -160 }}>Products</h1>
      <Modal
        style={{
          padding: 0,
          width: 80,
          borderRadius: "25px",
          backgroundColor: "#f56a00",
        }}
        // title={modalTitle}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <CreateProduct />
      </Modal>
      <Button
        style={{
          backgroundColor: "#9254de",
          width: 150,
          height: 35,
          marginLeft: 620,
          borderRadius: 25,
          border: "none",
        }}
        type="primary"
        onClick={showModal}
      >
        Create
      </Button>
      <List
        style={{ width: "900px", marginLeft: "250px", marginTop: "50px" }}
        loading={productsLoading}
        itemLayout="horizontal"
        dataSource={products}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  size={{
                    xs: 100,
                    sm: 100,
                    md: 100,
                    lg: 100,
                    xl: 130,
                    xxl: 200,
                  }}
                  src={
                    <Image
                      src={item.image}
                      // style={{
                      //   width: 55,
                      //   height: 55,
                      // }}
                    />
                  }
                />
              }
              // title={<a href="#">{item.name}</a>}
              title={<div>{item.name}</div>}
              description={<div>{item.price}</div>}
            />
            <EditFilled
              onClick={() => handleEdit(item)}
              style={{ width: 45, height: 45 }}
            />
            <DeleteFilled
              onClick={() => {
                deleteItem(item.id);
              }}
              style={{ marginLeft: 15, width: 45, height: 45 }}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
