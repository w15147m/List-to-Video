
import CommonLayout from "../layouts/CommonLayout";
import FeaturedProducts from "../components/FeaturedProducts";
import {Link} from 'react-router-dom'
function Home() {
  return (
    <CommonLayout>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Shop
            </li>
          </ol>
        </nav>
        <div className="row ">
          <div className="col-md-3 checkbox-cards">
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h3>Categories</h3>
                <ul>
                  <li>
                    <input type="checkbox" />
                    <label htmlFor="" className="px-2">
                      {" "}
                      Kid's{" "}
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label htmlFor="" className="px-2">
                      {" "}
                      Men's{" "}
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label htmlFor="" className="px-2">
                      {" "}
                      Women's{" "}
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h3>Brands</h3>
                <ul>
                  <li>
                    <input type="checkbox" />
                    <label htmlFor="" className="px-2">
                      {" "}
                      Timberland{" "}
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label htmlFor="" className="px-2">
                      {" "}
                      Khaadi{" "}
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label htmlFor="" className="px-2">
                      {" "}
                      J. (Junaid Jamshed){" "}
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label htmlFor="" className="px-2">
                      {" "}
                      Outfitters
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label htmlFor="" className="px-2">
                      {" "}
                      Diners
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <FeaturedProducts />
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}

export default Home;
