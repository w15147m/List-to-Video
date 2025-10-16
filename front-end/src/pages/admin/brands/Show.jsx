import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { del } from "@/services/apiServices";
import { EditIcon, TrashIcon } from "@/assets/SVGs/commonSVJs";
import CommonLayout from "@/layouts/CommonLayout";
import Sidebar from "../components/Sidebar";
import Loader from "@/components/Loader";
import NoState from "@/components/NoState";
import { showConfirmDialog } from "@/utils/confirmDialog";
import { fetchData } from "../utils/fetch";

const Show = () => {
  const [brands, setBrands] = useState([]);
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    fetchData( '/brands', setBrands, setLoader);
  }, []);

  const deleteItem = (id, name) => {
    showConfirmDialog({
      title: "Delete Confirmation",
      message: `Are you sure you want to delete ${name}?`,
      onConfirm: async () => {
        await del(`/brands/${id}`);
        setBrands((prev) => prev.filter((brand) => brand.id !== id));
        toast.success(`${name} deleted successfully`);
      },
    });
  };

  return (
    <CommonLayout>
      <div className="container">
        <div className="d-flex justify-content-between mb-3 pd-r-px-24">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/brands">Brands</Link>
              </li>
            </ol>
          </nav>
          <Link to="/admin/brands/create" className="btn btn-primary">
            Create
          </Link>
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
                      <th width="100">ID</th>
                      <th width="100">Name</th>
                      <th width="100">Status</th>
                      <th width="100">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoader ? (
                      <tr>
                        <td colSpan="4">
                          <Loader />
                        </td>
                      </tr>
                    ) : brands.length === 0 ? (
                      <tr>
                        <td colSpan="4">
                          <NoState />
                        </td>
                      </tr>
                    ) : (
                      brands.map((brand, index) => (
                        <tr key={brand.id || index}>
                          <td>{index + 1}</td>
                          <td>{brand.name}</td>
                          <td>
                            <span
                              className={`badge ${
                                brand.status ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {brand.status ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <span className="px-2">
                              <Link
                                to="/admin/brands/create"
                                state={{ brand }}
                                className="px-2"
                              >
                                <EditIcon />
                              </Link>
                            </span>
                            <span onClick={() => deleteItem(brand.id, brand.name)}>
                              <TrashIcon />
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="card-footer py-2 px-4 m-0">
                <span>View Brands</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Show;
