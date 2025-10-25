import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { del, get } from "@/services/apiServices";
import { toast } from "react-toastify";
import CommonLayout from "@/layouts/CommonLayout";
import Sidebar from "./components/Sidebar";
import Loader from "@/components/Loader";
import NoState from "@/components/NoState";
import { showConfirmDialog } from "@/utils/confirmDialog";

const PlaylistTable = () => {
  const [products, setProducts] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const fetchProducts = async () => {
    setLoader(true);
    try {
      const response = await get("/playlists");
      setProducts(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoader(true);
    fetchProducts();
  }, []);

  const deleteItem = (id, name) => {
    showConfirmDialog({
      title: "Delete Confirmation", message: `Are you sure you want to delete product: ${name}?`,
      onConfirm: async () => {
        await del(`/products/${id}`);
        setProducts((prev) =>
          prev.filter((product) => product.id !== id)
        );
        toast.success(`Product ${name} deleted successfully`);
      },
    });
  };

  return (
    <CommonLayout>
      <div className="container">
        <div className='d-flex justify-content-between mb-3 pd-r-px-24'>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/products">Products</Link>
              </li>
            </ol>
          </nav>
          <Link to='/admin/products/create' className="btn btn-primary" >Create</Link>
        </div>
        <div className="row">
          <div className="col-md-3 checkbox-cards">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="card shadow border-0 mb-3 h-px-600 overflow-y-scroll">
              <div className="card-body p-4">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th width="50">ID</th>
                      <th width="200">Image</th>
                      <th width="200">Title</th>
                      <th width="100">Price</th>
                      <th width="50">QTY</th>
                      <th width="50">Sku</th>
                      <th width="100">Status</th>
                      <th width="100">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoader ? (
                      <tr>
                        <td colSpan="6">
                          <Loader />
                        </td>
                      </tr>
                    ) : products.length === 0 ? (
                      <tr>
                        <td colSpan="6">
                          <NoState />
                        </td>
                      </tr>
                    ) : (
                      products.map((product, index) => (
                        <tr key={product.id || index}>
                          <td>{index + 1}</td>
                          <td>
                            {product.image_url ? (
                              <img src={product.image_url} width={50} alt="product" />
                            ) : null}
                          </td>
                          <td>{product.title}</td>
                          <td>${product.price}</td>
                          <td>{product.qty}</td>
                          <td>{product.sku}</td>

                          <td>
                            <span
                              className={`badge ${product.status
                                ? "bg-success"
                                : "bg-danger"
                                }`}
                            >
                              {product.status ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <span className="px-2">
                              <Link
                                to="/admin/products/create"
                                state={{ product }}
                                className="px-2"
                              >
                                'EditIcon' 
                              </Link>
                            </span>
                            <span onClick={() => deleteItem(product.id, product.title)}>
                              'TrashIcon' 
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="card-footer py-2 px-4 m-0">
                <span>View Products</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default PlaylistTable;